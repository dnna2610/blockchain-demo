Meteor.publish('blocks', ()=> {
    return Blocks.find();
});