class AddDiscordEnabledToEvents < ActiveRecord::Migration[5.1]
  def change
    add_column :events, :discord_enabled, :boolean
  end
end
