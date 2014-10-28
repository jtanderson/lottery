if ( Meteor.isServer ){
	Meteor.methods({
		increment: function(counter){
			console.log("Updating counter:" + counter._id);
			Counter.update(counter._id, {clicks: counter.clicks + 1});
			console.log(Counter.find(counter._id).fetch());
			return;
		}
	});
}
