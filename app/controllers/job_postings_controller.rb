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
    @job_postings = JobPosting.all
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
    @job_posting = JobPosting.new(job_posting_params.merge(user: current_user))
    if current_user&.is_admin?
      if @job_posting.save
        redirect_to @job_posting, flash: { success: "Successfully created \"#{@job_posting.job_title}\"" }
      else
        render 'new'
      end
    else
      @job_posting.errors.add(:job_title, :no_permission, message: "You do not have permission to modify job postings!")
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
