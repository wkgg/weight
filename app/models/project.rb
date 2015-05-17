class Project < ActiveRecord::Base
  has_many :stand_names
  has_many :standards
end
