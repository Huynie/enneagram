import React from 'react'

const useCalculateScore = (score) => {
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
}

export default useCalculateScore