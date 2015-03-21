app.controller = (function(){

var scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;

var autoUpdate = _.once(setInterval(function() {
	app.model.fetch()
}, 1000))

var sanitize = function(message) {
	var sanitize = scriptRegex.exec(message)
    if(sanitize) message = sanitize[1]
    app.model.sendMessage(message)
}

var checkLogin = function() {
	if(localStorage.username){
		app.model.setLogin(localStorage.username, localStorage.password)
		app.model.signin()
		return true
	} else return false
}


return {
	autoUpdate: autoUpdate,
	checkLogin: checkLogin,
	sanitize: sanitize

}

})()