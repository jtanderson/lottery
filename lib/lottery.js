Lotteries = new Mongo.Collection("lotteries",{
	transform: function(doc){ return new Lottery(doc); }
});

Lottery = function(doc){
	_.extend(this, doc);
};

_.extend(Lottery.prototype, {
	users: function(){
		return LotteryUsers.find({lottery_id: this._id}).fetch();
	},
	totalPool: function(){
		var total = 0;
		var users = LotteryUsers.find({lottery_id: this._id}).fetch();
		for (var i = users.length - 1; i >= 0; i--) {
			if ( users[i].hasOwnProperty("entry") && !isNaN(parseInt(users[i].entry)) ){
				total += parseInt(users[i].entry);
			}
		};
		return total + parseInt(this.bonus);
	},
	removeUser: function(uid){
		LotteryUsers.remove(uid);
	},
	selectWinner: function(){
		var list = [];
		var count = 0;
		var users = this.users();
		for (var i = users.length - 1; i >= 0; i--) {
			list.push({
				_id: users[i]._id,
				name: users[i].name,
				upper: parseInt(users[i].entry) + count
			});
			count += parseInt(users[i].entry);
		};

		var rnd = _.random(0,count);
		var winner = _.find(list, function(item){ return item.upper >= rnd;});

		this.setWinner(winner._id);
	},
	setWinner: function(uid){
		if ( Meteor.isClient ){
			var userItems = document.getElementsByClassName('lotteryuser');
			var trueWinnerIndex = _.indexOf(userItems, document.getElementById(uid));
			var animIterations = Math.max(Math.floor(5 / userItems.length), 1) * 3;
			var factor = 50;
			var lotteryId = this._id;
			var animate = function(count){
				// TODO: use a database field over a class name to track which one to class.
				if ( count < trueWinnerIndex + 1 + animIterations * (userItems.length) ){
					// $('.lotteryuser-list li').removeClass('alert-success');
					// userItems[count % userItems.length].className += ' alert-success';
					Meteor.call("setLotteryWinner", lotteryId, userItems[count % userItems.length].id);
					setTimeout(animate, 100 + Math.pow(Math.floor(count/userItems.length),2)*factor, count+1);
				}
			}
			setTimeout(animate, 100, 0);
		}
		Meteor.call("setLotteryWinner", this._id, uid);
	}
});

Lotteries.current = function(){
	var lotto = Lotteries.findOne({active: true});
	return lotto;
}
