module Types::InputObjects
  class UserAttributes < Types::BaseInputObject
    description "Attributes for updating a user"
    argument :email, String, required: false
    argument :name, String, required: false
    argument :role, String, required: false
    argument :progress, Int, required: false
  end 
end
