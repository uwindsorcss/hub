module Types
  class MutationType < Types::BaseObject
    field :sign_out, mutation: Mutations::User::SignOut, description: "Signs out a User"
    field :update_user, mutation: Mutations::User::Update, description: "Updates user"
  end
end
