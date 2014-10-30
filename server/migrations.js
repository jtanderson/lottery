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
})
