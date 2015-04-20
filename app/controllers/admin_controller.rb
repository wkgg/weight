class AdminController < ApplicationController
  def index
    redirect_to root_url if !current_user || (current_user && current_user.name != 'admin')
  end

  def create
    Standard.create(standard_params)
  end

  private
  def standard_params
  	params.require(:standardInfo).permit(:stand12, :stand13, :stand23)
  end

end
