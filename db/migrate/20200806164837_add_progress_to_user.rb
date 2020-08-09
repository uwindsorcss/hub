class AddProgressToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :progress, :integer
  end
end
