module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :users, [Types::UserType], null: false, description: "returns all the users"
    field :hunters, [Types::HunterType], null: false, description: "returns all the hunters"

    def users
      User.all
    end

    def hunters
      Hunter.all
    end
  end
end
