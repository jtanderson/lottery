// Subscriptions, Meteor.startup

Tracker.autorun(function(){
	// Meteor.subscribe("counter");
	Meteor.subscribe("active-lotteries");
});

Template.lottery.helpers({
	current: function(){
		var lotto = Lotteries.current();
		return lotto;
	}
});

Template.showLottery.helpers({

});

Template.hello.helpers({
	counter: function () {
		if ( Counter.find().count() > 0 ){
			return Counter.findOne().clicks;
		} else {
			return 0;
		}
	}
});

Template.hello.events({
	'click button': function () {
		// increment the counter when button is clicked
		var counter = Counter.findOne();
		Meteor.call("increment", counter);
	}
});
