import React, { Component } from 'react';
import { View, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import styles from '../res/styles';
import * as action from '../actions/Actions';

class MyGamesScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
      title: 'My Games',
      headerLeft: (<Ionicons name="md-menu" style={styles.menuIcon}
                      size={30} onPress={()=>navigation.openDrawer()} />),
  });

  render(){
    console.log(this.props.playerGames);
    let body = null;

    if(this.props.playerGames.length == 0){
      body = <Button title='Create Game' 
              onPress={()=>{this.props.navigation.navigate('CreateNewGame')}} />
    }
    else{
     body = <FlatList
                data={this.props.playerGames}
                renderItem={({ item, index }) => {
                return (
                    <TouchableOpacity 
                      onPress={() => this.props.navigation.navigate('MyGame', {
                        gameName: "Game " + (index+1),
                        game: item
                      })}>
                      <View  style={styles.gameListItem}>
                        <Text>{"Game " + (index+1)}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item, index) => index + ""}
            />;
    }


    return(
      <View style={styles.homeContainer}>
         {body}
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
  }

}
  
export default connect(mapStateToProps, mapDispatchToProps)(MyGamesScreen);