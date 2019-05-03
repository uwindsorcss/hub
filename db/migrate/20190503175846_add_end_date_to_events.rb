class AddEndDateToEvents < ActiveRecord::Migration[5.1]
  def change
    add_column :events, :end_date, :datetime
    rename_column :events, :date, :start_date
  end
end
