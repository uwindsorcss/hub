class RemoveJobPostings < ActiveRecord::Migration[5.1]
  def change
    drop_table :job_postings
  end
end
