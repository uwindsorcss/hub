class ChangeKoolCatsToKoolKats < ActiveRecord::Migration[5.2]
  def change
    rename_table :kool_cats, :kool_kats
  end
end
