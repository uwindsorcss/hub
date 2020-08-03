module Mutations::Hunter
  class SignIn < Mutations::BaseMutation
    graphql_name "HunterSignIn"
    description "signs a Hunter in, creates Hunter if necessay"

    argument :email, String, required: true
    argument :name, String, required: true
    argument :role, String, required: false

    field :hunter, Types::HunterType, null: true

    def resolve(email:, name:, role: nil)
      new_or_existing_user  = ::Hunter.create_with(name: name, role: role).find_or_create_by(email: email) # always returns an Hunter instance

      context[:session][:user_id] = new_or_existing_user.id
      
      build_payload(new_or_existing_user)
    end

    private

      def build_payload(hunter = nil)
        {
          hunter: hunter
        }
      end
  end
end
