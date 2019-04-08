import React, { Component } from 'react';
import { Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { newGamePositionHighlight, insertPositionsFromDirection } from '../res/newGame';
import * as action from '../actions/Actions';
import styles from '../res/styles';
import constants from '../res/constants';

  
class NewGameGrid extends Component {

    positionClick(index){
        if(this.props.newGameActiveShip == null){
            Alert.alert('Chose a ship size first');
            return;
        }

        if(this.props.newGameHighlightedPositions != null && 
            this.props.newGameHighlightedPositions.indexOf(index) != -1){
                let gameUpdated = insertPositionsFromDirection(this.props.newGameSelectedPosition, 
                    index, this.props.newGameBase, this.props.newGameActiveShip);

                let tempCount = this.props.newGameCountShips;
                for(let i = 0; i < tempCount.length; i++){
                    if(tempCount[i].shipSize == this.props.newGameActiveShip){
                        tempCount[i].count++;

                        if(tempCount[i].count == constants.SHIP_NUMBER[i].number){
                            if(i+1 < tempCount.length){
                                this.props.updateKey('newGameActiveShip', tempCount[i+1].shipSize);
                            }
                            else{
                                this.props.updateKey('newGameActiveShip', null);
                            }
                        }
                        break;
                    }
                }

                this.props.updateKey('newGameBase', gameUpdated);
                this.props.updateKey('newGameCountShips', tempCount);
                this.props.updateKey('newGameSelectedPosition', null);
                this.props.updateKey('newGameHighlightedPositions', null);
                this.props.updateKey('refreshGrid', !this.props.refreshGrid);
        }
        else{
            this.props.updateKey('newGameSelectedPosition', index);

            let availablePositions = newGamePositionHighlight(index, this.props.newGameBase, this.props.newGameActiveShip);
            if(availablePositions.length > 0){
                this.props.updateKey('newGameHighlightedPositions', availablePositions);
            }
            else{
                this.props.updateKey('newGameSelectedPosition', null);
                this.props.updateKey('newGameHighlightedPositions', null);
            }
            this.props.updateKey('refreshGrid', !this.props.refreshGrid);
        }
    }

    renderItem = ({ item, index }) => {

        let celStyle = styles.gridItem;
        if(index == this.props.newGameSelectedPosition || item.ship){
            celStyle = [styles.gridItem, {backgroundColor: '#325359'}]
        }
        else if(this.props.newGameHighlightedPositions != null && 
                this.props.newGameHighlightedPositions.indexOf(index) != -1){
            celStyle = [styles.gridItem, {backgroundColor: '#69939b'}]
        }

        return (
          
          <TouchableOpacity disabled={item.ship} 
            onPress={()=>{
               this.positionClick(index); 
            }}
            style={celStyle}
          >
            <Text style={styles.gridItemText}>{item.key}</Text>
          </TouchableOpacity>
        );
    };

    render() {
        return (
            <FlatList 
              data={this.props.newGameBase}
              style={styles.gridContainer}
              renderItem={this.renderItem}
              numColumns={constants.NUM_COMLUMNS}
              extraData={this.props.refreshGrid}
            />
        );
    }
}

function mapStateToProps(state){
    return {
        refreshGrid: state.refreshGrid,
        newGameBase: state.newGameBase,
        newGameActiveShip: state.newGameActiveShip,
        newGameSelectedPosition: state.newGameSelectedPosition,
        newGameHighlightedPositions: state.newGameHighlightedPositions,
        newGameCountShips: state.newGameCountShips,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateKey: (key, value) => {
            dispatch(action.updateKey(key, value));
        },
        gameAction: (index) => {
            dispatch(action.gameAction(index));
        },
        increment: (stateName) => {
            dispatch(action.increment(stateName));
        },
        resetGame: ()=> {
            dispatch(action.resetGame());
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(NewGameGrid);