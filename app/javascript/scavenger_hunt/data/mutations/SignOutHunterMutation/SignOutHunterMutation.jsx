import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const name = "SignOutHunterMutation";

const SIGN_OUT_HUNTER_MUTATION = gql`
  mutation ${name}($input: HunterSignOutInput!){
    signOut(input: $input){
      hunter {
        name
      }
      error
    }
  }
`;

const useSignOutHunterMutation = () => useMutation(SIGN_OUT_HUNTER_MUTATION);

export { useSignOutHunterMutation, SIGN_OUT_HUNTER_MUTATION };