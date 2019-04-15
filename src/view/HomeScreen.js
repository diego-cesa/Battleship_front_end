import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import styles from '../res/styles';
import * as action from '../actions/Actions';
import constants from '../res/constants';

import Grid from '../components/Grid';

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
      title: 'Battleship',
      headerLeft: (<Ionicons name="md-menu" style={styles.menuIcon}
                      size={30} onPress={()=>navigation.openDrawer()} />),
  });

  componentWillMount(){
    this.props.getBaseGame();
    this.props.getRandGame();
    
    let playerId = Constants.deviceId;
    this.props.updateKey('playerId', playerId);
    this.props.getPlayer(playerId);
  }

  celClick = (index) =>{
    this.props.gameArray.includes(index) ? this.props.increment("shotsSuccess") : this.props.increment("shotsMissed")
    this.props.gameAction(index);
  }

  itemRender = (item, index) => {

    let show = null;
    let celStyle = null;

    if(item.clicked == true){
        if(this.props.gameArray.includes(index)){
            show = <Text style={styles.gridItemText}>S</Text>
            celStyle = [styles.gridItem, {backgroundColor: '#325359'}];
        }
        else{
            show = <Text style={styles.gridItemText}>W</Text>
            celStyle = [styles.gridItem, {backgroundColor: '#69939b'}];
        }
    }
    else{
        show = <Text style={styles.gridItemText}>{item.key}</Text>
    }

    //test
    if(this.props.gameArray.includes(index)){
      celStyle = [styles.gridItem, {backgroundColor: '#79939b'}];
    }

    return {show: show, celStyle: celStyle};
  }

  onGridUpdate = () => {
      if(this.props.shotsSuccess == constants.SUCESSES_SHOTS_LIMIT){
          Alert.alert("Game Over","You Win!",
              [{text: 'OK', onPress: () => { 
                  this.props.getRandGame();
              }}
          ]);
      }
      if(this.props.shotsMissed == constants.MISSED_SHOTS_LIMIT){
          Alert.alert("Game Over","You Lose!",
              [{text: 'OK', onPress: () => { 
                  this.props.getRandGame();
              }}
          ]);
      }
  }

  celDisabled = (item, index) => {
    return item.clicked;
  }

  render() {
    return (
      <View style={styles.homeContainer}>
        <Grid 
          game={this.props.gameArray} 
          onCelClick={this.celClick} 
          itemRender={this.itemRender}
          onGridUpdate={this.onGridUpdate}
          celDisabled={this.celDisabled}
        />
      </View>
    );
  }
}

function mapStateToProps(state){
  return {
    gameArray: state.gameArray,
    shotsSuccess: state.shotsSuccess,
    shotsMissed: state.shotsMissed
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateKey: (key, value) => {
      dispatch(action.updateKey(key, value));
    },
    getRandGame: () => {
      dispatch(action.getRandGame());
    },
    getPlayer: (playerId) => {
      dispatch(action.getPlayer(playerId));
    },
    getBaseGame: () => {
      dispatch(action.getBaseGame());
    },
    gameAction: (index) => {
        dispatch(action.gameAction(index));
    },
    increment: (stateName) => {
        dispatch(action.increment(stateName));
    },
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);