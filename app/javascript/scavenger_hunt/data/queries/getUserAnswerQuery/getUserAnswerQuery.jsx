import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const name = "GetUserAnswerQuery";

const GET_USER_ANSWER_QUERY = gql`
  query ${name}($question_number: Int!) {
    currentUser {
      id
      answerTo(questionNumber: $question_number)
    }
  }
`;

const useGetUserAnswerQuery = (object) => useQuery(GET_USER_ANSWER_QUERY, object);

export { useGetUserAnswerQuery, GET_USER_ANSWER_QUERY };