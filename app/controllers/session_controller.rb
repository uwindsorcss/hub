class SessionController < ApplicationController
  def create
    user = User.find_or_create_by(:email => auth_hash[:info][:email]) do |user|
      user.email = auth_hash[:info][:email]
      user.name = auth_hash[:info][:name]
      user.hd = auth_hash[:extra][:raw_info][:hd]
    end

    session[:user_id] = user.id

    redirect_to request.env["omniauth.origin"]
  end

  def destroy
    reset_session

    redirect_to request.referrer
  end

  private

  def auth_hash
    request.env["omniauth.auth"]
  end
end
