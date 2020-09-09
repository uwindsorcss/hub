module Types
  class AnswerType < Types::BaseObject
    graphql_name "Answer"
    
    field :id, ID, null: false
    field :user_id, ID, null: false
    field :question_id, ID, null: false
    field :answer, String, null: false
  end
end
