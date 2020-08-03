class AddHunterToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :hunter, :boolean
  end
end
