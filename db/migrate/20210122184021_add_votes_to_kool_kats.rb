class AddVotesToKoolKats < ActiveRecord::Migration[5.2]
  def change
    add_column :kool_kats, :votes, :integer, default: 0
  end
end
