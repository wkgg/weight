class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    user_params['role'] = user_params['role'].to_i if user_params['role']
  	@user = User.new(user_params)
  	@user.save
    redirect_to :controller=>'admin', :action=>'index'
  end

  private
  def user_params
  	params.require(:user).permit(:name, :password, :role)
  end
end
