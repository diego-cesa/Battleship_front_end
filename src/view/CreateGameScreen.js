import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import NewGameGrid from '../components/NewGameGrid';
import styles from '../res/styles';
import * as action from '../actions/Actions';
import constants from '../res/constants';
import { newGameArray } from '../res/newGame';

class CreateGameScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
      title: 'Create Game',
      headerLeft: (<Ionicons name="md-menu" style={styles.menuIcon}
                      size={30} onPress={()=>navigation.openDrawer()} />),
  });

  componentWillMount(){
    this.onClear();
  }

  newGameShips(){
    let countShips = [];
    for(item of constants.SHIP_NUMBER){
      countShips.push({
        shipSize: item.shipSize,
        count: 0
      })
    }
    return countShips; 
  }

  gameReady(){
    if(this.props.newGameCountShips == null){
      return true;
    }
    else{
      for(i in this.props.newGameCountShips){
        if(this.props.newGameCountShips[i].count != constants.SHIP_NUMBER[i].number){
          return true;
        }
      }

      return false;
    }
  }

  onClear(){
    let gameShips = this.newGameShips();
    this.props.updateKey('newGameBase', newGameArray());
    this.props.updateKey('newGameCountShips', gameShips);

    if(gameShips.length == 0){
      alert.alert('Error', 'No ships configuration found!');
    }
    else{
      this.props.updateKey('newGameActiveShip', gameShips[0].shipSize);

      this.props.updateKey('refreshGrid', !this.props.refreshGrid);
    }
  }

  onDone(){
    this.props.updateKey('currentGame', this.props.newGameBase);
    this.props.updateKey('originalGame', this.props.newGameBase);
    this.props.navigation.navigate('Home');
    this.onClear();
  }

  render() {
    if(this.props.newGameCountShips == null){
      done = true;
    }
    else{
      for(i in this.props.newGameCountShips){
        if(this.props.newGameCountShips[i].count != constants.SHIP_NUMBER[i].number){
          done = true;
          break;
        }
      }
    }
    return (
      <View style={styles.homeContainer}>
        <NewGameGrid />

        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

          {constants.SHIP_NUMBER.map((item, index)=>{

            let count = 0;
            if(this.props.newGameCountShips != null){
              count = this.props.newGameCountShips[index].count;
            }

            return(<Button key={index + ''} 
                      disabled={(this.props.newGameActiveShip == null || 
                                this.props.newGameActiveShip == item.shipSize) &&
                                count < item.number ? false : true}
                      title={'size ' + item.shipSize +': ' +  count + '/' + item.number} 
                      onPress={()=>{this.props.updateKey('newGameActiveShip', item.shipSize)}} style={{flex: 1}}/>)


          })}
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 3}}>
          <Button title={'Clear'}
              onPress={()=>{this.onClear()}} />

            <Button title={'Done'} disabled={this.gameReady()} 
              onPress={()=>{this.onDone()}} />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state){
  return {
    newGameActiveShip: state.newGameActiveShip,
    newGameCountShips: state.newGameCountShips,
    newGameBase: state.newGameBase,
    refreshGrid: state.refreshGrid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateKey: (key, value) => {
      dispatch(action.updateKey(key, value));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGameScreen);