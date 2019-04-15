import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { newGamePositionHighlight, insertPositionsFromDirection } from '../res/newGame';
import styles from '../res/styles';
import * as action from '../actions/Actions';
import constants from '../res/constants';

import Grid from '../components/Grid';

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
    this.props.updateKey('newGameCountShips', gameShips);
    this.props.updateKey('newGameArray', []);

    if(gameShips.length == 0){
      alert.alert('Error', 'No ships configuration found!');
    }
    else{
      this.props.updateKey('newGameActiveShip', gameShips[0].shipSize);
      this.props.updateKey('refreshGrid', !this.props.refreshGrid);
    }
  }

  onDone(){
    this.props.createGame(this.props.playerId, this.props.newGameArray);
    this.props.navigation.navigate('Home');
    this.onClear();
  }


  celClick = (index) =>{

    if(this.props.newGameHighlightedPositions != null && 
        this.props.newGameHighlightedPositions.includes(index)){

            let gameUpdated = insertPositionsFromDirection(this.props.newGameSelectedPosition, 
                index, this.props.newGameArray, this.props.newGameActiveShip);

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

            this.props.updateKey('newGameArray', gameUpdated);
            this.props.updateKey('newGameCountShips', tempCount);
            this.props.updateKey('newGameSelectedPosition', null);
            this.props.updateKey('newGameHighlightedPositions', null);
            this.props.updateKey('refreshGrid', !this.props.refreshGrid);
    }
    else{
        this.props.updateKey('newGameSelectedPosition', index);
        let availablePositions = newGamePositionHighlight(index, this.props.newGameArray, this.props.newGameActiveShip);

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

  itemRender = (item, index) => {
    let celStyle = styles.gridItem;


    if(index == this.props.newGameSelectedPosition || 
        (this.props.newGameArray.includes(index))){
        celStyle = [styles.gridItem, {backgroundColor: '#325359'}]
    }
    else if(this.props.newGameHighlightedPositions != null && 
            this.props.newGameHighlightedPositions.indexOf(index) != -1){
        celStyle = [styles.gridItem, {backgroundColor: '#69939b'}]
    }

    return {celStyle: celStyle}

  }

  celDisabled = (item, index) => {
    return this.props.newGameArray.includes(index);
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
        <Grid 
          game={this.props.newGameArray} 
          onCelClick={this.celClick} 
          itemRender={this.itemRender}
          celDisabled={this.celDisabled}
        />

        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

          {constants.SHIP_NUMBER.map((item, index)=>{
            let count = 0;
            if(this.props.newGameCountShips != null){
              count = this.props.newGameCountShips[index].count;
            }

            let labelStyle = (this.props.newGameActiveShip == null || 
              this.props.newGameActiveShip == item.shipSize) &&
              count < item.number ? {flex:1, backgroundColor:"#3872d1"} : {flex:1, backgroundColor:"#d6d6d6"}
            
            return(<View key={""+index} style={labelStyle}>
                    <Text>{'size ' + item.shipSize +': ' +  count + '/' + item.number}</Text>
                  </View>
            )
            })
          }
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
    playerId: state.playerId,
    newGameArray: state.newGameArray,
    refreshGrid: state.refreshGrid,
    gameBaseDefault: state.gameBaseDefault,

    newGameActiveShip: state.newGameActiveShip,
    newGameCountShips: state.newGameCountShips,
    newGameHighlightedPositions: state.newGameHighlightedPositions,
    newGameSelectedPosition: state.newGameSelectedPosition
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateKey: (key, value) => {
      dispatch(action.updateKey(key, value));
    },
    createGame: (playerId, game) => {
      dispatch(action.createGame(playerId, game));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGameScreen);