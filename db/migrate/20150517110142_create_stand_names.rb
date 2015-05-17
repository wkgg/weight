class CreateStandNames < ActiveRecord::Migration
  def change
    create_table :stand_names do |t|
      t.belongs_to :project, index: true
      t.string :name

      t.timestamps null: false
    end
  end
end
