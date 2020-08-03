module Mutations::User
  class SignOut < Mutations::BaseMutation
    graphql_name "UserSignOut"
    description "signs out a user"

    argument :id, ID, required: true

    field :user, Types::UserType, null: true
    field :error, String, null: true


    def resolve(id:)
      if context[:session][:user_id] == id.to_i
        reset_session
        user = User.find(id)
        { user: user, error: ""}
      else
        { user: nil, error: "There was an error signing out the user" } 
      end
    end

    private

      def reset_session
        if context[:session] && context[:session].respond_to?(:destroy)
          context[:session].destroy
        else
          self.context[:session] = {}
        end
      end
  end
end
