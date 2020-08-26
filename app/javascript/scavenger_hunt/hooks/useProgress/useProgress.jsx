import { useCurrentUserQuery } from '../../data/queries';
import { useUpdateUserMutation } from '../../data/mutations';

const useProgress = () => {
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

  const currentProgress = (!isLoading && userData.currentUser) ? parseInt(userData.currentUser.progress) : 0;

  return [ currentProgress, setProgress, isLoading ];
}

export { useProgress }
