class AdminController < ApplicationController
  PlanNumber = 3 
  def index
    redirect_to root_url if !current_user || (current_user && current_user.name != 'admin')
  end

  def create
    project = Project.create(name: project_params[:name],yingye: project_params[:yingye],qiye: project_params[:qiye],zhuce: project_params[:zhuce],fading: project_params[:fading],ziben: project_params[:ziben],gongsi: project_params[:gongsi],dengji: project_params[:dengji],chengli: project_params[:chengli],qixian: project_params[:qixian],jingying: project_params[:jingying],shuiwu: project_params[:shuiwu],zuzhi: project_params[:zuzhi],daikuan: project_params[:daikuan],texu: project_params[:texu],lianxi: project_params[:lianxi],youbian: project_params[:youbian],dianhua: project_params[:dianhua],qiyezhu: project_params[:qiyezhu], file: project_params[:file])

    project_params[:standName].each_value {|value| project.stand_names.create(name: value)}

    project.standards.create(project_params[:standardInfo])
  end

  def get_standard
    project = Project.last
    render json: project.stand_names.map {|p| p.name}        
  end

  def get_project
    project = Project.last
    render json: project
  end

  def get_result 
    project = Project.last
    stand12 = project.standards.first.stand12.to_r
    stand13 = project.standards.first.stand13.to_r
    stand14 = project.standards.first.stand14.to_r
    stand15 = project.standards.first.stand15.to_r
    stand23 = project.standards.first.stand23.to_r
    stand24 = project.standards.first.stand24.to_r
    stand25 = project.standards.first.stand25.to_r
    stand34 = project.standards.first.stand34.to_r
    stand35 = project.standards.first.stand35.to_r
    stand45 = project.standards.first.stand45.to_r
    result = handle_result stand12,stand13,stand14,stand15,stand23,stand24,stand25,stand34,stand35,stand45

    render json: result
  end

  def result_analyze
    stand12 = analyze_params[:stand12].to_r
    stand13 = analyze_params[:stand13].to_r
    stand14 = analyze_params[:stand14].to_r
    stand15 = analyze_params[:stand15].to_r
    stand23 = analyze_params[:stand23].to_r
    stand24 = analyze_params[:stand24].to_r
    stand25 = analyze_params[:stand25].to_r
    stand34 = analyze_params[:stand34].to_r
    stand35 = analyze_params[:stand35].to_r
    stand45 = analyze_params[:stand45].to_r
    result = handle_result stand12,stand13,stand14,stand15,stand23,stand24,stand25,stand34,stand35,stand45

    render json: result
  end

  private
  def project_params
  	params.require(:project).permit(:name, :file, :yingye,:qiye,:zhuce,:fading,:ziben,:gongsi,:dengji,:chengli,:qixian,:jingying,:shuiwu,:zuzhi,:daikuan,:texu,:lianxi,:youbian,:dianhua,:qiyezhu, :standName => [:stand1, :stand2, :stand3, :stand4, :stand5], :standardInfo => [:stand12, :stand13, :stand14, :stand15, :stand23, :stand24, :stand25, :stand34, :stand35, :stand45])
  end

  def analyze_params
    params.require(:standardInfo).permit(:stand12, :stand13, :stand14, :stand15, :stand23, :stand24, :stand25, :stand34, :stand35, :stand45)
  end 

  def handle_result (stand12,stand13,stand14,stand15,stand23,stand24,stand25,stand34,stand35,stand45)
     # first step
    temp1 = (1 + stand12 + stand13 + stand14 + stand15) ** (1.0 / 5)
    temp2 = ((1 / stand12) + 1 + (1 / stand23) + stand24 + stand25) ** (1.0 / 5)
    temp3 = ((1 / stand13) + (1 / stand23) + 1 + stand34 + stand35) ** (1.0 / 5)
    temp4 = ((1 / stand14) + (1 / stand24) + (1 / stand34)+ 1  + (1 / stand45)) ** (1.0 / 5)
    temp5 = ((1 / stand15) + (1 / stand25) + (1 / stand35) + (1 / stand45) + 1) ** (1.0 / 5)
    w1 = temp1 / (temp1 + temp2 + temp3 + temp4 + temp5)
    w2 = temp2 / (temp1 + temp2 + temp3 + temp4 + temp5)
    w3 = temp3 / (temp1 + temp2 + temp3 + temp4 + temp5)
    w4 = temp4 / (temp1 + temp2 + temp3 + temp4 + temp5)
    w5 = temp5 / (temp1 + temp2 + temp3 + temp4 + temp5)
    #second step
    users = User.where(role: 1)
    wx =  [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
    s =  []
    users.each_index do |index|
      k = 1/Math.log(PlanNumber)

      score11 = users[index].scores.where(standard: "score11").first.score.to_i
      score21 = users[index].scores.where(standard: "score21").first.score.to_i
      score31 = users[index].scores.where(standard: "score31").first.score.to_i
      h1 = (-k) * (score11 * Math.log(score11) + score21 * Math.log(score21) + score31 * Math.log(score31))
      
      score12 = users[index].scores.where(standard: "score12").first.score.to_i
      score22 = users[index].scores.where(standard: "score22").first.score.to_i
      score32 = users[index].scores.where(standard: "score32").first.score.to_i
      h2 = (-k) * (score12 * Math.log(score12) + score22 * Math.log(score22) + score32 * Math.log(score32))

      score13 = users[index].scores.where(standard: "score13").first.score.to_i
      score23 = users[index].scores.where(standard: "score23").first.score.to_i
      score33 = users[index].scores.where(standard: "score33").first.score.to_i
      h3 = (-k) * (score13 * Math.log(score13) + score23 * Math.log(score23) + score33 * Math.log(score33))

      score14 = users[index].scores.where(standard: "score14").first.score.to_i
      score24 = users[index].scores.where(standard: "score24").first.score.to_i
      score34 = users[index].scores.where(standard: "score34").first.score.to_i
      h4 = (-k) * (score14 * Math.log(score14) + score24 * Math.log(score24) + score34 * Math.log(score34))

      score15 = users[index].scores.where(standard: "score15").first.score.to_i
      score25 = users[index].scores.where(standard: "score25").first.score.to_i
      score35 = users[index].scores.where(standard: "score35").first.score.to_i
      h5 = (-k) * (score15 * Math.log(score15) + score25 * Math.log(score25) + score35 * Math.log(score35))

      sum = (1 - h1 + 1 - h2 + 1 - h3 + 1 - h4 + 1 - h5)
      wx[index][0] = (1 - h1) / sum
      wx[index][1] = (1 - h2) / sum
      wx[index][2] = (1 - h3) / sum
      wx[index][3] = (1 - h4) / sum
      wx[index][4] = (1 - h5) / sum

      weight =  [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
      sum_weight = wx[index][0] * w1 + wx[index][1] * w2 + wx[index][2] * w3 + wx[index][3] * w4 + wx[index][4] * w5 
      weight[index][0] = wx[index][0] * w1 / sum_weight
      weight[index][1] = wx[index][1] * w2 / sum_weight
      weight[index][2] = wx[index][2] * w3 / sum_weight
      weight[index][3] = wx[index][3] * w4 / sum_weight
      weight[index][4] = wx[index][4] * w5 / sum_weight

      temp = []
      temp[0] = weight[index][0] * (users[index].scores.where(standard: "score11").first.score).to_i
      temp[1] = weight[index][1] * (users[index].scores.where(standard: "score12").first.score).to_i
      temp[2] = weight[index][2] * (users[index].scores.where(standard: "score13").first.score).to_i
      temp[3] = weight[index][3] * (users[index].scores.where(standard: "score14").first.score).to_i
      temp[4] = weight[index][4] * (users[index].scores.where(standard: "score15").first.score).to_i

      s.push temp
    end

    #third step
    r11 = 1
    r12 = 1 - 1/4.0 * ((s[0][0]-s[1][0]) ** 2 + (s[0][1] - s[1][1]) ** 2 + (s[0][2] - s[1][2]) ** 2 + (s[0][3] - s[1][3]) ** 2 + (s[0][4] - s[1][4]) ** 2)
    r13 = 1 - 1/4.0 * ((s[0][0]-s[2][0]) ** 2 + (s[0][2] - s[2][2]) ** 2 + (s[0][2] - s[2][2]) ** 2 + (s[0][3] - s[2][3]) ** 2 + (s[0][4] - s[2][4]) ** 2)
    
    r21 = 1 - 1/4.0 * ((s[1][0]-s[0][0]) ** 2 + (s[1][1] - s[0][1]) ** 2 + (s[1][2] - s[0][2]) ** 2 + (s[1][3] - s[0][3]) ** 2 + (s[1][4] - s[0][4]) ** 2) 
    r22 = 1 
    r23 = 1 - 1/4.0 * ((s[1][0]-s[2][0]) ** 2 + (s[1][1] - s[2][1]) ** 2 + (s[1][2] - s[2][2]) ** 2 + (s[1][3] - s[2][3]) ** 2 + (s[1][4] - s[2][4]) ** 2)
    
    r31 = 1 - 1/4.0 * ((s[2][0]-s[0][0]) ** 2 + (s[2][1] - s[0][1]) ** 2 + (s[2][2] - s[0][2]) ** 2 + (s[2][3] - s[0][3]) ** 2 + (s[2][4] - s[0][4]) ** 2)
    r32 = 1 - 1/4.0 * ((s[2][0]-s[1][0]) ** 2 + (s[2][1] - s[1][1]) ** 2 + (s[2][2] - s[1][2]) ** 2 + (s[2][3] - s[1][3]) ** 2 + (s[2][4] - s[1][4]) ** 2)
    r33 = 1

    sum = (r12 - 1 + r13 - 1) + (r21 - 1 + r23 - 1) + (r31 - 1 + r32 -1)
    w1 = (r12 - 1 + r13 - 1) / sum
    w2 = (r21 - 1 + r23 - 1) / sum
    w3 = (r21 - 1 + r23 - 1) / sum

    #forth step
    v1 = s[0][0] * w1 + s[1][0] * w1 + s[2][0] * w1
    v2 = s[0][1] * w2 + s[1][1] * w2 + s[2][1] * w2
    v3 = s[0][2] * w3 + s[1][2] * w3 + s[2][2] * w3

    return [v1, v2, v3]
  end

end
