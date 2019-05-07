class AddApiTokenToDiscordUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :discord_users, :api_token, :string
  end
end
