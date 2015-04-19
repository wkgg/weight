class ScoresController < ApplicationController
  def new
    @score = Score.new
  end
  def create
    score = post_params
  end

  private
  def post_params
    params.require(:score).permit(:score11, :score12, :score13, :score21, :score22, :score23, :score31, :score32, :score33)
  end
end
