app.view = (function(){

	var MessageWindow = function(){
		return $('<div class="messageWindow">');
	}
	var Message = function(user, message, time){
		return $('<div class="message">').append(
			$('<div class="username">').text(user),
			$('<div class="messageText">').text(message),
			$('<div class="time">').text(time),
			$('<br>')
		)
	}

	var Sign = function(){
		return $('<div id="sign">').append(
			$('<input type="text" id="username" placeholder="username">'),
			$('<br>'),
			$('<input type="text" id="password" placeholder="password">'),
			$('<br>'),
			$('<button type="submit" id="submit">Submit</buttom>')
		)
	}

	var MessInput = function() {
		return $('<input type="text" placeholder="type something clever" id="messInput">')
	}
	


	return {
		MessageWindow: MessageWindow,
		Message: Message,
		Sign: Sign,
		MessInput: MessInput
	}
})()