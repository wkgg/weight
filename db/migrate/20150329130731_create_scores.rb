class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.string :user
      t.integer :score
      t.string :from
      t.string :standard

      t.timestamps null: false
    end
  end
end
