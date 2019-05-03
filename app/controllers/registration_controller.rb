class RegistrationController < ApplicationController
  def new
    user_id = params[:user_id].to_i
    event = Event.find(params[:event_id])
    if current_user.id == user_id && !(user_already_registered? user_id, event.id) && event.start_date.future?
      @registration = Registration.new(
        user_id: user_id,
        event_id: event.id
      )
      if (1 + @registration.guests.size) > event.spots_remaining
        redirect_to event_path(event), :flash => { :error => "There are #{event.spots_remaining} spot(s) available!" }
      else
        @registration.save
        redirect_to event_path(event), :flash => { :success => "Successfully registered for event!" }
      end
    else
      redirect_to event_path(event), :flash => { :error => "Something went wrong." }
    end
  end

  def destroy
    @registration = Registration.find(params[:registration_id])
    if current_user == @registration.user && @registration.event.start_date.future?
      @registration.destroy
      redirect_to event_path(params[:event_id]), flash: { warning: "Successfully unregistered from this event!"  }
    else
      redirect_to event_path(params[:event_id])
    end
  end

  private

  def user_already_registered? (user_id, event_id)
    Registration.find_by(user_id: user_id, event_id: event_id)
  end
end
