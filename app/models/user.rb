class User < ApplicationRecord
  has_many :registrations
  has_many :events, through: :registrations

  def is_admin?
    $ADMINS.include? self.email
  end
end
