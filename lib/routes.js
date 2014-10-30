Router.configure({
	layoutTemplate: 'base',
	loadingTemplate: 'loading',
	notFoundTemplate: '404'
});

Router.map(function(){
	this.route('home', {
		path: '/',
		template: 'lottery',
		waitOn: function(){ return Meteor.subscribe("active-lotteries"); }
	});

	this.route('lotteryCreate', {
		path: '/lottery/new',
		template: 'lotteryCreate'
	});

	this.route('lotteryEdit', {
		path: '/lottery/:_id/edit',
		data: function() { return Lotteries.findOne(this.params._id); }
	});

	this.route('showLottery', {
		path: '/lottery/:_id',
		template: 'showLottery',
		// waitOn: function(){ return Meteor.subscribe("lottery", this.params._id); },
		waitOn: function(){ return Meteor.subscribe("active-lotteries"); },
		data: function(){ return Lotteries.findOne({_id: this.params._id}); }
	});

	this.route('admin', {
		path: '/admin',
		layoutTemplate: 'base',
		template: 'admin',
		waitOn: function(){ return Meteor.subscribe("all-lotteries"); },
		data: function(){ return {lotteries: Lotteries.find().fetch()}; }
	});
});

Router.onBeforeAction('dataNotFound', {only: 'showLottery'});
// Router.onBeforeAction(requireAdmin, {only: 'postSubmit'});

var requireLogin = function() {
	if (! Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
};

var requireAdmin = function() {
	requireLogin();
	if (! Roles.userIsInRole(Meteor.user, 'admin') ) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
};
