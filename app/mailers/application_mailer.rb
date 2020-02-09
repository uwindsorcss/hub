class ApplicationMailer < ActionMailer::Base
  add_template_helper(ApplicationHelper)
  default from: ENV['GMAIL_USERNAME']
  layout 'mailer'
end
