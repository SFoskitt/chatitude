app.model = (function(){
  var messages = []
  var endpoints = {
    chats: 'http://chat.api.mks.io/chats',
    signup: 'http://chat.api.mks.io/signup',
    signin: 'http://chat.api.mks.io/signin'
  }
  var firstRun = true
  var canGet = {
    messages: function() {
      return messages
    }
  }
  var fetch = function() {
    $.ajax({
      url: endpoints.chats,
      method: 'GET',
      // contentType: 'application/json',
      success: function(json) {
        messages = json
        debugger
        if(firstRun) {
          app.events.emit('firstrun')
          firstRun = false
        }
        app.events.emit('change:messages')
        console.log('got messages from server')
      },
      error: function(json) {
        console.log('error response from server')
      }
    })
  }
  app.events.on('init', function() {
    fetch()
  })
  var get = function(variable) {
    if(canGet.hasOwnProperty(variable)) {
      return canGet[variable]()
    }
  }
  return {
    fetch: fetch,
    get: get
  }
})()
