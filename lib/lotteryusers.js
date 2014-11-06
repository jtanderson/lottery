LotteryUsers = new Mongo.Collection("lotteryusers", {
	transform: function(doc){
		return new LotteryUser(doc);
	}
});

LotteryUser = function(doc){
	_.extend(this, doc);
};

_.extend(Lottery.prototype, {

});
