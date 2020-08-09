import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const name = "CurrentUserQuery";

const CURRENT_USER_QUERY = gql`
  query ${name} {
    currentUser {
      id
      name
      email
      role
      progress
    }
  }
`;

const useCurrentUserQuery = () => useQuery(CURRENT_USER_QUERY);

export { useCurrentUserQuery, CURRENT_USER_QUERY };