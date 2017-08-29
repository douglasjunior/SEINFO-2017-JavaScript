import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button
} from 'react-native';

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
                    style={styles.textInput}
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
    },

    textInput: {
        flex: 1,
        padding: 6,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 2,
        marginRight: 5,
        backgroundColor: '#fff'
    }
});
