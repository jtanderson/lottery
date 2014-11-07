Meteor.startup(function(){
	Migrations.migrateTo('latest');

	Lotteries.allow({
		insert: function(){
			return isAdmin()
		},
		update: function(){
			return isAdmin();
		},
		remove: function(){
			return isAdmin();
		}
	});

	LotteryUsers.allow({
		insert: function(){
			return isAdmin()
		},
		update: function(){
			return isAdmin();
		},
		remove: function(){
			return isAdmin();
		}
	});

	Meteor.users.allow({
		insert: function(){
			return isAdmin()
		},
		update: function(){
			return isAdmin();
		},
		remove: function(){
			return isAdmin();
		}
	});
});
