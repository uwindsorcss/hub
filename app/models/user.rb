class User < ApplicationRecord
  has_many :registrations
  has_many :events, through: :registrations
  has_one :discord_user, dependent: :destroy
  has_many :job_postings

  def is_admin?
    self.role == "admin"
  end
end
