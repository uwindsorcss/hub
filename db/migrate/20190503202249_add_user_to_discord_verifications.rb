class AddUserToDiscordVerifications < ActiveRecord::Migration[5.1]
  def change
    add_reference :discord_verifications, :user, foreign_key: true
  end
end
