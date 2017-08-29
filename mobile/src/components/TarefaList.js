import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    TouchableOpacity,
    View,
    Text
} from 'react-native';

export default class TarefaList extends Component {

    onItemPress = (item) => {
        this.props.onItemClick(item);
    }

    renderItem = (record) => {
        const { item, index } = record;
        return (
            <TouchableOpacity
                onPress={() => this.onItemPress(item)}>

                <View 
                    style={{
                        padding: 10
                    }}>
                    <Text>{item.titulo}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <FlatList
                data={this.props.dataSource}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.id} />
        );
    }
}

// const styles = StyleSheet.create({
    
// });
