import { StyleSheet, Dimensions } from 'react-native';
import constants from './constants';

let SCREEN_WIDTH = Dimensions.get('window').width; 

export default StyleSheet.create({
    homeContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    // Grid
    gridContainer: {
      flex: 1,
      marginVertical: 20,
      width: SCREEN_WIDTH
    },
    gridItem: {
      backgroundColor: '#40d0ed',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      margin: 1,
      height: SCREEN_WIDTH / constants.NUM_COMLUMNS, // approximate a square
    },
    gridItemText: {
      color: '#fff',
    },

    // Menu Icon
    menuIcon: {
      paddingLeft: 10
    },

    // Game List
    gameListItem: {
      backgroundColor: '#40d0ed',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      margin: 1,
      height: 50,
      width: SCREEN_WIDTH
    },

  });