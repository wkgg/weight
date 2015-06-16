class AdminController < ApplicationController
  def index
    redirect_to root_url if !current_user || (current_user && current_user.name != 'admin')
  end

  def create
    project = Project.create(name: project_params[:name],yingye: project_params[:yingye],qiye: project_params[:qiye],zhuce: project_params[:zhuce],fading: project_params[:fading],ziben: project_params[:ziben],gongsi: project_params[:gongsi],dengji: project_params[:dengji],chengli: project_params[:chengli],qixian: project_params[:qixian],jingying: project_params[:jingying],shuiwu: project_params[:shuiwu],zuzhi: project_params[:zuzhi],daikuan: project_params[:daikuan],texu: project_params[:texu],lianxi: project_params[:lianxi],youbian: project_params[:youbian],dianhua: project_params[:dianhua],qiyezhu: project_params[:qiyezhu])

    project.stand_names.create(name: project_params[:standName][:stand1])
    project.stand_names.create(name: project_params[:standName][:stand2])
    project.stand_names.create(name: project_params[:standName][:stand3])

    project.standards.create(project_params[:standardInfo])
  end

  def get_standard
    project = Project.last
    render json: project.stand_names.map {|p| p.name}        
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
    wx =  [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    s =  [] 
    users.each_index do |index|
      k = 1/Math.log(3)

      score11 = users[index].scores.where(standard: "score11").first.score.to_i
      score21 = users[index].scores.where(standard: "score21").first.score.to_i
      score31 = users[index].scores.where(standard: "score31").first.score.to_i
      h11 = (-k) * (score11 * Math.log(score11) + score21 * Math.log(score21) + score31 * Math.log(score31))
      
      score12 = users[index].scores.where(standard: "score12").first.score.to_i
      score22 = users[index].scores.where(standard: "score22").first.score.to_i
      score32 = users[index].scores.where(standard: "score32").first.score.to_i
      h12 = (-k) * (score12 * Math.log(score12) + score22 * Math.log(score22) + score32 * Math.log(score32))

      score13 = users[index].scores.where(standard: "score13").first.score.to_i
      score23 = users[index].scores.where(standard: "score23").first.score.to_i
      score33 = users[index].scores.where(standard: "score33").first.score.to_i
      h13 = (-k) * (score13 * Math.log(score13) + score23 * Math.log(score23) + score33 * Math.log(score33))

      wx[index][0] = (1 - h11) / (1 - h11 + 1 - h12 + 1 - h13)
      wx[index][1] = (1 - h12) / (1 - h11 + 1 - h12 + 1 - h13)
      wx[index][2] = (1 - h13) / (1 - h11 + 1 - h12 + 1 - h13)

      temp = []
      temp[0] = wx[index][0] * (users[index].scores.where(standard: "score11").first.score).to_i
      temp[1] = wx[index][1] * (users[index].scores.where(standard: "score12").first.score).to_i
      temp[2] = wx[index][2] * (users[index].scores.where(standard: "score13").first.score).to_i

      s.push temp
    end

    #third step
    r11 = 1
    r12 = 1 - 1/4.0 * ((s[0][0]-s[1][0]) ** 2 + (s[0][1] - s[1][1]) ** 2 + (s[0][2] - s[1][2]) ** 2)
    r13 = 1 - 1/4.0 * ((s[0][0]-s[2][0]) ** 2 + (s[0][1] - s[2][1]) ** 2 + (s[0][2] - s[2][2]) ** 2)
    r21 = 1 - 1/4.0 * ((s[1][0]-s[0][0]) ** 2 + (s[1][1] - s[0][1]) ** 2 + (s[1][2] - s[0][2]) ** 2) 
    r22 = 1 
    r23 = 1 - 1/4.0 * ((s[1][0]-s[2][0]) ** 2 + (s[1][1] - s[2][1]) ** 2 + (s[1][2] - s[2][2]) ** 2)
    r31 = 1 - 1/4.0 * ((s[2][0]-s[0][0]) ** 2 + (s[2][1] - s[0][1]) ** 2 + (s[2][2] - s[0][2]) ** 2)
    r32 = 1 - 1/4.0 * ((s[2][0]-s[1][0]) ** 2 + (s[2][1] - s[1][1]) ** 2 + (s[2][2] - s[1][2]) ** 2)
    r33 = 1
    sum = (r12 - 1 + r13 - 1) + (r21 - 1 + r23 - 1) + (r31 - 1 + r32 -1)
    w1 = (r12 - 1 + r13 - 1) / sum
    w2 = (r21 - 1 + r23 - 1) / sum
    w3 = (r21 - 1 + r23 - 1) / sum

    #forth step
    v1 = s[0][0] * w1 + s[1][0] * w1 + s[2][0] * w1
    v2 = s[0][1] * w2 + s[1][1] * w2 + s[2][1] * w2
    v3 = s[0][2] * w3 + s[1][2] * w3 + s[2][2] * w3
    render json: [v1, v2, v3]
  end

  private
  def project_params
  	params.require(:project).permit(:name, :yingye,:qiye,:zhuce,:fading,:ziben,:gongsi,:dengji,:chengli,:qixian,:jingying,:shuiwu,:zuzhi,:daikuan,:texu,:lianxi,:youbian,:dianhua,:qiyezhu, :standName => [:stand1, :stand2, :stand3], :standardInfo => [:stand12, :stand13, :stand23])
  end

end
