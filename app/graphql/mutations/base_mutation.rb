module Mutations
  class BaseMutation < GraphQL::Schema::RelayClassicMutation
    argument_class Types::BaseArgument	
    field_class Types::BaseField	
    input_object_class Types::BaseInputObject	
    object_class Types::BaseObject

    def require_params(attributes, *approved)
      attributes.reduce({}) do |params, attribute|
        params[attribute.first] = attribute.last if approved.include?(attribute.first)
        params
      end
    end
  end
end
