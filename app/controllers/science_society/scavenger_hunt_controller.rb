# frozen_string_literal

class ScienceSociety::ScavengerHuntController < ScienceSociety::BaseController
  def index
    render :index, layout: 'scavenger_hunt'
  end
end
