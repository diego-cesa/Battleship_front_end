import update from 'immutability-helper'
import { UPDATE_KEY, GAME_ACTION, INCREMENT, RESET_GAME, NEW_GAME } from '../actions/Actions';

export const initialState = {
   playerId: null,
   playerGames: [],

   gameArray: [],
   originalGame: [],
   shotsMissed: 0,
   shotsSuccess: 0,

   refreshGrid: false,
   gameBaseDefault: null,
   newGameBase: null,

   newGameArray: [],
   newGameActiveShip: null,
   newGameSelectedPosition: null,
   newGameHighlightedPositions: [],
   newGameCountShips: null
};

const rootReducer = (state = initialState, action) => {
   let newState = Object.assign({}, state);
   let changedState = {};
   switch(action.type){
       case UPDATE_KEY:
           for(let key in action.payload){
               changedState = {[key]: action.payload[key]};
           }
           newState = Object.assign({}, state, changedState);
           break;
        case GAME_ACTION:
           return update(state, {
                newGameBase:{
                   [action.index]: {
                       clicked: {$set: true}
                   }
               }
           });
        case INCREMENT:
            changedState = {[action.stateName]: state[action.stateName]+1};
            newState = Object.assign({}, state, changedState);
            break;
        case RESET_GAME:
            changedState = {
                gameArray: state.originalGame,
                newGameBase: state.gameBaseDefault,
                shotsMissed: 0,
                shotsSuccess: 0
            }
            newState = Object.assign({}, state, changedState);
            break;
        case NEW_GAME: 
            changedState = {
                gameArray: action.newGame,
                originalGame: action.newGame,
                newGameBase: state.gameBaseDefault,
                shotsMissed: 0,
                shotsSuccess: 0,
                refreshGrid: !state.refreshGrid
            }
            newState = Object.assign({}, state, changedState);
            break;

       default: return initialState;
   }
   return newState;
}
export default rootReducer;