class AddSomethingToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :yingye, :string 
    add_column :projects, :qiye, :string
    add_column :projects, :zhuce, :string
    add_column :projects, :fading, :string 
    add_column :projects, :ziben, :string 
    add_column :projects, :gongsi, :string
    add_column :projects, :dengji, :string 
    add_column :projects, :chengli, :string 
    add_column :projects, :qixian, :string
    add_column :projects, :jingying, :string 
    add_column :projects, :shuiwu, :string 
    add_column :projects, :zuzhi, :string
    add_column :projects, :daikuan, :string 
    add_column :projects, :texu, :string 
    add_column :projects, :lianxi, :string
    add_column :projects, :youbian, :string 
    add_column :projects, :dianhua, :string 
    add_column :projects, :qiyezhu, :string
  end
end
