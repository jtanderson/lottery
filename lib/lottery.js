Lotteries = new Mongo.Collection("lotteries");

Lotteries.allow({
	insert: function(){
		return isAdmin()
	},
	update: function(){
		return isAdmin();
	}
});
