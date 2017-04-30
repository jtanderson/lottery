RaidWingEncounters = new Mongo.Collection("raidwingencounters", {
  transform: function(doc){
    return new RaidWingEncounter(doc);
  }
});

RaidWingEncounter = function(doc){
  _.extend(this, doc);
};

_.extend(RaidWingEncounter.prototype, {
  optionAttributes: function(raid){
    rtn = {
      value: this._id
    };
    if (raid && raid.raidwingencounter_id == this._id){
      rtn['selected'] = 'selected';
    }
    return rtn;
  }
});
