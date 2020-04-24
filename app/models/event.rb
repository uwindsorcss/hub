class Event < ApplicationRecord
  has_many :registrations, dependent: :destroy
  has_many :registered_users, through: :registrations, source: :user do
    def not_waitlisted
      where('registrations.waitlisted = ?', false)
    end

    def waitlisted
      where('registrations.waitlisted = ?', true)
    end
  end

  has_many :guests, through: :registrations

  validates :title, :description, :start_date, presence: true, length: { minimum: 3 }
  validates :capacity, presence: true, numericality: { only_integer: true, greater_than: 0 }, if: :registration_enabled
  validates :end_date, presence: true, date: { after_or_equal_to: :start_date }

  validate :waitlist_up_to_date, if: :will_save_change_to_capacity?

  def current_capacity
    registered_users.not_waitlisted.count
  end

  def spots_remaining
    capacity - current_capacity
  end

  def waitlisted_users
    waitlist = registrations.where(waitlisted: true).sort_by(&:created_at)
    waitlist.each_with_object([]) do |r, waitlisted_users|
      waitlisted_users << r.user
    end
  end

  def waitlisted_registrations
    registrations.where(waitlisted: true).sort_by(&:created_at)
  end

  def waitlist_size
    registered_users.waitlisted.count
  end

  def update_waitlist
    while spots_remaining.positive? && waitlist_size.positive?
      registration_to_update = waitlisted_registrations.first
      user_to_register = registration_to_update.user
      registration_to_update.update(waitlisted: false)
      UserMailer.with(user: user_to_register, event: self).waitlist_email.deliver_later
    end
  end

  def multi_day?
    start_date.to_date != end_date.to_date
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
    update_waitlist
    true
  end
end
