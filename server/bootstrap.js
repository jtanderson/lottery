Meteor.startup(function(){
	if ( Counter.find().count() === 0 ){
		Counter.insert({clicks: 0});
	} else {
		for (var i = Counter.find().fetch().length - 1; i >= 0; i--) {
			var c = Counter.find().fetch()[i];
			if ( isNaN(c.clicks) ){
				Counter.update(c._id, {clicks: 0});
			}
		};
	}

	// if ( user = Meteor.users.findOne({email: "jtanderson31@gmail.com"}) && ! usersIsInRole(user, 'admin') ){
		// Roles.addUsersToRoles("tQiCERR5YxCxYRe6u", "admin");
	// }
});
