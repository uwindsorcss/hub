class RemoveCapacityFromRegistrations < ActiveRecord::Migration[5.1]
  def change
    remove_column :registrations, :capacity
  end
end
