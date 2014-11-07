Lotteries = new Mongo.Collection("lotteries",{
	transform: function(doc){ return new Lottery(doc); }
});

Lottery = function(doc){
	_.extend(this, doc);
};
_.extend(Lottery.prototype, {
	users: function(){
		return LotteryUsers.find({lottery_id: this._id}).fetch();
	}
});
_.extend(Lottery.prototype, {
	totalPool: function(){
		var total = 0;
		var users = LotteryUsers.find({lottery_id: this._id}).fetch();
		for (var i = users.length - 1; i >= 0; i--) {
			if ( users[i].hasOwnProperty("entry") && !isNaN(parseInt(users[i].entry)) ){
				total += parseInt(users[i].entry);
			}
		};
		return total;
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
		// TODO: animations!!
		Meteor.call("setLotteryWinner", this._id, uid);
	}
});

Lotteries.current = function(){
	var lotto = Lotteries.findOne({active: true});
	return lotto;
}
