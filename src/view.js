app.view = (function(){

	var MessageWindow = function(){
		return $('<div class="messageWindow">');
	}
	var Message = function(user, message, time){
		return $('<div class="message">').append(
			$('<div class="username">').text(user),
			$('<div class="messageText">').text(message),
			$('<br>'),
			$('<div class="time">').text(time)
		)
	}


	return {
		MessageWindow: MessageWindow,
		Message: Message
	}
})()