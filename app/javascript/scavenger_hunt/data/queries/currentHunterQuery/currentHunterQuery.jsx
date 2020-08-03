import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const name = "CurrentHunterQuery";

const CURRENT_HUNTER_QUERY = gql`
  query ${name} {
    currentHunter {
      id
      name
      email
      role
    }
  }
`;

const useCurrentHunterQuery = () => useQuery(CURRENT_HUNTER_QUERY);

export { useCurrentHunterQuery, CURRENT_HUNTER_QUERY };