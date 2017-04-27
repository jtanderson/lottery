// Meteor.publish definitions

Meteor.publish("counter", function(){
  return Counter.find();
});

Meteor.publish("active-lotteries", function() {
  // return Lotteries.find({active: true});
  return [
    Lotteries.find(),
  ];
});

Meteor.publish("homepage-lotteries", function(){
  return [
    Lotteries.find({onHomePage: true}),
    LotteryUsers.find()
  ];
});

Meteor.publish("lottery", function(lotteryId){
  return [
    Lotteries.find({_id: lotteryId}),
    LotteryUsers.find({lottery_id: lotteryId})
  ];
});

Meteor.publish("all-lotteries", function(){
  return [
    Lotteries.find(),
    LotteryUsers.find()
  ];
});

Meteor.publish("users", function(){
  return Meteor.users.find();
});

Meteor.publish("roles", function(){
  return Meteor.roles.find();
});


Meteor.publish("all-raids", function(){
  return [
    Raids.find(),
    RaidRoles.find(),
    RaidWings.find(),
    RaidWingEncounters.find()
  ];
});


Meteor.publish("next-raid", function(){
});
