module Types
  class MutationType < Types::BaseObject
 
    field :sign_in, mutation: Mutations::Hunter::SignIn, description: "Signs in a Hunter on Fly"
    field :sign_out, mutation: Mutations::Hunter::SignOut, description: "Signs out a Hunter"
  end
end
