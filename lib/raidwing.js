RaidWings = new Mongo.Collection("raidwings", {
  transform: function(doc){
    return new RaidWing(doc);
  }
});

RaidWing = function(doc){
  _.extend(this, doc);
};

_.extend(RaidWing.prototype, {
  encounters: function(){
    return RaidWingEncounters.find({raidwing_id: this._id}).fetch();
  }
});
