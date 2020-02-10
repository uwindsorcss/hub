class EventReminderEmailJob < ApplicationJob
  queue_as :default

  def perform(event)
    if event&.registration_enabled
      email_list = event.registered_users.each_with_object([]) { |u, email_list| email_list << u.email }
      UserMailer.with(bcc_list: email_list, event: event).event_reminder_email.deliver_later
    end
  end
end
