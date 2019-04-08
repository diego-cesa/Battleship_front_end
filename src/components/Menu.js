import React from 'react';
import { SafeAreaView, DrawerItems } from 'react-navigation';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import newGame from '../res/newGame';

import * as action from '../actions/Actions';
  
const Menu = (props) => (
    <View style={{flex: 1}}>
        <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>

            <Button title='Reset' 
                onPress={()=>{
                    props.resetGame();
                    props.navigation.closeDrawer();
                }} />
            <Button title='New Game' 
                onPress={()=>{
                    props.createNewGame(newGame());
                    props.navigation.closeDrawer();
                }} />
            <DrawerItems {...props} />
        </SafeAreaView>
    </View>
);


function mapStateToProps(state){
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetGame: ()=> {
            dispatch(action.resetGame());
        },
        createNewGame: (game) => {
            dispatch(action.createNewGame(game));
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);