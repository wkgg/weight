class CreateStandards < ActiveRecord::Migration
  def change
    create_table :standards do |t|
      t.string :stand12
      t.string :stand13
      t.string :stand23

      t.timestamps null: false
    end
  end
end
