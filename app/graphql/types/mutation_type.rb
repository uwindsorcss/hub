module Types
  class MutationType < Types::BaseObject

    field :sign_out, mutation: Mutations::User::SignOut, description: "Signs out a User"
  end
end
