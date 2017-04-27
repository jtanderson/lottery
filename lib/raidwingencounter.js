RaidWingEncounters = new Mongo.Collection("raidwingencounters", {
  transform: function(doc){
    return new RaidWingEncounter(doc);
  }
});

RaidWingEncounter = function(doc){
  _.extend(this, doc);
};

_.extend(RaidWingEncounter.prototype, {
});
