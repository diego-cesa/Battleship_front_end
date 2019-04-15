import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import styles from '../res/styles';
import * as action from '../actions/Actions';

import Grid from '../components/Grid';

class MyGameScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
      title: navigation.state.params.gameName,
  });


  onPlay(){
    this.props.newGame(this.props.navigation.state.params.game.positions);
    this.props.navigation.navigate('Home');
  }

  itemRender = (item, index) => {
    let celStyle = null;

    if(this.props.navigation.state.params.game.positions.includes(index)){
      celStyle = [styles.gridItem, {backgroundColor: '#79939b'}];
    }
    else{
      celStyle = styles.gridItem;
    }

    return {celStyle: celStyle}
  }

  celDisabled = (item, index) => {
    return true;
  }

  render(){
    return(
      <View style={styles.homeContainer}>
         <Grid 
          game={this.props.navigation.state.params.game.positions} 
          itemRender={this.itemRender}
          celDisabled={this.celDisabled}
        />
         <Button title={'Play'}
              onPress={()=>{this.onPlay()}} />
      </View>
    );
  }
} 

function mapStateToProps(state){
    return {
      playerGames: state.playerGames
    }
  }
  
const mapDispatchToProps = (dispatch) => {
  return {
    updateKey: (key, value) => {
      dispatch(action.updateKey(key, value));
    },
    newGame: (game) => {
      dispatch(action.newGame(game));
    }
  }

}
  
export default connect(mapStateToProps, mapDispatchToProps)(MyGameScreen);