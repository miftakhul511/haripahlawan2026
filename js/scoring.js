// Semua perubahan skor terjadi di fungsi proses, bukan saat memilih jawaban.
export function processR1(state,q){if(state.processed)return state;const delta=state.answers.map(a=>a===q.answer?10:0);return applyDeltas(state,delta,q);}
export function processR2(state,q,value){
  if(state.processed||state.eligible===null||!state.answers[state.eligible]||state.attempted.includes(state.eligible))return state;
  const teamIndex=state.eligible, correct=state.answers[teamIndex]===q.answer;
  const delta=[0,0,0];delta[teamIndex]=correct?value:-value;
  const teams=state.teams.map((team,i)=>({...team,score:team.score+delta[i]}));
  const attempted=[...state.attempted,teamIndex];
  const finished=correct||attempted.length>=state.teams.length;
  return {...state,teams,attempted,eligible:finished?teamIndex:null,processed:finished,feedback:{answer:q.answer,explanation:q.explanation,delta,oldScores:state.teams.map(t=>t.score),teamIndex,correct,tries:attempted.length}};
}
export function processR3(state,q){if(state.processed||!state.betsLocked)return state;const delta=state.bets.map((b,i)=>state.answers[i]===q.answer?b:-b);return applyDeltas(state,delta,q);}
function applyDeltas(state,delta,q){const teams=state.teams.map((t,i)=>({...t,score:t.score+delta[i]}));return {...state,teams,processed:true,feedback:{answer:q.answer,explanation:q.explanation,delta,oldScores:state.teams.map(t=>t.score)}}}
export function canBet(score,raw){if(raw===''||raw===null||!/^\d+$/.test(String(raw)))return false;const v=Number(raw);return score<=0?v===0:v>=0&&v<=score}
