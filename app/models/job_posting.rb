class JobPosting < ApplicationRecord
  validates :job_title, :url, :company, presence: true, length: { minimum: 3 }
  validates :url, url: true  
  belongs_to :user
end
