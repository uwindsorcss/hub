import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const name = "SaveUserAnswer";

const SAVE_USER_ANSWER_MUTATION = gql`
  mutation ${name}($input: SaveUserAnswerInput!){
    saveUserAnswer(input: $input) {
      answer {
        id
        questionId
        userId
        answer
      }
      errors
    }
  }
`;

const useSaveUserAnswerMutation = () => useMutation(SAVE_USER_ANSWER_MUTATION);

export { useSaveUserAnswerMutation, SAVE_USER_ANSWER_MUTATION };