class EventsController < ApplicationController
  def destroy
    @event = Event.find(params[:id])
    event_title = @event.title
    if current_user&.is_admin?
      @event.destroy
      redirect_to events_path, flash: { error: "Successfully deleted \"#{event_title}\"" }
    else
      redirect_to events_path, flash: { error: "Error deleting \"#{event_title}\""}
    end
  end

  def index
    @future_events = Event.select { |event| event.start_date.future? }.sort_by &:start_date
    @past_events = (Event.select { |event| event.start_date.past? }.sort_by &:start_date).reverse.first(5)
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
        if @event.discord_message_id
          DiscordMessageService.edit_message!("607374824888729611", @event.discord_message_id, build_event_message(@event))
        end
      else
        render 'edit'
      end
    else
      @event.errors.add(:title, :no_permission, message: "You do not have permission to modify events!")
      render 'edit'
    end
  end

  def guests
    @event = Event.find(params[:id])
    unless current_user&.is_admin?
      display_404
    end
  end

  def create
    @event = Event.new(event_params)
    if current_user&.is_admin?
      if @event.save
        message_result = DiscordMessageService.send_message!("607374824888729611", build_event_message(@event))
        message_result = JSON.parse(message_result)
        @event.update(discord_message_id: message_result["id"])
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
    if current_user
      @user_registration = @event.registrations.find_by(user_id: current_user.id)
    end
  end

  private

  def event_params
    params.require(:event).permit(:title, :description, :capacity, :start_date, :end_time, :location, :registration_enabled)
  end

  def build_event_message(event)
    {
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
             "\n\n**This event has registrations enabled**. Please register through the CSS website if you'd like to attend the event." +
             "\n\nView this event at #{ENV['HOST']}/events/#{@event.id}",
          }
        ],
        thumbnail: { url: "https://css.uwindsor.ca/uwindsor_logo.png" }
      }
    }
  end
end
