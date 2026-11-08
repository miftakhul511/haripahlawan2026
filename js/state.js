import {CONFIG} from './config.js';
export const initialState=()=>({version:1,phase:'home',round:0,index:0,teams:CONFIG.initialTeams.map((name,i)=>({name,score:0})),answers:[null,null,null],eligible:null,attempted:[],bets:[null,null,null],betsLocked:false,processed:false,feedback:null,corrections:[],pendingCorrection:null});
export function loadState(){try{const raw=localStorage.getItem(CONFIG.storageKey);if(!raw)return initialState();const s=JSON.parse(raw);if(!s||!Array.isArray(s.teams)||s.teams.length!==3) return initialState();return {...initialState(),...s};}catch{return initialState()}}
export function saveState(s){try{localStorage.setItem(CONFIG.storageKey,JSON.stringify(s));}catch(e){console.warn('Penyimpanan lokal tidak tersedia',e)}}
export function clearState(){localStorage.removeItem(CONFIG.storageKey)}
export function activeQuestion(round,index,all){return all[round][index]||null}
