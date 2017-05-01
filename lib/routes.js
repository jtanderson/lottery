Router.configure({
  layoutTemplate: 'base',
  loadingTemplate: 'loading',
  notFoundTemplate: '404'
});

Router.map(function(){
  this.route('home', {
    path: '/',
    template: 'lottery',
    waitOn: function(){
      return Meteor.subscribe("homepage-lotteries");
    }
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
    waitOn: function(){ return Meteor.subscribe("lottery", this.params._id); },
    data: function(){ return Lotteries.findOne({_id: this.params._id}); }
  });

  this.route('admin', {
    path: '/admin',
    layoutTemplate: 'base',
    template: 'admin',
    waitOn: function(){
      return [
        Meteor.subscribe("all-lotteries"),
        Meteor.subscribe("users"),
        Meteor.subscribe("roles")
      ];
    },
    data: function(){ return {lotteries: Lotteries.find().fetch()}; },
    onBeforeAction: function(){
      if ( ! isAdmin() ){
        Router.go('/');
      } else{
        this.next();
      }
    }
  });

  this.route('raid', {
    path: '/raid',
    template: 'raidHome',
    waitOn: function(){
      return Meteor.subscribe("all-raids");
    }
  });

  this.route('raidCreate', {
    path: '/raid/new',
    template: 'raidCreate',
    waitOn: function(){
      return Meteor.subscribe("all-raids");
    },
    onBeforeAction: function(){
      if ( ! isAdmin() ){
        Router.go('/');
      } else{
        this.next();
      }
    }
  });

  this.route('raidEdit', {
    path: '/raid/:_id/edit',
    data: function() { return Raids.findOne(this.params._id); },
    waitOn: function(){
      return Meteor.subscribe("all-raids");
    },
    template: 'editRaid',
    onBeforeAction: function(){
      if ( ! isAdmin() ){
        Router.go('/');
      } else{
        this.next();
      }
    }
  });

  this.route('showRaid', {
    path: '/raid/:_id/',
    template: 'showRaid',
    waitOn: function(){ return Meteor.subscribe("all-raids", this.params._id); },
    data: function(){ return Raids.findOne({_id: this.params._id}); },
    onBeforeAction: function(){
      var r = Raids.findOne(this.params._id);
      if ( r ){
        this.next();
      } else{
        Router.go('/raid');
      }
    }
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
