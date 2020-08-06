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

const useSignOutUserMutation = () => useMutation(SIGN_OUT_USER_MUTATION);

export { useSignOutUserMutation, SIGN_OUT_USER_MUTATION };