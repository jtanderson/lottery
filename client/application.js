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
	current_lottery: function(){
		var lottery = Meteor.call("current_lottery");
	}
})

Template.hello.helpers({
	counter: function () {
		if ( Counter.find().count() > 0 ){
			return Counter.findOne().clicks;
		} else {
			return 0;
		}
		// return Session.get("counter");
	}
});

Template.hello.events({
	'click button': function () {
		// increment the counter when button is clicked
		var counter = Counter.findOne();
		Meteor.call("increment", counter);
	}
});
