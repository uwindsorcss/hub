class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?, :current_discord_user

  skip_before_action :verify_authenticity_token

  def current_user
    current_user ||= User.find(session[:user_id]) if session[:user_id]
  rescue ActiveRecord::RecordNotFound
    reset_session
  end

  def current_discord_user
    current_discord_user ||= DiscordUser.find(session[:discord_user_id]) if session[:discord_user_id]
  rescue ActiveRecord::RecordNotFound
    reset_session
  end

  def logged_in?
    !!current_user
  end
end
