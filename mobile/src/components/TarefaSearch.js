import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button
} from 'react-native';

import Styles from '../values/Styles';

export default class TarefaSearch extends Component {

    state = {
        value: ''
    };

    onChangeText = (value) => {
        this.searchValue = value;
        this.setState({
            value: value
        });
    }

    onSearchSubmit = () => {
        this.props.onSearchClick(this.searchValue);
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={[Styles.textInput, { flex: 1, marginRight: 8 }]}
                    underlineColorAndroid='transparent'
                    value={this.state.value}
                    onChangeText={this.onChangeText}
                    onSubmitEditing={this.onSearchSubmit}
                    returnKeyType='search' />

                <Button
                    title='Buscar'
                    onPress={this.onSearchSubmit} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#F5FCFF',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
});
