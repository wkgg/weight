class AdminController < ApplicationController
  def index
  end

  def create
  	stand12 = standard_params[:stand12]
  end

  private
  def standard_params
  	params.require(:standardInfo).permit(:stand12, :stand13, :stand23)
  end

end
