class SessionsController < ApplicationController
  def new
  end

  def create
  	user = User.authenticate(session_params[:name], session_params[:password])
  	if user
  		session[:user_id] = user.id
      if(user.role == 2)
        redirect_to :controller=>'admin', :action=>'index'
      elsif(user.role == 1)
        redirect_to :controller=>'scores'
      else
        redirect_to :controller=>'standards'
      end
    else
      redirect_to :root
  	end

  end

  private
  def session_params
  	params.permit(:name, :password)
  end
end
