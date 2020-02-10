class AddWaitlistedToRegistrations < ActiveRecord::Migration[5.1]
  def change
    add_column :registrations, :waitlisted, :boolean
  end
end
