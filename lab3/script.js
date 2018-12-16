var host = "http://localhost:3000/api"

var calendar = module.createCalendar('calendar')
calendar.addListener(c => {
  render_app()
})

var app = {}

function Send(request, method, callback) {
  callback = callback || console.log
  fetch(host + request, {
    method: method,
    dataType: "json"
  })
  .then(response => response.json())
  .then(data => {
    callback(data)
  })
}

function Get(request, callback) {
  Send(request, "GET", callback)
}

function Post(request, callback) {
  Send(request, "POST", callback)
}

function Delete(request, callback) {
  Send(request, "DELETE", callback)
}

function load_themes(callback) {
  Get("/themes", callback)
}

function load_messages(theme, callback) {
  Get("/messages?theme=" + theme, callback)
}

function add_theme(theme, callback) {
  Post("/theme?theme=" + theme, callback)
}

function add_message(message, theme, date, callback) {
  Post("/message?theme=" + theme + "&message=" + message + "&date=" + date, callback)
}

function delete_message(id, callback) {
  Delete("/message?id=" + id, callback)
}

function delete_theme(id, callback) {
  Delete("/theme?id=" + id, callback)
}

function reload() {
  load_themes(data => {
    app.themes = data
    load_messages(app.current_theme.theme, data => {
      app.messages = data
      render_app(app)
    })
  })
}

function render_theme(themes, theme) {
  var new_theme = document.createElement("div")
  main = theme.id == app.current_theme.id
  new_theme.classList.add("theme")
  new_theme.classList.add("clearfix")
  if (main) new_theme.classList.add("current")
  new_theme.innerHTML += theme.theme
  if (!main) {
    new_theme.onclick = function() {
      app.current_theme = theme
      reload()
    }

    var delete_b = document.createElement("button")
    delete_b.innerText = "X"
    delete_b.onclick = function() {
      event.stopPropagation()
      delete_theme(theme.id, () => {
        reload()
      })
    }
    delete_b.classList.add("delete-button")
    new_theme.appendChild(delete_b)
  }
  themes.appendChild(new_theme)
}

function render_message(messages, message) {
  if (message.date != calendar.formDate())
    return
  var new_message = document.createElement("div")
  var delete_b = document.createElement("button")
  delete_b.innerText = "X"
  delete_b.classList.add("delete-button")
  delete_b.onclick = function () {
    delete_message(message.id, () => {
      reload()
    })
  }

  new_message.innerHTML = message.message
  new_message.appendChild(delete_b)
  new_message.classList.add("message")
  new_message.classList.add("clearfix")

  messages.appendChild(new_message)
}

function render_app() {
  var themes = document.getElementById("themes")
  var messages = document.getElementById("messages")

  messages.innerHTML = ""
  themes.innerHTML = ""

  app.themes.forEach(t => {
    render_theme(themes, t)
  })

  app.messages.forEach(m => {
    render_message(messages, m)
  })
}


load_themes(data => {
  app.themes = data
  app.current_theme = data[0]
  load_messages(app.current_theme.theme, data => {
    app.messages = data
    render_app(app)
  })
})


document.getElementById("send-theme").
  addEventListener("click", e => {
    var theme = document.getElementById("theme-text").value
    document.getElementById("theme-text").value = ""
    add_theme(theme, () => {
      reload()
    })
  })

document.getElementById("send-message")
  .addEventListener("click", e => {
    var date = calendar.formDate()
    var message = document.getElementById("message-text").value
    var theme = app.current_theme.theme
    document.getElementById("message-text").value = ""

    add_message(message, theme, date, () => {
      reload()
    })
  })

