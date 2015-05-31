class SessionsController < ApplicationController
  def new
  end

  def create
  	user = User.authenticate(session_params[:name], session_params[:password])
  	if user
  		session[:user_id] = user.id
      if(session_params[:role] == 'admin' && user.role == 2)
        redirect_to :controller=>'admin', :action=>'index'
      elsif(session_params[:role] == 'expert' && user.role == 1)
        redirect_to :controller=>'scores'
      elsif(session_params[:role] == 'toubiao' && user.role == 0)
        redirect_to :controller=>'standards'
      else
        redirect_to :root
      end
    else
      redirect_to :root
  	end

  end

  private
  def session_params
  	params.permit(:name, :password, :role)
  end
end
