class CreateJobPostings < ActiveRecord::Migration[5.1]
  def change
    create_table :job_postings do |t|
      t.string :company
      t.string :job_title
      t.string :url

      t.timestamps
    end
  end
end
