class Event < ApplicationRecord
  has_many :registrations, dependent: :destroy
  has_many :users, through: :registrations
  has_many :guests, through: :registrations

  validates :title, :description, :start_date, presence: true, length: { minimum: 3 }
  validates :capacity, presence: true, numericality: { only_integer: true, greater_than: 0 }, if: :registration_enabled
  validates :end_date, presence: true, date: { after_or_equal_to: :start_date }

  validate :waitlist_up_to_date, if: :will_save_change_to_capacity?

  def current_capacity
    self.registered_users.size
  end

  def spots_remaining
    self.capacity - self.current_capacity
  end

  def all_guests
    self.registered_users
  end

  def registered_users
    self.registrations.each_with_object([]) do |r, registered_users|
      registered_users << r.user if r.reload.waitlisted == false
    end
  end

  def waitlisted_users
    waitlist = self.registrations.where(waitlisted: true).sort_by &:created_at
    waitlist.each_with_object([]) do |r, waitlisted_users|
      waitlisted_users << r.user
    end
  end

  def waitlisted_registrations
    self.registrations.where(waitlisted: true).sort_by &:created_at
  end

  def waitlist_size
    self.registrations.where(waitlisted: true).count
  end

  def update_waitlist
    while spots_remaining > 0 && waitlist_size > 0
      registration_to_update = waitlisted_registrations.first
      user_to_register = registration_to_update.user
      registration_to_update.update(waitlisted: false)
      UserMailer.with(user: user_to_register, event: self).waitlist_email.deliver_later
    end
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

  private

  def waitlist_up_to_date
    self.update_waitlist
    return true
  end
end
