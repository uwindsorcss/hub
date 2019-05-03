class RenameVerificationTable < ActiveRecord::Migration[5.1]
  def change
    rename_table :verifications, :discord_verifications
  end
end
