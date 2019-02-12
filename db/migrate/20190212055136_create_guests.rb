class CreateGuests < ActiveRecord::Migration[5.1]
  def change
    create_table :guests do |t|
      t.string :name
      t.belongs_to :registration, index: true
      t.timestamps
    end
  end
end
