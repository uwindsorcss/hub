class AddUserToJobPostings < ActiveRecord::Migration[5.1]
  def change
    add_reference :job_postings, :user, foreign_key: true
  end
end
