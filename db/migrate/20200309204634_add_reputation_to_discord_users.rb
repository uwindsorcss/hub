class AddReputationToDiscordUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :discord_users, :reputation, :integer, default: 0
    add_column :discord_users, :last_rep_given, :datetime
  end
end
