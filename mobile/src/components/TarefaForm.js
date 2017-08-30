import React, { Component } from 'react';
import {
    View, TextInput,
    Modal, Text,
    TouchableOpacity, StyleSheet,
} from 'react-native';

import Styles from '../values/Styles';
import Divider from './Divider';

class TarefaForm extends Component {

    state = {}

    componentWillReceiveProps(nextProps) {
        if (this.props.tarefa !== nextProps.tarefa) {
            const state = {};
            if (nextProps.tarefa) {
                state.id = nextProps.tarefa.id;
                state.titulo = nextProps.tarefa.titulo;
                state.descricao = nextProps.tarefa.descricao;
            }
            this.setState(state);
        }
    }

    onTituloChange = (text) => {
        this.setState({ titulo: text })
    }

    onDescricaoChange = (text) => {
        this.setState({ descricao: text })
    }

    render() {
        const { visible, onRequestClose, onSave, } = this.props;

        const { titulo, id, descricao } = this.state;

        return (
            <Modal
                visible={visible}
                onRequestClose={onRequestClose}
                transparent={false}
            >
                <View style={styles.modal}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onRequestClose}>
                            <Text style={styles.textButton}>Cancelar</Text>
                        </TouchableOpacity>

                        <View style={{ flex: 1 }}></View>

                        <TouchableOpacity onPress={() => onSave(this.state)}>
                            <Text style={styles.textButton}>Salvar</Text>
                        </TouchableOpacity>
                    </View>

                    <Divider />

                    <View style={styles.container}>

                        {id ? <TextInput
                            style={[Styles.textInput, { marginBottom: 8 }]}
                            underlineColorAndroid='transparent'
                            value={`${id}`}
                            editable={false} /> : null}

                        <TextInput
                            placeholder="Título"
                            style={[Styles.textInput, { marginBottom: 8 }]}
                            underlineColorAndroid='transparent'
                            value={titulo}
                            onChangeText={this.onTituloChange} />

                        <TextInput
                            placeholder="Descrição"
                            style={[Styles.textInput, { marginBottom: 8 }]}
                            underlineColorAndroid='transparent'
                            value={descricao}
                            onChangeText={this.onDescricaoChange} />

                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: 6,
    },
    textButton: {
        padding: 10,
        fontSize: 16,
        fontWeight: '900',
        color: '#4286f4',
    },
    container: {
        paddingHorizontal: 16,
        paddingTop: 8,
    },
})

export default TarefaForm;