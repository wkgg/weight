class AddFileToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :file, :string
  end
end
