module Mutations::Hunter
  class SignOut < Mutations::BaseMutation
    graphql_name "HunterSignOut"
    description "signs out a user"

    argument :id, ID, required: true

    field :hunter, Types::HunterType, null: true
    field :error, String, null: true


    def resolve(id:)
      if context[:session][:user_id] == id.to_i
        reset_session
        hunter = ::Hunter.find(id)
        { hunter: hunter, error: ""}
      else
        { hunter: nil, error: "There was an error signing out the user" } 
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
