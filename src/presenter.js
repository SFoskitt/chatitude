app.presenter = (function(){
	var presenterList = []
	var views = {}
	var Presenter = function(parent, newView){
		$parent = $(parent)
		this.render = function(){
			$parent.append(
				newView
			)
		}
	}

	var mount = function(parent, newView){
		instance = new Presenter(parent, newView)
		instance.render()
	}

	var unmount = function(view) {
		view = $(view)
		view.remove()
	}


	var updateMessages = function(){
		var messages = app.model.get('messages')
		for (var i in messages){
			if(messages[i].onPage !== true){
				mount('.messageWindow', app.view.Message(messages[i].user, messages[i].message, messages[i].time))
				messages[i].onPage = true
			}
		}
		var autoUpdate = _.once(setTimeout(function() {
			app.model.fetch()
		}, 1000))
		autoUpdate()
	}


	app.events.on('change:messages', updateMessages)
	app.events.on('init', function() {
		if(localStorage.username){
			app.model.setLogin(localStorage.username, localStorage.password)
			app.model.signin($('#username').val(), $('#password').val())
		} else {
			mount('body', app.view.Sign())
			$('#submit').click(function(e){
				app.model.signup($('#username').val(), $('#password').val())	
			})

			
		}
	})

	app.events.on('signedin', function(){
		unmount('#sign')
		mount('body', app.view.MessageWindow())
		mount('body', app.view.MessInput())
		$('#messInput').keydown(function(e) {
			if(e.keyCode === 13) {
				app.model.sendMessage($(this).val())
				$(this).val('')
			}
		})
		app.model.fetch()
	})


	return {


	}
})()

