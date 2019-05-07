class RemoveApiTokenFromDiscordUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :discord_users, :api_token
  end
end
