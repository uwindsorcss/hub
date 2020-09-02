module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :users, [Types::UserType], null: false, description: "returns all the users"
    field :current_user, Types::UserType, null: true, description: "returns the current user"

    def users
      User.all
    end

    def current_user
      user_id = context[:current_user]&.id
      if user_id.present?
        User.find(user_id)
      else
        nil
      end
    end
  end
end
