module Types
  class MutationType < Types::BaseObject
 
    field :create_hunter, mutation: Mutations::Hunter::Create, description: "Create a Hunter"
  end
end
