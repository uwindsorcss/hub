class CreateSparkles < ActiveRecord::Migration[5.1]
  def change
    create_table :sparkles do |t|

      t.timestamps
    end
  end
end
