class AddDiscordMessageIdToEvents < ActiveRecord::Migration[5.1]
  def change
    add_column :events, :discord_message_id, :bigint
  end
end
