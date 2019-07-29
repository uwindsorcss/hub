class AddMarkdownPages < ActiveRecord::Migration[5.1]
  def change
    create_table :markdown_pages do |t|
      t.string :title
      t.string :text

      t.timestamps
    end    
  end
end
