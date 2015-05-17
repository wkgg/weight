class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.belongs_to :user
      t.string :standard
      t.string :score

      t.timestamps null: false
    end
  end
end
