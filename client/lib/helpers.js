Template.registerHelper("isAdmin", function(){
	return Meteor.user() && Roles.userIsInRole(Meteor.user()._id, 'admin');
});
