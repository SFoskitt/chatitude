(function () {

  // Model (Single global model for simplicity)
  // The Model is the same, regardless of MVC or MVP

  // Note that `peeps` is a private variable (Remember encapsulation?)
  window.model = {
    messages: [],
    endpoints: {
      chats: 'http://chat.api.mks.io/chats',
      signup: 'http://chat.api.mks.io/signup',
      signin: 'http://chat.api.mks.io/signin'
    }
  }
  // debugger


  model.Chat = {

    fetch : function() {
      $.ajax({
        url: model.endpoints.chats,
        method: 'GET',
        // contentType: 'application/json',
        success: function(json) {
          var firstRun = model.messages.length ? false : true
          model.messages = json
          //debugger
          if(firstRun) app.presenter.mount('body', view.MessageWindow)
          app.events.emit('change:messages')
          console.log('got messages from server')
        },
        error: function(json) {
          console.log('error response from server')
        }
      })
    }
  }

  model.map = function(callback) {
    this.messages.map(callback)
  }

    // rotate: function () {
    //   // Variable for terseness
    //   var rotatingPerson = peeps.shift()
    //   peeps.push(rotatingPerson)
    //   App.pubsub.emit('change:personList')
    // },

    // add: function (person) {
    //   peeps.push(person)
    //   App.pubsub.emit('change:personList')
    // },

    // remove: function (personId) {
    //   for (var i=0; i < peeps.length; i++) {
    //     if (peeps[i].id == personId) {
    //       peeps.splice(i, 1)
    //       App.pubsub.emit('change:personList')
    //       return
    //     }
    //   }
    // },

    // map: function (callback) {
    //   return peeps.map(callback)
    // }
  // }

})()
