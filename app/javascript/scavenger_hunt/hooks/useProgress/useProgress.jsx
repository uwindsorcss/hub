import { useCurrentUserQuery } from '../../../data/queries';
import { useUpdateUserMutation } from '../../../data/mutations';

const useProgress = (isLoggedIn) => {
  const { data: userData, loading: isLoading } = useCurrentUserQuery();
  const [updateUser, { loading: mutationLoading }] = useUpdateUserMutation();
  
  const setProgress = number => {
    if(!mutationLoading) {
      updateUser({
        variables: {
          input: {
            progress: number,
          }
        }
      })
    }
  }

  const currentProgress = (isLoggedIn) ? parseInt(userData.currentUser.progress) : 0

  return [ currentProgress, setProgress, isLoading ];
}

export { useProgress }
