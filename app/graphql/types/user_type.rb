module Types
  class UserType < Types::BaseObject
    graphql_name "User"
    
    field :id, ID, null: false
    field :email, String, null: true
    field :name, String, null: true
    field :role, String, null: true
    field :progress, String, null: true
    field :answer_to, String, null: true do
      argument :question_number, Int, required: true
    end

    def answer_to(question_number:)
      user = User.find(context[:current_user].id)
      question = Question.find_by(question_number: question_number)

      questions_answered_by_user = user.questions.pluck(:question_number)

      if questions_answered_by_user.include? question_number
        Answer.where(user: user, question: question).first.answer
      else
        nil
      end
    end
  end
end
