module Mutations::User
  class SaveAnswer < Mutations::BaseMutation
    graphql_name "SaveUserAnswer"
    description "saves the user answer submitted in scavenger hunt"

    argument :answer_attributes, Types::InputObjects::AnswerAttributes, required: true

    field :answer, Types::AnswerType, null: true
    field :errors, [String], null: false

    def resolve(answer_attributes:)
      user = User.find(context[:current_user].id)
      question = Question.find_by(question_number: answer_attributes.question_number)

      begin
        saved_answer = Answer.where(user: user, question: question).first_or_create do |user_answer|
          user_answer.answer = answer_attributes.answer
        end
        saved_answer.update(answer: answer_attributes.answer)
      rescue => exception
      end
      {
        answer: saved_answer, 
        errors: saved_answer.errors.full_messages
      }
    end
  end
end
