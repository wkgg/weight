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

  private
  def project_params
  	params.require(:project).permit(:name, :standName => [:stand1, :stand2, :stand3], :standardInfo => [:stand12, :stand13, :stand23])
  end

end
