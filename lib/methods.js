Meteor.methods({
	"addLotteryToHomePage": function(id){
		var lottery = Lotteries.findOne(id);
		if ( lottery ){
			Lotteries.update(lottery._id, {$set: {onHomePage: true}});
			Lotteries.update({_id: {$ne: id}}, {$set: {onHomePage: false}}, {multi: true});
		}
	}
});
