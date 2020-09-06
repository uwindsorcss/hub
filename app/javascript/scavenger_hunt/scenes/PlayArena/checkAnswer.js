import { Clues } from '../../data/staticData/clues';

const checkAnswer = (userAnswer, progress, setUserData, clueID, answerIndex=0, updateGQL=false) => {
  console.log(Clues)
  console.log(Clues[clueID-1])
  console.log(Clues[clueID-1].answers)
  console.log(Clues[clueID-1].answers[answerIndex])
  const clueAnswer = Clues[clueID-1].answers[answerIndex];

  console.log('test')
  if (userAnswer.toLowerCase() === clueAnswer.toLowerCase()){
    if(clueID === (progress+1) && updateGQL){
      setUserData({progress:progress+1});
    }
    return true;
  }
  
  return false;
}

export { checkAnswer };
