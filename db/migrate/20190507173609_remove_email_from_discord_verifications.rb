class RemoveEmailFromDiscordVerifications < ActiveRecord::Migration[5.1]
  def change
    remove_column :discord_verifications, :email
  end
end
