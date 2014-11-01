// Subscriptions, Meteor.startup

Tracker.autorun(function(){
	// Meteor.subscribe("counter");
});

Template.lottery.helpers({
	current: function(){
		var lotto = Lotteries.current();
		return lotto;
	}
});

Template.editLottery.events({
	'submit form': function(e){
		e.preventDefault();
	}
})

Template.showLottery.helpers({

});

Template.addLotteryUser.events({
	'submit form': function(e){
		e.preventDefault();

		var lottery = Lotteries.findOne({_id: this._id});
		var user = {
			name: $(e.target).find('[name=name]').val(),
			entry: $(e.target).find('[name=entry]').val()
		};
		if ( ! lottery.users ){
			lottery.users = [];
		}
		lottery.users.push(user);
		Lotteries.update(this._id, {$set: {users: lottery.users}});
		$(e.target).find('[name=name],[name=entry]').val('')
	}
});

Template.showLottery.events({
	'click .delete-user': function(e){
		e.preventDefault();
		Template.parentData(0).removeUser(this.name);
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
