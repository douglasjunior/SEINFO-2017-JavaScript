import React, { Component } from 'react';
import {
    View, Text, Image,
    StyleSheet, TouchableOpacity,
    Switch,
} from 'react-native';

import Divider from './Divider';

export default class TarefaItem extends Component {

    render() {
        const { tarefa, onEditarPress, onExcluirPress, onConcluidaChange } = this.props;
        return (
            <TouchableOpacity onPress={() => onEditarPress(tarefa.id)} onLongPress={() => onExcluirPress(tarefa.id)}>
                <View style={styles.container}>

                    <View style={styles.body}>
                        <Text style={styles.titulo}>{tarefa.titulo}</Text>
                    </View>

                    <Divider />

                    <View style={styles.footer}>
                        <Text style={styles.label}>Concluída</Text>

                        <Switch value={tarefa.concluida} onValueChange={(value) => onConcluidaChange(tarefa, value)} />
                    </View>

                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginVertical: 8,
        elevation: 2,
        backgroundColor: '#fff'
    },
    body: {
        padding: 16,
    },
    footer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        color: '#aaa',
        flex: 1
    },
    titulo: {
        color: '#111',
    }
})