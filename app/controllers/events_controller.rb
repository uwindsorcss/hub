class EventsController < ApplicationController
  def destroy
    @event = Event.find(params[:id])
    @event.destroy

    redirect_to events_path
  end

  def index
    @events = Event.all
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

  def create
    @event = Event.new(params.require(:event).permit(:title, :description))
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
  end

  private

  def event_params
    params.require(:event).permit(:title, :description)
  end
end
