class AddReportedToJobPostings < ActiveRecord::Migration[5.1]
  def change
    add_column :job_postings, :reported, :boolean
  end
end
