class AddReasonToSparkle < ActiveRecord::Migration[5.1]
  def change
    add_column :sparkles, :reason, :string
  end
end
