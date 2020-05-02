class RegistrationController < ApplicationController
  def new
    user_id = params[:user_id].to_i
    event = Event.find(params[:event_id])
    if current_user.id == user_id && !(user_already_registered? user_id, event.id) && event.start_date.future?
      @registration = Registration.new(
        user_id: user_id,
        event_id: event.id,
        waitlisted: false
      )
      if (1 + @registration.guests.size) > event.spots_remaining
        @registration.assign_attributes(waitlisted: true)
        @registration.save
        redirect_to event_path(event), :flash => { :success => "You've been added to the waitlist for this event! You will receive an email if you make it off the list. Position in the waitlist: #{@registration.position_in_waitlist}" }
      else
        @registration.save
        redirect_to event_path(event), :flash => { :success => "Successfully registered for event!" }
      end
    else
      redirect_to event_path(event), :flash => { :error => "Something went wrong." }
    end
  end

  def destroy
    is_registrationId_given = params[:registration_id].present?
    if is_registrationId_given
      @registration = Registration.find(params[:registration_id])
    elsif current_user.is_admin?
      event_id = params[:event_id]
      user_id = params[:user_id]
      @registration = Registration.where(user_id,event_id).first
    else 
      redirect_to event_path(params[:event_id])
    end
      
    if ((current_user == @registration.user) || current_user.is_admin?) && @registration.event.start_date.future?
      user_waitlisted = @registration.waitlisted
      event = @registration.event
      @registration.destroy
      event.update_waitlist unless user_waitlisted
      redirect_to event_path(params[:event_id]), flash: { warning: !current_user.is_admin? ? "Successfully unregistered from this event!" : "Successfully removed #{@registration.user.name} from this event!"  }
    else
      redirect_to event_path(params[:event_id])
    end
  end

  private

  def user_already_registered? (user_id, event_id)
    Registration.find_by(user_id: user_id, event_id: event_id)
  end
end
