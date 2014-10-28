if ( Meteor.isServer ){
	Meteor.methods({

	});
}

Lotteries.current = function(){
	return Lotteries.findOne({active: true});
}
