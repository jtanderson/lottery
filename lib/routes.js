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
