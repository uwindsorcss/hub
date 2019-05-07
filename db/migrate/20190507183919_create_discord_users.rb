class CreateDiscordUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :discord_users do |t|
      t.integer :discord_uid, limit: 8
      t.boolean :verified
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
