var host = "http://localhost:3000/api"

function load_themes(callback) {
  $.ajax({
    type: "GET",
    url: host + "/themes",
    dataType: "json",
  }).done(json => {
    callback = callback || console.log
    callback(json)
  })
}

function load_mesages(theme, callback) {
  $.ajax({
    type: "GET",
    url: host + "/messages?theme=" + theme,
    dataType: "json",
  }).done(json => {
    callback = callback || console.log
    callback(json)
  })
}

function add_theme(theme, callback) {
  $.ajax({
    type: "POST",
    url: host + "/theme?theme=" + theme,
    dataType: "json",
  }).done(json => {
    callback = callback || console.log
    callback(json)
  })
}

function add_message(message, theme, callback) {
  $.ajax({
    type: "POST",
    url: host + "/message?theme=" + theme + "&message=" + message,
    dataType: "json",
  }).done(json => {
    callback = callback || console.log
    callback(json)
  })
}

function delete_message(id, callback) {
  $.ajax({
    type: "DELETE",
    url: host + "/message?id=" + id,
    dataType: "json",
  }).done(json => {
    callback = callback || console.log
    callback(json)
  })
}

function delete_theme(id, callback) {
  $.ajax({
    type: "DELETE",
    url: host + "/theme?id=" + id,
    dataType: "json",
  }).done(json => {
    callback = callback || console.log
    callback(json)
  })
}

load_themes(console.log)
