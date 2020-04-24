class AddUserToSparkles < ActiveRecord::Migration[5.1]
  def change
    add_column :sparkles, :sender_id, :integer
    add_column :sparkles, :receiver_id, :integer
  end
end
