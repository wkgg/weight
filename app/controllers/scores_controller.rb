class ScoresController < ApplicationController
  def index
    redirect_to root_url if !current_user
  end
  def new
    @score = Score.new
  end
  def create
    post_params.each_pair do |key, value|
      Score.create({standard:key, score:value})
    end
  end

  private
  def post_params
    params.require(:score).permit(:score11, :score12, :score13, :score21, :score22, :score23, :score31, :score32, :score33)
  end
end
