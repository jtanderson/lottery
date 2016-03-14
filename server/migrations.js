Migrations.add({
  version: 1,
  name: "Set jtanderson31@gmail.com to be an admin user.",
  up: function(){
    Accounts.createUser({
      "username": "jtanderson31@gmail.com", 
      "email": "jtanderson31@gmail.com",
      "password": "firstpass"
    });
    var user = Meteor.users.findOne({"emails.address": "jtanderson31@gmail.com"});
    if ( user && ! Roles.userIsInRole(user, 'admin') ){
      Roles.addUsersToRoles(user._id, "admin");
    }
  }
});

Migrations.add({
  version: 2,
  name: "Add users array to each lottery.",
  up: function(){
    for (var i = Lotteries.find().fetch().length - 1; i >= 0; i--) {
      var lot = Lotteries.find().fetch()[i];
      if ( ! lot.hasOwnProperty("users") ){
        Lotteries.update(lot._id, {$set: {users: []}});
      }
    };
  }
});

Migrations.add({
  version: 3,
  name: "Add defaultEntryAmount to each lottery.",
  up: function(){
    for (var i = Lotteries.find().fetch().length - 1; i >= 0; i--) {
      var lot = Lotteries.find().fetch()[i];
      if ( ! lot.hasOwnProperty("defaultEntryAmount") ){
        Lotteries.update(lot._id, {$set: {defaultEntryAmount: 0}});
      }
    };
  }
});

Migrations.add({
  version: 4,
  name: "Move lottery.users to LotteryUsers collection",
  up: function(){
    var lotteries = Lotteries.find().fetch();
    for (var i = lotteries.length - 1; i >= 0; i--) {
      if ( lotteries[i].users ){
        for (var j = lotteries[i].users.length - 1; j >= 0; j--) {
          // lotteries[i].users[j]
          var lotteryuser = _.clone(lotteries[i].users[j]);
          _.extend(lotteryuser, {
            lottery_id: lotteries[i]._id
          });
          LotteryUsers.insert(lotteryuser);
          Lotteries.update(lotteries[i]._id, {$unset: {users: ""}});
        };
      }
    };
  }
});

Migrations.add({
  version: 5,
  name: "Add field for bonus pool",
  up: function(){
    var lotteries = Lotteries.find().fetch();
    for ( var i = lotteries.length - 1; i >= 0; i--) {
      Lotteries.update(lotteries[i]._id, {$set: {bonus: 0}});
    }
  }
});
