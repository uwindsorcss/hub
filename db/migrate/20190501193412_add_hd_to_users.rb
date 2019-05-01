class AddHdToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :hd, :string
  end
end
