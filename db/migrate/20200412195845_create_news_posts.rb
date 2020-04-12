# frozen_string_literal: true

class CreateNewsPosts < ActiveRecord::Migration[5.1]
  def change
    create_table :news_posts do |t|
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end
