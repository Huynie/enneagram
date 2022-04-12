import { useQuery, useMutation, useQueryClient } from "react-query";
import { db, auth } from '../firebase/config';
import { doc, getDoc, setDoc, updateDoc,arrayUnion, arrayRemove } from "firebase/firestore/lite";


const breakDownScore = (score) => {
  const highNums = [...score].sort((a,b) => b-a).slice(0,3);
  const highs = []; 
  const lows = [];
  let core;
  //GET HIGHEST SCORE
  highNums.forEach((num, idx) => {
    if(idx === 0) {core = score.indexOf(num) + 1; return};
    highs.push(score.indexOf(num) + 1);
  });
  //GET 2 LOWEST SCORE
  const lowNums = [...score].sort((a,b) => a-b).slice(0,2);
  lowNums.forEach((num) => {
    lows.push(score.indexOf(num) + 1);
  });
  return [core, highs, lows]
};

const invalidateQuery = () => {
  const queryClient = useQueryClient();
  // invalidate query cache and triggers refetch
  queryClient.invalidateQueries('userData');
};

const fetchUser =  async () => {
  const userDatabase = doc(db, "users", auth.currentUser.uid);
  const res = await getDoc(userDatabase);
  const {firstName, lastName, results} = await res.data();
  if(results) {
    const latestScore = results[0].score;
    const [core, highs, lows] = breakDownScore(latestScore);
    return {
      firstName,
      lastName,
      highs,
      lows,
      core,
      results
    }
  }
  return {
    firstName,
    lastName,
  }
};

const deleteResult = result => {
  const user = doc(db, `users/${auth.currentUser.uid}`);
  const results = arrayRemove(result); 
  try {
    updateDoc(user, { results });
    console.log('Result deleted!');
  } catch (err) {
      console.log(err);
  }
}

const addResult = result => {
  const dataBase = doc(db, `users/${auth.currentUser.uid}`);
  const newResult = { "date/time": new Date(), score: result };
  const addData = arrayUnion( newResult );
  try {
    setDoc(dataBase,{ results: addData},{ merge: true });
    console.log("Added new result!");
  } catch (err) {
    console.log(err);
  }
}

export const useGetUser = () => useQuery('userData', fetchUser);

export const useDeleteResult = () => useMutation(deleteResult, {
  onSuccess:  invalidateQuery()
});

export const useAddResult = () => useMutation(addResult, {
  onSuccess: invalidateQuery()
});