app.view = (function(){


	var View = function(parent, newView) {
		$parent = $(parent)
		this.render = function(){
			$parent.append(
				newView
			)
		}
	}



	var mount = function(parent, newView){
		instance = new View(parent, newView)
		instance.render()
	}

	var unmount = function(view) {
		view = $(view)
		view.remove()
	}

	


	var updateMessages = function() {
		var messages = app.model.get('messages')
		for (var i in messages){
			if(messages[i].onPage !== true){
				mount('.messageWindow', app.view.Message(messages[i].user, messages[i].message, messages[i].time))
				messages[i].onPage = true
			}
		}
	}










	function MessageWindow(){
		return $('<div class="messageWindow">');
	}
	function Message(user, message, time){
		return $('<div class="message">').append(
			$('<div class="username">').text(user),
			$('<div class="messageText">').text(message),
			$('<div class="time">').text(time),
			$('<br>')
		)
	}

	function Sign(){
		return $('<div id="sign">').append(
			$('<input type="text" id="username" placeholder="username">'),
			$('<br>'),
			$('<input type="text" id="password" placeholder="password">'),
			$('<br>'),
			$('<button type="submit" id="submit">Submit</buttom>').click(function(e){
				app.model.signup($('#username').val(), $('#password').val())	
			})
		)
	}

	function MessInput() {
		return $('<input type="text" placeholder="type something clever" id="messInput">').keydown(function(e) {
			if(e.keyCode === 13) {
				app.controller.sanitize($(this).val())
				$(this).val('')
			}
		})
	}






	app.events.on('change:messages', updateMessages)
	
	app.events.on('signedin', function() {
		unmount('#sign')
		mount('body', app.view.MessageWindow())
		mount('body', app.view.MessInput())
		app.model.fetch()
		app.controller.autoUpdate()
	})

	app.events.on('init', function() {
		if(!app.controller.checkLogin()) mount('body', app.view.Sign())
	})







	return {
		MessageWindow: MessageWindow,
		Message: Message,
		Sign: Sign,
		MessInput: MessInput
	}
})()