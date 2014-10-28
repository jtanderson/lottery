// Subscriptions, Meteor.startup

// Counter = new Mongo.Collection("counter");
Meteor.subscribe("counter");
Meteor.subscribe("current-lottery");
// console.log(Counter);

Tracker.autorun(function(){

});

Template.hello.rendered = function(){

}

Template.lottery.helpers({
	current: function(){
		return Lotteries.current();
	}
});

Template.current_lottery.helpers({
	currentName: function(){
		return Lotteries.current().name;
	},
	currentPool: function(){
		return Lotteries.current().pool;
	},
	currentEndDate: function(){
		return Lotteries.current().endDate;
	},
	currentUsers: function(){
		return [
			{name: "Necrosis"},
			{name: "Xairknight"},
			{name: "Rhetori"},
			{name: "Pertorrius"}
		];
	}
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
