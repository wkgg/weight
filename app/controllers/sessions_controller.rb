class SessionsController < ApplicationController
  def new
  end

  def create
  	user = User.authenticate(session_params[:name], session_params[:password])
  	if user
  		session[:user_id] = user.id
      if(session_params[:name] == "admin")
        redirect_to :controller=>'admin', :action=>'index'
      else
        redirect_to :controller=>'scores'
      end
  	end

  end

  private
  def session_params
  	params.permit(:name, :password)
  end
end
