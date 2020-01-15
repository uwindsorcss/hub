class AddApprovedToJobPostings < ActiveRecord::Migration[5.1]
  def change
    add_column :job_postings, :approved, :boolean
  end
end
