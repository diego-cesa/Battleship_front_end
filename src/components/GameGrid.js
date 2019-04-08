import React, { Component } from 'react';
import { Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';

import * as action from '../actions/Actions';
import styles from '../res/styles';
import constants from '../res/constants';
import newGame from '../res/newGame';

class GameGrid extends Component {

    constructor(props){
        super(props);
        this.state = {
            refresh: false
        }
    }

    renderItem = ({ item, index }) => {
        let show = null;
        let celStyle = styles.gridItem;
        if(item.clicked == true){
            show = <Text style={styles.gridItemText}>{item.ship ? 'S' : 'W'}</Text>

            if(item.ship == true){
                celStyle = [styles.gridItem, {backgroundColor: '#325359'}];
            }
            else{
                celStyle = [styles.gridItem, {backgroundColor: '#69939b'}];
            }
        }
        else{
            show = <Text style={styles.gridItemText}>{item.key}</Text>
        }

        return (
          <TouchableOpacity disabled={item.clicked} 
            onPress={()=>{
                item.ship ? this.props.increment("shotsSuccess") : this.props.increment("shotsMissed")
                this.props.gameAction(index);
            }}
            style={celStyle}
          >
            {show}
          </TouchableOpacity>
        );
    };

    componentDidUpdate(){
        if(this.props.shotsSuccess == constants.SUCESSES_SHOTS_LIMIT){
            Alert.alert("Game Over","You Win!",
                [{text: 'OK', onPress: () => { 

                    this.props.createNewGame(newGame());
                    this.setState({refresh: !this.state.refresh});
                }}
            ]);
        }
        if(this.props.shotsMissed == constants.MISSED_SHOTS_LIMIT){
            Alert.alert("Game Over","You Lose!",
                [{text: 'OK', onPress: () => { 
                    this.props.createNewGame(newGame());
                    this.setState({refresh: !this.state.refresh});
                }}
            ]);
        }
    }

    
    render() {
        return (
            <FlatList 
              data={this.props.currentGame}
              style={styles.gridContainer}
              renderItem={this.renderItem}
              numColumns={constants.NUM_COMLUMNS}
              extraData={this.state.refresh}
            />
        );
    }
}

function mapStateToProps(state){
    return {
        currentGame: state.currentGame,
        shotsSuccess: state.shotsSuccess,
        shotsMissed: state.shotsMissed
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
        },
        createNewGame: (game) => {
            dispatch(action.createNewGame(game));
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(GameGrid);