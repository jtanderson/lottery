isAdmin = function(){
  return Meteor.user() && Roles.userIsInRole(Meteor.user()._id, 'admin');
}

sleep = function(millis){
  var date = new Date();
  var curDate = null;
  do { curDate = new Date(); }
  while(curDate-date < millis);
}

randomString = function(N){
  Array(N+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, N);
}

clearLocalRaidStorage = function(){
  localStorage.removeItem('raidSignupId');
  localStorage.removeItem('raidSignedup');
  localStorage.removeItem('raidSignupName');
}
