var app = (function(){

	var events = new Events()
	var init = function(){
		events.emit('init')
	}

	return {
		events: events,
		init: init
	}

	
})()