import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const name = "SignOutUserMutation";

const SIGN_OUT_USER_MUTATION = gql`
  mutation ${name}($input: UserSignOutInput!){
    signOut(input: $input){
      user {
        name
      }
      error
    }
  }
`;

const useSignOutUserMutation = () => useMutation(SIGN_OUT_USER_MUTATION);

export { useSignOutUserMutation, SIGN_OUT_USER_MUTATION };