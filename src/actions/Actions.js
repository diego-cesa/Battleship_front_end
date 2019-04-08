const axios = require('axios');

export const UPDATE_KEY = "UPDATE_KEY";
export const GAME_ACTION = "GAME_ACTION";
export const INCREMENT = "INCREMENT";
export const RESET_GAME = "RESET_GAME";
export const NEW_GAME = "NEW_GAME";

export function updateKey(key, value){
   return(dispatch)=>{
       dispatch({
           type: UPDATE_KEY,
           payload:{[key]: value}
       });
   }
}

export function gameAction(index){
    return(dispatch)=>{
        dispatch({
            type: GAME_ACTION,
            index: index
        });
    };
}

export function increment(stateName){
    return(dispatch)=>{
        dispatch({
            type: INCREMENT,
            stateName: stateName
        });
    };
}

export function resetGame(){
    return(dispatch)=>{
        dispatch({
            type: RESET_GAME
        });
    };
}

export function createNewGame(game){
    return(dispatch)=>{
        dispatch({
            type: NEW_GAME,
            newGame: game
        });
    };

}


// API REQUESTS
export function getRandGame(){
    console.log("GET_RAND_GAME");

    return function(dispatch) {
        axios.get('http://192.168.0.12:8080/randGame')
        .then(function (response){
            console.log(response.data);
            dispatch(createNewGame(response.data.game));
        })
        .catch(function (error){
            console.log(error);
        })
    }

    
}