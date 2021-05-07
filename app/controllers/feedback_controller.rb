class FeedbackController < ApplicationController

	# GET /feedback
	def index
	end

	# POST /feedback
	def create
		@feedback = feedback_params
		FeedbackMailer.with(feedback: @feedback).submit_feedback.deliver_now
	end

	private

	def feedback_params
		params.require(:feedback)
	end
end
