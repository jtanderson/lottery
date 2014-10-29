// Meteor.publish definitions

Meteor.publish("counter", function(){
	return Counter.find();
});

Meteor.publish("active-lotteries", function() {
	// return Lotteries.find({active: true});
	return [
		Lotteries.find({active: true}),
		Entries.find()
	];
});

Meteor.publish("lottery", function(lotteryId){
	var lottery = Lotteries.find({id: lotteryId}).fetch();
});
