window.presenter = function(){
	var presenter = {}
	presenter.presenterList = []
	presenter.views = {}
	presenter.Presenter = function(parent, newView){
		$parent = $(parent)
		debugger
		this.render = function(){
			$parent.empty().append(
				newView()
				// model.messages.map(view.Message(message.user, message.message, message.time))
			)
		}
	}

	presenter.mount = function(parent, newView){
		instance = new presenter.Presenter(parent, newView)
		instance.render()
	}


	presenter.updateMessages = function(){
		
	}




	debugger
	app.events.on('change:messages', presenter.updateMessages)


	return presenter
}

// presenter.Presenter = function(parent, newView){
// 	$parent = $(parent)
// 	this.render = function(){
// 		debugger
// 		$parent.empty().append(
// 			newView(),
// 			model.messages.map(view.Message(message.user, message.message, message.time))
// 		)
// 	}
// }

