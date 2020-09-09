class CreateQuestion < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.integer :question_number

      t.timestamps
    end
  end
end
