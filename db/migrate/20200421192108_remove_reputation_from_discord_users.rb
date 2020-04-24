class RemoveReputationFromDiscordUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :discord_users, :reputation, :integer
    remove_column :discord_users, :last_rep_given, :datetime
  end
end
