import React from 'react';
import { View, StyleSheet } from 'react-native';

const Divider = (props) => {
    const style = props.orientation === 'vertical' ? styles.dividerVertical : styles.dividerHorizontal;
    return (
        <View style={props.style}>
            <View style={style} />
        </View>
    )
}

const styles = StyleSheet.create({
    dividerHorizontal: {
        height: 1,
        backgroundColor: '#ddd',
        width: '100%',
    },
    dividerVertical: {
        width: 1,
        backgroundColor: '#ddd',
        height: '100%',
    },
});

export default Divider;
