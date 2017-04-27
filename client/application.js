// Subscriptions, Meteor.startup

Tracker.autorun(function(){
  // Meteor.subscribe("counter");
});

Template.lottery.helpers({
  current: function(){
    var lotto = Lotteries.current();
    return lotto;
  }
});

Template.editLottery.events({
  'submit form': function(e){
    e.preventDefault();
  }
});

Template.addLotteryUser.events({
  'submit form': function(e){
    e.preventDefault();

    var user = {
      lottery_id: this._id,
      name: $(e.target).find('[name=name]').val(),
      entry: $(e.target).find('[name=entry]').val()
    };

    LotteryUsers.insert(user);
    $(e.target).find('[name=name]').val('');
    $(e.target).find('[name=entry]').val(this.defaultEntryAmount || '');
  }
});

Template.lotteryCreate.events({
  'submit form': function(e){
    e.preventDefault();

    var id = Lotteries.insert({
      endDate: $(e.target).find('[name=endDate]').val(),
      active: true,
      onHomePage: false,
      bonus: $(e.target).find('[name=bonus]').val(),
      defaultEntryAmount: $(e.target).find('[name=defaultEntryAmount]').val()
    });

    Router.go('/lottery/'+id);
  }
});

Template.showLottery.events({
  'click .delete-user': function(e){
    e.preventDefault();
    LotteryUsers.remove(this._id);
  },
  'click a.btn[name=winnerbutton]': function(e){
    e.preventDefault();
    this.selectWinner();
  }
});

Template.showLottery.helpers({
  userIsWinner: function(){
    if ( this.winner ){
      return "alert alert-success winner";
      // return "winner";
    }
  }
})

Template.editComments.events({
  'submit form': function(e){
    e.preventDefault();

    this.setComments($(e.target).find('textarea').val());
  }
});

Template.admin.events({
  'click a.btn[name=delete]': function(e){
    e.preventDefault();

    if ( confirm("Are you sure you want to delete this lottery?") ){
      Lotteries.remove(this._id);
    }
  },
  'change input[name=onHomePageRadio]': function(e){
    e.preventDefault();

    if ( $(e.target).is(":checked") ){
      Meteor.call("addLotteryToHomePage", this._id);
    } else {
      Lotteries.update(this._id, {$set: {onHomePage: false}});
    }
  },
  'change input[name=adminRadio]': function(e){
    e.preventDefault();
    if ( Roles.userIsInRole(this._id, 'admin') ){
      Roles.removeUsersFromRoles(this._id, 'admin');
    } else {
      Roles.addUsersToRoles(this._id, 'admin');
    }
  }
});

Template.admin.helpers({
  users: function(){
    return Meteor.users.find().fetch();
  },
  userEmail: function(user){
    return this.emails[0].address;
  }
});

Template.adminToggle.helpers({
  userIsAdmin: function(){
    return Roles.userIsInRole(this._id, 'admin');
  }
});


Template.showRaid.events({
  'click .delete-user': function(e){
    e.preventDefault();
    RaidRoles.remove(this._id);
  },
  'click .fill-raid-role': function(e){
    e.preventDefault();

    var defaultName = "";
    var localName = localStorage.getItem("raidSignupName");
    var uid = Meteor.userId();

    if ( localName !== null ){
      defaultName = localName;
    } else if ( uid !== null ){
      //defaultName = RaidRoles.findOne({raid_id: this.raid_id, user_id: uid}).playerName;
    }

    var charName = window.prompt("Enter your character name.", defaultName);
    if ( charName == null || charName == "" ){
      return false;
    }

    if ( uid == null ){
      uid = 0;
      // Set cookie so we can remember this browser, since they're not using an account
      if ( localStorage.getItem('raidSignupId') == null ){
        localStorage.setItem('raidSignupId', randomString(16));
      }
      localStorage.setItem('raidSignupName', charName);
    } else {
      clearLocalRaidStorage();
    }

    RaidRoles.update(this._id, {$set: {playerName: charName, user_id: uid}});
  },
  'click .leave-raid-role': function(e){
    e.preventDefault();

    if ( this.user_id == Meteor.userId() || localStorage.getItem('raidSignupName') == this.playerName ){
      RaidRoles.update(this._id, {$set: {playerName: "", user_id: 0}});
    }
  },
  'click .admin-fill-raid-role': function(e){
    e.preventDefault();

    var charName = window.prompt("Enter a character name (leave blank to erase existing).", "");
    if ( charName == null ){
      return false;
    }
    RaidRoles.update(this._id, {$set: {playerName: charName}});
  }
});

Template.showRaid.helpers({
  userCanFillRole: function(){
    cachedSignup = this.Raid().hasPlayer(localStorage.getItem('raidSignupName'));
    return !this.Raid().hasUser(Meteor.userId()) && this.playerName == "" && this.user_id == 0 && !cachedSignup;
  },
  userFillingRole: function(){
    rtn = this.user_id == Meteor.userId() || localStorage.getItem('raidSignupName') == this.playerName;
    return rtn;
  }
});

Template.raidCreate.onRendered(function(){
  this.$('.datetimepicker').datetimepicker();
  Session.set('selected-wing', $('select#wing').val());
});

Template.raidCreate.helpers({
  raidWings: function(){
    return RaidWings.find().fetch();
  },
  raidWingEncounters: function(){
    encounters = RaidWingEncounters.find({raidwing_id: Session.get('selected-wing')});
    return encounters;
  }
});

Template.raidCreate.events({
  'submit form': function(e){
    e.preventDefault();

    var id = Raids.insert({
      startTime: new Date(Date.parse($(e.target).find('[name=startTime]').val())).toISOString(),
      raidwing_id: $(e.target).find('select#wing').val(),
      raidwingencounter_id: $(e.target).find('select#encounter').val()
    });

    Router.go('/raid/'+id);
  },
  'change select#wing': function(e){
    Session.set('selected-wing', $('select#wing').val());
  }
});

Template.addRaidRole.events({
  'submit form': function(e){
    e.preventDefault();

    var role = {
      raid_id: this._id,
      name: $(e.target).find('[name=name]').val(),
      playerName: "",
      user_id: 0
    };

    RaidRoles.insert(role);
    $(e.target).find('[name=name]').val('');
  }
});

Template.raidHome.helpers({
  next: function(){
    return Raids.getNext();
  },
  anyUpcoming: function(){
    console.log(Raids.getFuture().length > 0);
    return Raids.getFuture().length > 0;
  }
});

Template.upcomingRaidsTemplate.helpers({
  upcomingRaids: function(){
    return Raids.getFuture();
  }
});
