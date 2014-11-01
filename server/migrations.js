Migrations.add({
	version: 1,
	name: "Set jtanderson31@gmail.com to be an admin user.",
	up: function(){
		var user = Meteor.users.findOne({"emails.address": "jtanderson31@gmail.com"});
		if ( user && ! Roles.userIsInRole(user, 'admin') ){
			console.log("Adding jtanderson31@gmail.com to the admin role...");
			Roles.addUsersToRoles(user._id, "admin");
		}
	}
});

Migrations.add({
	version: 2,
	name: "Add users array to each lottery.",
	up: function(){
		for (var i = Lotteries.find().fetch().length - 1; i >= 0; i--) {
			var lot = Lotteries.find().fetch()[i];
			if ( ! lot.hasOwnProperty("users") ){
				Lotteries.update(lot._id, {$set: {users: []}});
			}
		};
	}
})

Migrations.add({
	version: 3,
	name: "Add defaultEntryAmount to each lottery.",
	up: function(){
		for (var i = Lotteries.find().fetch().length - 1; i >= 0; i--) {
			var lot = Lotteries.find().fetch()[i];
			if ( ! lot.hasOwnProperty("defaultEntryAmount") ){
				Lotteries.update(lot._id, {$set: {defaultEntryAmount: 0}});
			}
		};
	}
})
