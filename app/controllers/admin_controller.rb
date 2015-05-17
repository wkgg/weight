class AdminController < ApplicationController
  def index
    redirect_to root_url if !current_user || (current_user && current_user.name != 'admin')
  end

  def create
    project = Project.create(name: project_params[:name])

    project.stand_names.create(name: project_params[:standName][:stand1])
    project.stand_names.create(name: project_params[:standName][:stand2])
    project.stand_names.create(name: project_params[:standName][:stand3])

    project.standards.create(project_params[:standardInfo])
  end

  def get_result
    # first step
    project = Project.last
    stand12 = project.standards.first.stand12.to_r
    stand13 = project.standards.first.stand13.to_r
    stand23 = project.standards.first.stand23.to_r 
    temp1 = (1 + stand12 + stand13) ** (1.0 / 3)
    temp2 = ((1 / stand12) + 1 + (1 / stand23)) ** (1.0 / 3)
    temp3 = ((1 / stand13) + (1 / stand23) + 1) ** (1.0 / 3)
    w1 = temp1 / (temp1 + temp2 + temp3)
    w2 = temp1 / (temp1 + temp2 + temp3)
    w3 = temp1 / (temp1 + temp2 + temp3)
    #second step
    users = User.where(role: 1)
    user = users.first
    k = 1/Math.log(3)
    score11 = user.scores.where(standard: "score11").first.score.to_i
    score21 = user.scores.where(standard: "score21").first.score.to_i
    score31 = user.scores.where(standard: "score31").first.score.to_i
    h11 = (-k) * (score11 * Math.log(score11) + score21 * Math.log(score21) + score31 * Math.log(score31))

    score12 = user.scores.where(standard: "score12").first.score.to_i
    score22 = user.scores.where(standard: "score22").first.score.to_i
    score32 = user.scores.where(standard: "score32").first.score.to_i
    h12 = (-k) * (score12 * Math.log(score12) + score22 * Math.log(score22) + score32 * Math.log(score32))

    score13 = user.scores.where(standard: "score13").first.score.to_i
    score23 = user.scores.where(standard: "score23").first.score.to_i
    score33 = user.scores.where(standard: "score33").first.score.to_i
    h13 = (-k) * (score13 * Math.log(score13) + score23 * Math.log(score23) + score33 * Math.log(score33))

    w11 = (1 - h11) / (1 - h11 + 1 - h12 + 1 - h13)
    w12 = (1 - h12) / (1 - h11 + 1 - h12 + 1 - h13)
    w13 = (1 - h13) / (1 - h11 + 1 - h12 + 1 - h13)
    render json: [w11, w12, w13]
  end

  private
  def project_params
  	params.require(:project).permit(:name, :standName => [:stand1, :stand2, :stand3], :standardInfo => [:stand12, :stand13, :stand23])
  end

end
