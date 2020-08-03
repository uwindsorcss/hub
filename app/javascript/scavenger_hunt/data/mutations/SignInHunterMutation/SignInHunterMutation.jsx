import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const name = "SignInHunterMutation";

const SIGN_IN_HUNTER_MUTATION = gql`
  mutation ${name}($input: HunterSignInInput!){
    signIn(input: $input){
      hunter {
        id,
        email, 
        name, 
        role
      }
    }
  }
`;

const useSignInHunterMutation = () => useMutation(SIGN_IN_HUNTER_MUTATION);

export { useSignInHunterMutation, SIGN_IN_HUNTER_MUTATION };