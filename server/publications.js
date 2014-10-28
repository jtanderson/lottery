// Meteor.publish definitions

Meteor.publish("counter", function(){
	return Counter.find();
});

Meteor.publish("current-lottery", function() {
	return Lotteries.find({active: true});
});

Meteor.publish("lotteries", function(lotteryId){
	var lottery = Lotteries.find({id: lotteryId}).fetch();
});
