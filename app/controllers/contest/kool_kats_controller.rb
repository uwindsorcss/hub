class Contest::KoolKatsController < ApplicationController
  layout 'contest'
  
  def index
    flash[:info] = nil
    @kool_kats = KoolKat.all.order(created_at: :DESC)
    flash[:info] = "You will have to log in to vote" if !current_user
  end

  def new
    @kool_kat = KoolKat.new
  end

  def create
    @kool_kat = KoolKat.new(kool_kat_params)

    respond_to do |format|
      if @kool_kat.save
        format.html { redirect_to contest_kool_kats_url, flash: { success: 'Image was successfully Saved.' }} 
        format.json { render :json, status: :created, location: contest_kool_kats_url }
      else
        format.html { render :new }
        format.json { render json: @kool_kat.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
  end

  def update
  end

  def show
  end

  def update_votes
    return redirect_to contest_kool_kats_path, flash: { error: 'Looks like you already voted once'} if current_user.voted  

    kool_kat_id = params[:image_id]
    kool_kat_id.each do |kool_kat_id| 
      kool_kat = KoolKat.find_by(id: kool_kat_id)
      if kool_kat
        existing_votes = kool_kat.votes 
        kool_kat.update(votes: existing_votes + 1)
      end
    end
    current_user.update(voted: true)
    redirect_to contest_kool_kats_path, flash: { success: 'Your votes were sucessfully saved, thanks for voting :)'} 
  end

  private

    def kool_kat_params
      params.require(:kool_kat).permit(:email, :description, :image)
    end
end
