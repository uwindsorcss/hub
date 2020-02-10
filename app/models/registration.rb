class Registration < ApplicationRecord
  has_many :guests
  belongs_to :user
  belongs_to :event

  def waitlisted?
    self.waitlisted
  end

  def position_in_waitlist
    event.waitlisted_users.find_index(user) + 1
  end
end
