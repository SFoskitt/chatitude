app.model = (function(){
  var messages = {}
  var endpoints = {
    chats: 'http://chat.api.mks.io/chats',
    signup: 'http://chat.api.mks.io/signup',
    signin: 'http://chat.api.mks.io/signin'
  }
  var scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
  // var firstRun = true
  var username = ''
  var password = ''
  var token = null
  var getters = {
    messages: function() {
      return messages
    }
  }
  var setLogin = _.once(function(user, pass){
    username = user
    password = pass
  })
  var fetch = function() {
    $.ajax({
      url: endpoints.chats,
      method: 'GET',
      success: function(json) {
        json.forEach(function(message) {
          if(!messages.hasOwnProperty(message.id)){
            var sanitize = scriptRegex.exec(message.message)
            if(sanitize) message.message = sanitize[1]
            messages[message.id] = _.extend(message, {onPage: false})
          }
        })
        app.events.emit('change:messages')
        console.log('got messages from server')
      },
      error: function(json) {
        console.log('error response from server')
      }
    })
  }
  var signin = function() {
    $.ajax({
      url: endpoints.signin,
      method: 'POST',
      data: {username: username, password: password},
      success: function(json) {
        token = json.apiToken
        localStorage.username = username
        localStorage.password = password
        app.events.emit('signedin')        
      },
      error: function(json) {
        console.log('error response from server')
      }
    })
  }

  var signup = function(user, pass) {
    $.ajax({
      url: endpoints.signup,
      method: 'POST',
      data: {username: user, password: pass},
      success: function() {
        username = user
        password = pass
        signin()
      },
      error: function(json) {
        username = user
        password = pass
        signin()
      }
    })
  }

  var sendMessage = function(message) {
    $.ajax({
      url: endpoints.chats,
      method: 'POST',
      data: {message: message, apiToken: token},
    })
  }






  // app.events.on('init', function() {
  //   fetch()
  // })
  var get = function(variable) {
    if(getters.hasOwnProperty(variable)) {
      return getters[variable]()
    }
  }
  return {
    fetch: fetch,
    get: get,
    signup: signup,
    signin: signin,
    sendMessage: sendMessage,
    setLogin: setLogin
  }
})()
