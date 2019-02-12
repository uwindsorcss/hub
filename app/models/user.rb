class User < ApplicationRecord
  has_many :registrations
  has_many :events, through: :registrations

  def is_admin?
    self.role == "admin"
  end
end
