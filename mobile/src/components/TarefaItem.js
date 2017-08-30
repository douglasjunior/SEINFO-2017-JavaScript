import React, { Component } from 'react';
import {
    View, Text, Image,
    StyleSheet, TouchableOpacity,
    Switch,
} from 'react-native';

import moment from 'moment';

import Divider from './Divider';

export default class TarefaItem extends Component {

    render() {
        const { id, titulo, data_criacao, concluida, onEditarPress, onExcluirPress, onConcluidaChange } = this.props;
        return (
            <TouchableOpacity onPress={() => onEditarPress(id)} onLongPress={() => onExcluirPress(id)}>
                <View style={styles.container}>

                    <View style={styles.header}>
                        <Text style={styles.label}># {id}</Text>
                        <Text style={[styles.label, { flex: 1, textAlign: 'right' }]}>{moment(data_criacao).format('DD/MM/YYYY HH:mm')}</Text>
                    </View>

                    <Divider />

                    <View style={styles.body}>
                        <Text style={styles.titulo}>{titulo}</Text>
                    </View>

                    <Divider />

                    <View style={styles.footer}>
                        <Text style={styles.label}>{concluida ? 'Concluída' : 'Pendente'}</Text>

                        <Switch value={concluida} onValueChange={(value) => onConcluidaChange(id, value)} />
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
        backgroundColor: '#fff',
        borderRadius: 2,
    },
    body: {
        padding: 16,
    },
    header: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
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
