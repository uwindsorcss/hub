class CreateKoolCat < ActiveRecord::Migration[5.2]
  def change
    create_table :kool_cats do |t|
      t.string :email

      t.timestamps
    end
  end
end
