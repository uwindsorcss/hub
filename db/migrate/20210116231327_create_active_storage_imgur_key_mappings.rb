class CreateActiveStorageImgurKeyMappings < ActiveRecord::Migration[5.2]
  def change
    create_table :active_storage_imgur_key_mappings do |t|
      t.string   :key,        null: false
      t.string   :imgur_id,   null: false
      t.index [ :key ], unique: true
    end
  end
end
