if ( Meteor.isServer ){
	Meteor.methods({

	});
}

Lotteries.current = function(){
	var lotto = Lotteries.findOne({active: true});
	return lotto;
}
