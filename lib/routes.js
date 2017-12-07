FlowRouter.route('/', {
    name: "home",
    action(){
        BlazeLayout.render('MainLayout',{id: 1});
    }
});

FlowRouter.route('/:id', {
    name: "home",
    action(){
        BlazeLayout.render('MainLayout');
    }
});