app.presenter = (function(){
	var presenterList = []
	var views = {}
	var Presenter = function(parent, newView){
		$parent = $(parent)
		this.render = function(){
			$parent.append(
				newView
				// model.messages.map(view.Message(message.user, message.message, message.time))
			)
		}
	}

	var mount = function(parent, newView){
		debugger
		instance = new Presenter(parent, newView)
		instance.render()
	}


	var updateMessages = function(){
		var messages = app.model.get('messages')
		for (var i = 0; i < messages.length; i++){
			mount('.messageWindow', app.view.Message(messages[i].user, messages[i].message, messages[i].time))
		}
	}


	app.events.on('change:messages', updateMessages)
	app.events.on('firstrun', function() {
		mount('body', app.view.MessageWindow())
	})


	return {


	}
})()

