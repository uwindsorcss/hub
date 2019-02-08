class SessionController < ApplicationController
  def create
    user = User.find_or_create_by(:email => auth_hash[:info][:email]) do |user|
      user.email = auth_hash[:info][:email]
      user.name = auth_hash[:info][:name]
    end

    session[:user_id] = user.id

    redirect_to root_path
  end

  def destroy
    reset_session

    redirect_to root_path
  end

  private

  def auth_hash
    request.env["omniauth.auth"]
  end
end
