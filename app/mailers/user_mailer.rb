class UserMailer < ApplicationMailer
  default from: "Computer Science Society <#{ENV['GMAIL_USERNAME']}>"

  def waitlist_email
    @user = params[:user]
    @event = params[:event]
    @url  = 'http://example.com/login'
    mail(to: @user.email, subject: "You're in! #{@event.title}")
  end
end
