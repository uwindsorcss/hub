class RemoveDiscordVerifications < ActiveRecord::Migration[5.1]
  def change
    drop_table :discord_verifications
  end
end
