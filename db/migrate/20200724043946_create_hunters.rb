class CreateHunters < ActiveRecord::Migration[5.2]
  def change
    create_table :hunters do |t|
      t.string :email
      t.string :name
      t.string :role

      t.timestamps
    end
  end
end
