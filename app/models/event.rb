class Event < ApplicationRecord
  has_many :registrations
  has_many :users, through: :registrations
  has_many :guests, through: :registrations

  validates :title, :description, presence: true, length: { minimum: 3 }
  validates :capacity, presence: true

  def current_capacity
    return self.users.size + self.guests.size
  end
end
