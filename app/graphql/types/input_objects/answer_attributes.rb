module Types::InputObjects
  class AnswerAttributes < Types::BaseInputObject
    description "Attributes for answers"

    argument :question_number, Int, required: true
    argument :answer, String, required: true
  end 
end
