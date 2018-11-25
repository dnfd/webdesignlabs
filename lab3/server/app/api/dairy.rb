module API
class Dairy < Grape::API
  desc 'Test connectivity'
  get "/ping" do
    { ping: 'pong' }
  end

  desc 'Create new Theme'
  params do
    requires :theme, type: String
  end
  post "/theme" do
    declared_params = declared(params, include_missing: false)
    { response: "Theme created" } if Theme.create(theme: declared_params[:theme]).id
    error!("Smt went wrong", 503)
  end

  desc 'Create new Message'
  params do
    requires :theme, type: String
    requires :message
  end
  post "/message" do
    declared_params = declared(params, include_missing: false)
    t = Theme.find_by(theme: declared_params[:theme])
    { response: "Message created" } if Message.create(theme: t, message: declared_params[:message]).id
    error!("Smt went wrong", 503)
  end

  desc 'Get Messages by Theme'
  params do
    requires :theme, type: String
  end
  get "/messages" do
    declared_params = declared(params, include_missing: false)
    t = Theme.find_by(theme: declared_params[:theme])
    error!("Wrong Theme", 404) unless t
    t.messages
  end

  desc 'Get Themes'
  get "/themes" do
    Theme.all
  end

  desc 'Delete Message by Id'
  params do
    requires :id, type: Integer
  end
  delete "/message" do
    declared_params = declared(params, include_missing: false)
    Message.find(declared_params[:id]).delete
    { response: "Message Deleted" }
  end

  desc 'Delete Theme by Id'
  params do
    requires :id, type: Integer
  end
  delete "/theme" do
    declared_params = declared(params, include_missing: false)
    Theme.find(declared_params[:id]).delete
    { response: "Theme Deleted" }
  end
end
end