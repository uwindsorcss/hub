class AddUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string "email"
      t.string "name"
      t.string "role", default: "guest"
      t.timestamps
    end
  end
end
