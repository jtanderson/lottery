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
});

Template.addLotteryUser.events({
	'submit form': function(e){
		e.preventDefault();

		var user = {
			lottery_id: this._id,
			name: $(e.target).find('[name=name]').val(),
			entry: $(e.target).find('[name=entry]').val()
		};

		LotteryUsers.insert(user);
		$(e.target).find('[name=name],[name=entry]').val('');
	}
});

Template.lotteryCreate.events({
	'submit form': function(e){
		e.preventDefault();

		var id = Lotteries.insert({
			endDate: $(e.target).find('[name=endDate]').val(),
			active: true,
			users: [],
			onHomePage: false,
			defaultEntryAmount: $(e.target).find('[name=defaultEntryAmount]').val()
		});

		Router.go('/lottery/'+id);
	}
});

Template.showLottery.events({
	'click .delete-user': function(e){
		e.preventDefault();
		LotteryUsers.remove(this._id);
	},
	'click a.btn[name=winnerbutton]': function(e){
		e.preventDefault();
		this.selectWinner();
	}
});

Template.editComments.events({
	'submit form': function(e){
		e.preventDefault();

		Lotteries.update(this._id, {$set: {comments: $(e.target).find('textarea').val() }});
	}
});

Template.admin.events({
	'click a.btn[name=delete]': function(e){
		e.preventDefault();

		if ( confirm("Are you sure you want to delete this lottery?") ){
			Lotteries.remove(this._id);
		}
	},
	'change input[name=onHomePageRadio]': function(e){
		e.preventDefault();

		if ( $(e.target).is(":checked") ){
			Meteor.call("addLotteryToHomePage", this._id);
		} else {
			Lotteries.update(this._id, {$set: {onHomePage: false}});
		}
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
