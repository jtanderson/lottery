Lotteries = new Mongo.Collection("lotteries",{
	transform: function(doc){ return new Lottery(doc); }
});

Lottery = function(doc){
	_.extend(this, doc);
};
_.extend(Lottery.prototype, {
	totalPool: function(){
		var total = 0;
		if ( this.hasOwnProperty("users") ){
			for (var i = this.users.length - 1; i >= 0; i--) {
				if ( this.users[i].hasOwnProperty("entry") && !isNaN(parseInt(this.users[i].entry)) ){
					total += parseInt(this.users[i].entry);
				}
			};
		}
		return total;
	}
});

Lotteries.allow({
	insert: function(){
		return isAdmin()
	},
	update: function(){
		return isAdmin();
	}
});
