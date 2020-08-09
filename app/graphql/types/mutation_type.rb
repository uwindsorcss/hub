module Types
  class MutationType < Types::BaseObject
    field :sign_out, mutation: Mutations::User::SignOut, description: "Signs out a User"
    field :user_update, mutation: Mutations::User::Update, description: "Updates user"
  end
end
