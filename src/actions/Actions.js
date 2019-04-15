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

export function newGame(game){
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
            dispatch(newGame(response.data.game));
        })
        .catch(function (error){
            console.log(error);
        })
    }
}

export function getBaseGame(){
    console.log("GET_BASE_GAME");

    return function(dispatch) {
        axios.get('http://192.168.0.12:8080/baseGame')
        .then(function (response){
            dispatch(updateKey('gameBaseDefault', response.data.baseGame));
            dispatch(updateKey('newGameBase', response.data.baseGame));
        })
        .catch(function (error){
            console.log(error);
        })
    }
}

export function getPlayer(playerId){
    console.log("GET_PLAYER");

    return function(dispatch) {
        axios.get('http://192.168.0.12:8080/getPlayer/' + playerId)
        .then(function (response) {
            if(response.data.errorCode == 0){
                dispatch(updateKey('playerGames', response.data.games));
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }
}

export function createGame(playerId, gameArray){
    console.log("CREATE_GAME");

    return function(dispatch){
        axios.post('http://192.168.0.12:8080/createGame',
        {
            playerId: playerId,
            gamePosition: gameArray
        })
        .then(function (response){
            if(response.data.errorCode == 0){
                dispatch(newGame(gameArray));
                dispatch(getPlayer(playerId));
            }

        })
        .catch(function (error){
            console.log(error);
        })
    }
}