class Event < ApplicationRecord
  has_many :registrations, dependent: :destroy
  has_many :users, through: :registrations
  has_many :guests, through: :registrations

  validates :title, :description, :start_date, presence: true, length: { minimum: 3 }
  validates :capacity, presence: true, numericality: { only_integer: true, greater_than: 0 }, if: :registration_enabled
  validates :end_date, presence: true, date: { after_or_equal_to: :start_date }

  def current_capacity
    self.users.size + self.guests.size
  end

  def spots_remaining
    self.capacity - self.current_capacity
  end

  def all_guests
    self.users + self.guests
  end

  def multi_day?
    self.start_date.to_date != self.end_date.to_date
  end

  def google_calendar_url
    start_date = self.start_date.rfc3339
    end_date = self.end_date.rfc3339
    start_date = start_date[0..-7].delete(":-")
    end_date = end_date[0..-7].delete(":-")

    params = {
      action: "TEMPLATE",
      text: self.title,
      dates: "#{start_date}/#{end_date}",
      ctz: "America/Toronto",
      details: self.description,
      location: self.location
    }
    URI::HTTPS.build(host: "calendar.google.com", path: "/calendar/r/eventedit", query: params.to_query).to_s
  end
end
