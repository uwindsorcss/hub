module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :users, [Types::UserType], null: false, description: "returns all the users"
    field :hunters, [Types::HunterType], null: false, description: "returns all the hunters"
    field :current_hunter, Types::HunterType, null: true, description: "returns the hunter hunting"

    def users
      User.all
    end

    def hunters
      Hunter.all
    end

    def current_hunter
      hunter_id = context[:session][:user_id]
      if hunter_id.present?
        ::Hunter.find(hunter_id)
      else
        nil
      end
    end
  end
end
