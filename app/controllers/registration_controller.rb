class RegistrationController < ApplicationController
  def new
    user_id = params[:user_id].to_i
    event_id = params[:event_id].to_i
    if current_user.id == user_id && !(user_already_registered? user_id, event_id)
      @registration = Registration.new(
        user_id: user_id,
        event_id: event_id
      )
      @registration.save
    end
    redirect_to event_path(event_id)
  end

  def destroy
    @registration = Registration.find(params[:registration_id])
    if current_user == @registration.user
      @registration.destroy
    end
    redirect_to event_path(params[:event_id])
  end

  private

  def user_already_registered? (user_id, event_id)
    Registration.find_by(user_id: user_id, event_id: event_id)
  end
end
