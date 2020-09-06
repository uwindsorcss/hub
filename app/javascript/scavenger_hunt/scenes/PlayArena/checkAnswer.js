import { Clues } from '../../data/staticData/clues';
import { useUserData } from '../../hooks/useUserData';

const checkAnswer = (userAnswer, clueID, answerIndex=0, updateGQL=false) => {
  clueAnswer = Clues[clueID].answers[answerIndex];
  const [{progress}, setUserData] = useUserData();

  if (userAnswer.toLowerCase() === clueAnswer.toLowerCase()){
    if(clueID === progress+1 && updateGQL){
      setUserData({progress:progress+1});
    }
    return true;
  }
  
  return false;
}

export { checkAnswer };
