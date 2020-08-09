import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const name = "UpdateUserMutation";

const UPDATE_USER_MUTATION = gql`
  mutation ${name}($input: UpdateUserInput!){
    userUpdate(input: $input) {
      user {
        id
        email
        name
        progress
        role
      }
      errors
    }
  }
`;

const useUpdateUserMutation = () => useMutation(UPDATE_USER_MUTATION);

export { useUpdateUserMutation, UPDATE_USER_MUTATION };