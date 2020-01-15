class JobPostingsController < ApplicationController
  def destroy
    @job_posting = JobPosting.find(params[:id])
    if current_user&.is_admin?
      @job_posting.destroy
      redirect_to job_postings_path, flash: { error: "Successfully deleted the job posting" }
    else
      redirect_to job_postings_path, flash: { error: "Error deleting the job posting"}
    end
  end

  def index
    @job_postings = JobPosting.where(approved: true)
  end

  def new
    @job_posting = JobPosting.new
  end

  def edit
    @job_posting = JobPosting.find(params[:id])
  end

  def update
    @job_posting = JobPosting.find(params[:id])
    if current_user&.is_admin?
      if @job_posting.update(job_posting_params)
        redirect_to @job_posting
      else
        render 'edit'
      end
    else
      @job_posting.errors.add(:job_title, :no_permission, message: "You do not have permission to modify job postings!")
      render 'edit'
    end
  end

  def create
    @job_posting = JobPosting.new(job_posting_params)
    if current_user&.is_admin?
      @job_posting.assign_attributes(user: current_user, approved: true)
      if @job_posting.save
        redirect_to @job_posting, flash: { success: "Successfully created \"#{@job_posting.job_title}\"" }
      else
        render 'new'
      end
    elsif current_user
      @job_posting.assign_attributes(user: current_user, approved: false)
      if @job_posting.save
        redirect_to @job_posting, flash: { success: "Successfully submitted job posting for approval. Thank you for your contribution!" }
      else
        render 'new'
      end
    else
      @job_posting.errors.add(:base, :no_permission, message: "You need to be signed in to submit a job posting!")
      render 'new'
    end
  end

  def show
    @job_posting = JobPosting.find(params[:id])
  end

  private

  def job_posting_params
    params.require(:job_posting).permit(:job_title, :company, :url)
  end
end
