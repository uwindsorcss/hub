module Types
  class UserType < Types::BaseObject
    graphql_name "User"
    
    field :id, ID, null: false
    field :email, String, null: true
    field :name, String, null: true
    field :role, String, null: true
    field :progress, String, null: true
  end
end
