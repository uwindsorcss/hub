class AddLocationUrlToEvents < ActiveRecord::Migration[5.1]
  def change
    add_column :events, :location_url, :string
  end
end
