class EventsController < ApplicationController
  def destroy
    @event = Event.find(params[:id])
    if current_user&.is_admin?
      @event.destroy
    end

    redirect_to events_path
  end

  def index
    @future_events = Event.select { |event| event.date.future? }
    @past_events = Event.select { |event| event.date.past? }.last(5)
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
        redirect_to @event
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
      @registration = @event.registrations.find_by(user_id: current_user.id)
    end
  end

  private

  def event_params
    params.require(:event).permit(:title, :description, :capacity, :date, :location, :location_url)
  end
end
