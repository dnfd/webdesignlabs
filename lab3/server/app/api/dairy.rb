module API
class Dairy < Grape::API
  desc 'Test connectivity'
  get "/ping" do
    { ping: 'pong' }
  end

  desc 'Get server current unix timestamp.'
  get "/time" do
    ts = ::Time.now.to_i
    { time: ts }
  end

  desc 'Create new Theme'
  params do
    requires :theme, type: String
  end
  post "/theme" do
    declared_params = declared(params, include_missing: false)
    return status(200) if Theme.create(theme: declared_params[:theme]).id
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
    return status(200) if Message.create(theme: t, message: declared_params[:message]).id
    error!("Smt went wrong", 503)
  end

  desc 'Get Messages by Theme'
  params do
    requires :theme, type: String
  end
  get "/messages" do
    declared_params = declared(params, include_missing: false)
    t = declared_params[:theme]
    Theme.find_by(theme: t).messages
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
    status(200)
  end
end
end