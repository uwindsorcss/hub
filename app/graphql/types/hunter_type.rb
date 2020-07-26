module Types
  class HunterType < Types::BaseObject
    graphql_name "Hunter"
    
    field :id, ID, null: false
    field :email, String, null: false
    field :name, String, null: false
    field :role, String, null: true
  end
end
