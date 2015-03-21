(function(){

	window.view = function(element){
		this.viewList = []
		
	}

	view.MessageWindow = function(){
		return $('<div class="messageWindow">');
	}
	view.Message = function(user, message, time){
		return $('<div class="message">').append(
			$('<div class="username">').text(user),
			$('<div class="messageText">').text(message),
			$('<br>'),
			$('<div class="time">').text(time)
		)
	}

	// view.View = function(element) {
	// 	var view = {}

		
	// 	this.viewList = view
	// }

//main View (body)
//


})()