Raids = new Mongo.Collection("raids", {
  transform: function(doc){ return new Raid(doc); }
});

Raid = function(doc){
  _.extend(this, doc);
};

_.extend(Raid.prototype, {
  roles: function(){
    return RaidRoles.find({raid_id: this._id}).fetch();
  },
  friendlyStartTime: function(){
    return new Date(this.startTime).toLocaleString();
  },
  wingName: function(){
    return RaidWings.findOne({_id: this.raidwing_id}).name;
  },
  bossName: function(){
    return RaidWingEncounters.findOne({_id: this.raidwingencounter_id}).name;
  },
  setComments: function(str){
    Raids.update(this._id, {$set: {comments: str}});
  },
  hasUser: function(uid){
    var r = RaidRoles.find({raid_id: this._id, user_id: uid});
    return r.count() > 0;
  }
});
