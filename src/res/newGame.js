import constants from './constants'

export function newGameArray(){
    let newGame = [];    

    for(var i=0; i <= constants.LIMIT_GAME_INDEX; i++){
        newGame.push({
            key: i+'', 
            clicked: false, 
            ship: false
        });
    }

    return newGame;
}

export function insertPositionsFromDirection(position, directionSelected, gameArray, shipSize){
    let tempIndex = [];
    tempIndex.push(position);

    if(position > directionSelected){
        if(directionSelected > position-10){
            for(let i = position-1; position-i < shipSize; i--){
                tempIndex.push(i);
            }
        }
        else{
            for(let i = 1; i < shipSize; i++){
                tempIndex.push(position - (i*10));
            }
        }
    }
    else{
        if(directionSelected < position+10){
            for(let i = position+1; i-position < shipSize; i++){
                tempIndex.push(i);
            }
        }
        else{
            for(let i = 1; i < shipSize; i++){
                tempIndex.push(position + (i*10));
            }
        }
    }

    return gameArray.concat(tempIndex);
}

export function newGamePositionHighlight(position, gameArray, shipSize){
    let directions = possibleDirections(position, shipSize);

    let availablePositions = [];
    for(direction of directions){

        let available = obstructionCheck(direction, position, gameArray, shipSize);
        if(available != null){
            available.shift();
            availablePositions = availablePositions.concat(available);
        }
    }

    return availablePositions;
}

function obstructionCheck(dirSelected, position, gameArray, shipSize){
    let tempIndex = [];
    tempIndex.push(position);

    switch(dirSelected){
        case "up":
            for(let i = 1; i < shipSize; i++){
                if(!gameArray.includes(position - (10*i))){
                    tempIndex.push(position - (10*i));
                }
                else{
                    return null;
                }
            }
            return tempIndex;
        case "down": 
            for(let i = 1; i < shipSize; i++){
                if(!gameArray.includes(position + (10*i))){
                    tempIndex.push(position + (10*i));
                }
                else{
                    return null;
                }
            }
            return tempIndex;
        case "left": 
            for(let i = position-1; position-i < shipSize; i--){
                if(!gameArray.includes(i)){
                    tempIndex.push(i);
                }
                else{
                    return null;
                }
            }
            return tempIndex;
        case "right": 
            for(let i = position+1; i-position < shipSize; i++){
                if(!gameArray.includes(i)){
                    tempIndex.push(i);
                }
                else{
                    return null;
                }
            }
            return tempIndex;
        default: return null;    
    }
}

function possibleDirections(index, shipSize){
    let directions = [];
    if(index / 10 > shipSize -1){
        directions.push("up");
    }
    if(Math.ceil(100 - index) / 10 > shipSize -1){
        directions.push("down");
    }
    if(index % 10 >= shipSize -1){
        directions.push("left");
    }
    if(10 - (index % 10) >= shipSize){
        directions.push("right");
    }

    return directions;
}