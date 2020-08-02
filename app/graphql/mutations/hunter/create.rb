module Mutations::Hunter
  class Create < Mutations::BaseMutation
    graphql_name "HunterCreate"
    description "Creates a new hunter"

    argument :email, String, required: true
    argument :name, String, required: true
    argument :role, String, required: false

    field :hunter, Types::HunterType, null: true
    field :errors, [String], null: false

    def resolve(email:, name:, role: nil)
      new_hunter = ::Hunter.new(email: email, name: name, role: role)

      if error_messages(new_hunter).any?
        error_response(error_messages(new_hunter))
      else
        new_hunter.save!
        build_payload(new_hunter.reload)
      end
    end

    private

      def error_messages(hunter)
          hunter.errors.full_messages if hunter.invalid? 
      end

      def error_response(errors = [])
        {
          hunter: nil,
          errors: errors
        }
      end

      def build_payload(hunter = nil)
        {
          hunter: hunter,
          errors: []
        }
      end
  end
end
