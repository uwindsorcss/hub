module Types
  class MutationType < Types::BaseObject
 
    field :sign_in, mutation: Mutations::Hunter::SignIn, description: "Signs in a Hunter on Fly"
  end
end
