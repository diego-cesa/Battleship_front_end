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
    return insertShip(gameArray, tempIndex);
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
                if(gameArray[position - (10*i)].ship == false){
                    tempIndex.push(position - (10*i));
                }
                else{
                    return null;
                }
            }
            return tempIndex;
        case "down": 
            for(let i = 1; i < shipSize; i++){
                if(gameArray[position + (10*i)].ship == false){
                    tempIndex.push(position + (10*i));
                }
                else{
                    return null;
                }
            }
            return tempIndex;
        case "left": 
            for(let i = position-1; position-i < shipSize; i--){
                if(gameArray[i].ship == false){
                    tempIndex.push(i);
                }
                else{
                    return null;
                }
            }
            return tempIndex;
        case "right": 
            for(let i = position+1; i-position < shipSize; i++){
                if(gameArray[i].ship == false){
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

function insertShip(newGame, positions){
    for(let i = 0; i < positions.length; i++){
        newGame[positions[i]].ship = true;
    }

    return newGame;
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

function newGame(){
    let newGame = newGameArray();

    const shipCount = constants.SHIP_NUMBER;

    shipCount.forEach(function(shipInfo){
        let countShip = 0; 
        while(countShip < shipInfo.number){
            // get random index
            let rand = Math.floor(Math.random() * 100);

            // check if position is available
            if(newGame[rand].ship == false){

                // get possible directions
                let directions = possibleDirections(rand, shipInfo.shipSize);

                //new direction 
                let newDir = true;
                do{
                    if(directions.length > 0){
                        // get random direction
                        let indexSelected = Math.floor(Math.random() * directions.length);
                        // check for obstructions
                        let insertArray = obstructionCheck(directions[indexSelected], rand, newGame, shipInfo.shipSize);

                        // insert ship
                        if(insertArray != null){
                            newGame = insertShip(newGame, insertArray);
                            countShip++;
                            newDir = false;
                        }
                        else{
                            directions.splice(indexSelected, 1);
                        }
                    }
                    else{
                        newDir = false;
                    }
                }while(newDir == true);
            }
        }
    });
    return newGame;
}

export default newGame;