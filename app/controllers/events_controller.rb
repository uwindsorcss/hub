class EventsController < ApplicationController
  def destroy
    @event = Event.find(params[:id])
    event_title = @event.title
    if current_user&.is_admin?
      @event.destroy
      DiscordMessageService.delete_message!(DiscordMessageService::DISCORD_EVENTS_CHANNEL_ID, @event.discord_message_id)
      redirect_to events_path, flash: { error: "Successfully deleted \"#{event_title}\"" }
    else
      redirect_to events_path, flash: { error: "Error deleting \"#{event_title}\""}
    end
  end

  def index
    @future_events = Event.where("DATETIME(end_date) > ?", Time.current).order(:start_date).page(params[:page])
    @past_events = Event.where("DATETIME(end_date) < ?", Time.current).order(start_date: :desc).page(params[:page])
  end

  def new
    @event = Event.new
  end

  def edit
    @event = Event.find(params[:id])
  end

  def update
    @event = Event.find(params[:id])
    if current_user&.is_admin?
      if @event.update(event_params)
        redirect_to @event
        if @event.discord_message_id && @event.discord_enabled
          DiscordMessageService.edit_message!(DiscordMessageService::DISCORD_EVENTS_CHANNEL_ID, @event.discord_message_id, build_event_message(@event))
        end
      else
        render 'edit'
      end
    else
      @event.errors.add(:title, :no_permission, message: "You do not have permission to modify events!")
      render 'edit'
    end
  end

  def create
    @event = Event.new(event_params)
    if current_user&.is_admin?
      if @event.save
        if @event.discord_enabled
          message_result = DiscordMessageService.send_message!(DiscordMessageService::DISCORD_EVENTS_CHANNEL_ID, build_event_message(@event))
          message_result = JSON.parse(message_result)
          @event.update(discord_message_id: message_result["id"])
        end
        EventReminderEmailJob.set(wait_until: @event.start_date - 8.hours).perform_later(@event)
        redirect_to @event, flash: { success: "Successfully created \"#{@event.title}\"" }
      else
        render 'new'
      end
    else
      @event.errors.add(:title, :no_permission, message: "You do not have permission to modify events!")
      render 'new'
    end
  end

  def show
    @event = Event.find(params[:id])
    @registered_users = @event.registered_users
    @registered_users_email_string = @registered_users.each_with_object("") { |u, s| s << "#{u.email}, " }
    @waitlisted_users = @event.waitlisted_users
    if current_user
      @user_registration = @event.registrations.find_by(user_id: current_user.id)
    end
  end

  private

  def event_params
    params.require(:event).permit(:title, :description, :capacity, :start_date, :end_date, :location, :registration_enabled, :discord_enabled)
  end

  def build_event_message(event)
    {
      content: "@everyone",
      embed: {
        title: "NEW EVENT!",
        fields: [
          {
            name: "Title",
            value: @event.title,
          },
          {
            name: "Description",
            value: @event.description,
          },
          {
            name: "Location",
            value: "[#{@event.location}](#{URI.escape("https://maps.google.com/?q=#{@event.location}")})",
          },
          {
            name: "Date",
            value: @event.start_date.strftime('%A, %B %d, %Y at %l:%M%P') +
             "#{event.registration_enabled ? "\n\n**This event has registrations enabled**. Please register through the CSS website if you'd like to attend the event." : ""}" +
             "\n\n[Click here to add to your Google Calendar](#{@event.google_calendar_url})\n\nView this event at #{ENV['HOST']}/events/#{@event.id}",
          }
        ],
      }
    }
  end
end
