RaidRoles = new Mongo.Collection("raidroles", {
  transform: function(doc){
    return new RaidRole(doc);
  }
});

RaidRole = function(doc){
  _.extend(this, doc);
};

_.extend(RaidRole.prototype, {
  Raid: function(){
    return Raids.findOne({_id: this.raid_id});
  }
});
