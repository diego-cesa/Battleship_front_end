import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import GameGrid from '../components/GameGrid';
import styles from '../res/styles';
import * as action from '../actions/Actions';
import newGame from '../res/newGame';

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
      title: 'Battleship',
      headerLeft: (<Ionicons name="md-menu" style={styles.menuIcon}
                      size={30} onPress={()=>navigation.openDrawer()} />),
  });

  componentWillMount(){
    this.props.createNewGame(newGame());

    // this.props.getRandGame();
  }

  render() {
    return (
      <View style={styles.homeContainer}>
        <GameGrid />
      </View>
    );
  }
}

function mapStateToProps(state){
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateKey: (key, value) => {
      dispatch(action.updateKey(key, value));
    },
    createNewGame: (game) => {
      dispatch(action.createNewGame(game));
    },
    getRandGame: () => {
      dispatch(action.getRandGame());
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);