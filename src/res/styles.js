import { StyleSheet, Dimensions } from 'react-native';
import constants from './constants';

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
      width: Dimensions.get('window').width
    },
    gridItem: {
      backgroundColor: '#40d0ed',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      margin: 1,
      height: Dimensions.get('window').width / constants.NUM_COMLUMNS, // approximate a square
    },
    gridItemText: {
      color: '#fff',
    },

    // Menu Icon
    menuIcon: {
      paddingLeft: 10
    }


  });