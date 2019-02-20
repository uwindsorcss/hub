class RegistrationController < ApplicationController
  def new
    user_id = params[:user_id].to_i
    event = Event.find(params[:event_id])
    if current_user.id == user_id && !(user_already_registered? user_id, event.id) && event.date.future?
      @registration = Registration.new(
        user_id: user_id,
        event_id: event.id
      )
      if (1 + @registration.guests.size) > spots_remaining(event)
        redirect_to event_path(event), :flash => { :error => "There are #{spots_remaining(event)} spot(s) available!" }
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
    if current_user == @registration.user && @registration.event.date.future?
      @registration.destroy
    end
    redirect_to event_path(params[:event_id])
  end

  private

  def user_already_registered? (user_id, event_id)
    Registration.find_by(user_id: user_id, event_id: event_id)
  end

  def spots_remaining(event)
    event.capacity - event.current_capacity
  end
end
