class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    if user_params['name'] != ""
      user_params['role'] = user_params['role'].to_i if user_params['role']
    	@user = User.new(user_params)
    	if @user.save
        render :json => {:status => 200}
      end
    end
  end

  def get
    users = User.where(role: params['role'])
    render json: users
  end

  def destroy
    @user = User.find(params[:id])
    if @user.destroy
      render :json => {:status => 200}
    end
  end

  private
  def user_params
  	params.require(:user).permit(:name, :password, :role)
  end
end
