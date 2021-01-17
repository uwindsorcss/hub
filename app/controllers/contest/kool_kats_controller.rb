class Contest::KoolKatsController < ApplicationController
  layout 'contest'
  
  def index
    @kool_kats = KoolKat.all.order(created_at: :DESC)
  end

  def new
    @kool_kat = KoolKat.new
  end

  def edit
  end

  def update
  end

  def create
    @kool_kat = KoolKat.new(kool_kat_params)

    respond_to do |format|
      if @kool_kat.save
        format.html { redirect_to contest_kool_kats_url, notice: 'Image was successfully Saved.' }
        format.json { render :json, status: :created, location: contest_kool_kats_url }
      else
        format.html { render :new }
        format.json { render json: @kool_kat.errors, status: :unprocessable_entity }
      end
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

  def kool_kat_params
    params.require(:kool_kat).permit(:email, :description, :image)
  end
end
