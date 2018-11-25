module API
  class Base < Grape::API
    cascade false
    format :json
    content_type   :json, 'application/json'
    default_format :json
    do_not_route_options!

    mount API::Dairy
  end
end