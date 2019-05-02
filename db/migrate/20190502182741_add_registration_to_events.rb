class AddRegistrationToEvents < ActiveRecord::Migration[5.1]
  def change
    add_column :events, :registration_enabled, :boolean
  end
end
