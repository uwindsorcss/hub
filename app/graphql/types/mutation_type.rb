module Types
  class MutationType < Types::BaseObject
    field :sign_out, mutation: Mutations::User::SignOut, description: "Signs out a User"
    field :user_update, mutation: Mutations::User::Update, description: "Updates user"
    field :save_user_answer, mutation: Mutations::User::SaveAnswer, description: "Saves user answer"
  end
end
