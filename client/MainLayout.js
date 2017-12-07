Template.MainLayout.onCreated(function () {
    var self = this;
    self.autorun(function () {
        self.subscribe('blocks');
    })
});

Template.MainLayout.helpers({
    blocks: () => {
        var id = parseInt(FlowRouter.getParam('id'));
        return Blocks.find({
            device: id
        });
    },
    block_count: () => {
        var id = parseInt(FlowRouter.getParam('id'));
        return Blocks.find({
            device: id
        }).count() + 1;
    },
    last_hash: () => {
        var id = parseInt(FlowRouter.getParam('id'));
        var n = Blocks.find({device: id}).count();
        if (n == 0) return "No previous";
        else {
            var str = Blocks.findOne({block_number: n}).hash;
            return str;
        }
    }
});

Template.MainLayout.events({
    'click #btn_change_device': function (event, template) {
        var path = "../" + $('#in_device').val();
        window.location.href = path;
    },
    'click #btn_reset': function (event, template){
        Blocks.remove({});
    }
})