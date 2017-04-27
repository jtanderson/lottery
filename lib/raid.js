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
  },
  hasPlayer: function(name){
    var r = RaidRoles.find({raid_id: this._id, playerName: name});
    return r.count() > 0;
  },
  openSpots: function(){
    return RaidRoles.find({raid_id: this._id}).count() - RaidRoles.find(
      {$and:
        [
          {raid_id: this._id},
          {$or: 
            [
              {playerName: {$ne: ""}},
              {user_id: {$ne: 0}}
            ]
          }
        ]
      }
    ).count();
  }
});

Raids.getNext = function(){
  r = Raids.find().fetch();
  var now = Date.now();
  r = _.filter(r, function(raid){
    return now < Date.parse(raid.startTime);
  });
  r = _.sortBy(r, function(raid){
    return Date.parse(raid.startTime);
  });
  return _.first(r);
}

Raids.getFuture = function(){
  r = Raids.find().fetch();
  var now = Date.now();
  r = _.filter(r, function(raid){
    return now < Date.parse(raid.startTime);
  });
  r = _.sortBy(r, function(raid){
    return Date.parse(raid.startTime);
  });
  return r;
}
