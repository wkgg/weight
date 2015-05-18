class StandardsController < ApplicationController
  def index
    redirect_to root_url if !current_user
  end
end
