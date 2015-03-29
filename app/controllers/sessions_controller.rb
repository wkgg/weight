class SessionsController < ApplicationController
  def new
  end

  def create
  	user = User.authenticate(session_params[:name], session_params[:password])
  	if user
  		session[:user_id] = user.id
  		redirect_to root_url, :notice => "Log in"
  	else
  		flash.now.alert = "Invalid name or password"
  		redirect_to root_url
  	end

  end

  private
  def session_params
  	params.permit(:name, :password)
  end
end
