import React, { Component } from 'react';
import { Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import * as action from '../actions/Actions';
import styles from '../res/styles';
import constants from '../res/constants';

class Grid extends Component {
    
    componentDidUpdate(){
        if(this.props.onGridUpdate != null){
            this.props.onGridUpdate();
        }
    }

    renderItem = ({ item, index }) => {
        let show = <Text style={styles.gridItemText}>{item.key}</Text>;
        let celStyle =  styles.gridItem;
        let celRender = null;

        if(this.props.itemRender != null){
            celRender = this.props.itemRender(item, index); 
            show = celRender.show != null ? celRender.show : show;
            celStyle = celRender.celStyle != null ? celRender.celStyle : celStyle;
        }

        return (
          <TouchableOpacity 
            disabled={this.props.celDisabled(item, index)}
            onPress={()=>this.props.onCelClick(index)}
            style={celStyle}
          >
            {show}
          </TouchableOpacity>

        );
    };
    
    render() {
        return (
            <FlatList 
              data={this.props.newGameBase}
              style={styles.gridContainer}
              renderItem={this.renderItem}
              numColumns={constants.NUM_COMLUMNS}
              extraData={this.props.refreshGrid}
            />
        );
    }
}

function mapStateToProps(state){
    return {
        refreshGrid: state.refreshGrid,
        newGameBase: state.newGameBase,   
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);