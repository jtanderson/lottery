Router.map(function(){
	this.route('home', {
		path: '/',
		template: 'lottery'
	});

	this.route('lotteryShow', {
		path: '/lottery/:_id'
	});

	this.route('admin', {
		path: '/admin'
	});
});
