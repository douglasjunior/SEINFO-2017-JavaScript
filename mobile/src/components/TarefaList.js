import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    TouchableOpacity,
    View,
    Text,
    RefreshControl,
} from 'react-native';

import TarefaItem from './TarefaItem';

export default class TarefaList extends Component {

    renderItem = (record) => {
        const { item, index } = record;
        const { onEditarPress, onExcluirPress, onConcluidaChange } = this.props;
        return (
            <TarefaItem tarefa={item} onEditarPress={onEditarPress}
                onExcluirPress={onExcluirPress} onConcluidaChange={onConcluidaChange} />
        );
    }

    render() {
        const { refreshing, onRefresh } = this.props;
        return (
            <FlatList
                style={styles.list}
                data={this.props.dataSource}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}
            />
        );
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
})