module Mutations::User
  class Update < Mutations::BaseMutation
    graphql_name "UpdateUser"
    description "returns what question a user is in scavenger hunt"

    argument :user_attributes, Types::InputObjects::UserAttributes, required: true

    field :user, Types::UserType, null: true
    field :errors, [String], null: false


    def resolve(user_attributes:)
      user = User.find(context[:current_user].id)
      update_attrs = approved_params(user_attributes)

      begin
        User.transaction do
          user.update!(update_attrs)
        end
      rescue ActiveRecord::RecordInvalid
      end
      {
        user: user.reload, 
        errors: user.errors.full_messages
      }
    end

    private
      def approved_params(user_attributes)
        require_params(user_attributes.to_h, :email, :name, :role, :progress)
      end
  end
end
