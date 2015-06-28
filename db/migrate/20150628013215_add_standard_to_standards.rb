class AddStandardToStandards < ActiveRecord::Migration
  def change
    add_column :standards, :stand14, :string
    add_column :standards, :stand15, :string
    add_column :standards, :stand24, :string
    add_column :standards, :stand25, :string
    add_column :standards, :stand34, :string
    add_column :standards, :stand35, :string
    add_column :standards, :stand45, :string
  end
end
