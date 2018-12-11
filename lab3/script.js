var host = "http://localhost:3000/api"

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

function load_mesages(theme, callback) {
  Get("/messages?theme=" + theme, callback)
}

function add_theme(theme, callback) {
  Post("/theme?theme=" + theme, callback)
}

function add_message(message, theme, callback) {
  Post("/message?theme=" + theme + "&message=" + message, callback)
}

function delete_message(id, callback) {
  Delete("/message?id=" + id, callback)
}

function delete_theme(id, callback) {
  Delete("/theme?id=" + id, callback)
}

