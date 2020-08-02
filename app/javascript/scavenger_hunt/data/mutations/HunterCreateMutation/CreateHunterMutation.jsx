import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const name = "CreateHunterMutation";

const CREATE_HUNTER_MUTATION = gql`
  mutation name($input: HunterCreateInput!){
    createHunter(input: $input){
      hunter {
        id
      }
      errors
    }
  }
`;

const useCreateHunterMutation = () => useMutation(CREATE_HUNTER_MUTATION);

export { useCreateHunterMutation, CREATE_HUNTER_MUTATION };