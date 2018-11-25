module API
  class Base < Grape::API
    cascade false
    format :json
    content_type   :json, 'application/json'
    default_format :json

    do_not_route_options!

    rescue_from(ActiveRecord::RecordNotFound) do |_e|
      error!('Record is not found', 404)
    end

    mount API::Dairy
  end
end