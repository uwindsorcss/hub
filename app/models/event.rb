class Event < ApplicationRecord
  has_many :registrations
  has_many :users, through: :registrations
  has_many :guests, through: :registrations

  validates :title, :description, :location, :start_date, :end_time, presence: true, length: { minimum: 3 }
  validates :capacity, presence: true, numericality: { only_integer: true, greater_than: 0 }, if: :registration_enabled

  def current_capacity
    self.users.size + self.guests.size
  end

  def spots_remaining
    self.capacity - self.current_capacity
  end

  def all_guests
    self.users + self.guests
  end
end
