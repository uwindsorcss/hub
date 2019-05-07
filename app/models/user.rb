class User < ApplicationRecord
  has_many :registrations
  has_many :events, through: :registrations
  has_one :discord_verification
  has_one :discord_user

  def is_admin?
    self.role == "admin"
  end
end
