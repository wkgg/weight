class WelcomeController < ApplicationController
  def index
  end

  def create
    weight = [weight_params[:weight1].to_i,weight_params[:weight2].to_i,weight_params[:weight3].to_i,weight_params[:weight4].to_i]

    weight_temp = weight.map do |w|
      (w ** weight.length / (weight.reduce(:*)).to_f) ** (1.0 / weight.length)
    end

    @weightA = weight_temp.map do |w|
      (w / weight_temp.reduce(:+)).round(2)
    end


    score = {
      :wang => {
        :A => [weight_params[:score1A].to_i,weight_params[:score1B].to_i,weight_params[:score1C].to_i,weight_params[:score1D].to_i],
        :B => [weight_params[:score2A].to_i,weight_params[:score2B].to_i,weight_params[:score2C].to_i,weight_params[:score2D].to_i]
      },
      :zhang => {
      :A => [weight_params[:scoreX1A].to_i,weight_params[:scoreX1B].to_i,weight_params[:scoreX1C].to_i,weight_params[:scoreX1D].to_i],
      :B => [weight_params[:scoreX2A].to_i,weight_params[:scoreX2B].to_i,weight_params[:scoreX2C].to_i,weight_params[:scoreX2D].to_i]
      }
    }

    @weightB = {
      :wang => [],
      :zhang => []
    }

    h1 = -(1/Math.log(2)) * (score[:wang][:A][0] * Math.log(score[:wang][:A][0]) + score[:wang][:B][0] * Math.log(score[:wang][:B][0]))
    h2 = -(1/Math.log(2)) * (score[:wang][:A][1] * Math.log(score[:wang][:A][1]) + score[:wang][:B][1] * Math.log(score[:wang][:B][1]))
    h3 = -(1/Math.log(2)) * (score[:wang][:A][2] * Math.log(score[:wang][:A][2]) + score[:wang][:B][2] * Math.log(score[:wang][:B][2]))
    h4 = -(1/Math.log(2)) * (score[:wang][:A][3] * Math.log(score[:wang][:A][3]) + score[:wang][:B][3] * Math.log(score[:wang][:B][3]))

    sum = (1 - h1 + 1 - h2 + 1 - h3 + 1 - h4)
    @weightB[:wang].push ((1 - h1) / sum).round(2)
    @weightB[:wang].push ((1 - h2) / sum).round(2)
    @weightB[:wang].push ((1 - h3) / sum).round(2)
    @weightB[:wang].push ((1 - h4) / sum).round(2)

    h1 = -(1/Math.log(2)) * (score[:zhang][:A][0] * Math.log(score[:zhang][:A][0]) + score[:zhang][:B][0] * Math.log(score[:zhang][:B][0]))
    h2 = -(1/Math.log(2)) * (score[:zhang][:A][1] * Math.log(score[:zhang][:A][1]) + score[:zhang][:B][1] * Math.log(score[:zhang][:B][1]))
    h3 = -(1/Math.log(2)) * (score[:zhang][:A][2] * Math.log(score[:zhang][:A][2]) + score[:zhang][:B][2] * Math.log(score[:zhang][:B][2]))
    h4 = -(1/Math.log(2)) * (score[:zhang][:A][3] * Math.log(score[:zhang][:A][3]) + score[:zhang][:B][3] * Math.log(score[:zhang][:B][3]))

    sum = (1 - h1 + 1 - h2 + 1 - h3 + 1 - h4)
    @weightB[:zhang].push ((1 - h1) / sum).round(2)
    @weightB[:zhang].push ((1 - h2) / sum).round(2)
    @weightB[:zhang].push ((1 - h3) / sum).round(2)
    @weightB[:zhang].push ((1 - h4) / sum).round(2)

    render :index
  end

  private
  def weight_params
    params.require(:weight).permit(:weight1,:weight2,:weight3,:weight4,:score1A,:score1B,:score1C,:score1D,:score2A,:score2B,:score2C,:score2D,
                                   :scoreX1A,:scoreX1B,:scoreX1C,:scoreX1D,:scoreX2A,:scoreX2B,:scoreX2C,:scoreX2D)
  end
end
