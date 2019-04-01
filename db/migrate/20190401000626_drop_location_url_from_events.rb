class DropLocationUrlFromEvents < ActiveRecord::Migration[5.1]
  def change
    remove_column :events, :location_url
  end
end
