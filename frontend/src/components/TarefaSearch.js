import React, { Component } from 'react';

import {
    FormGroup, InputGroup,
    FormControl, Button,
} from 'react-bootstrap';

class TarefaSearch extends Component {

    onChangeText = (event) => {
        this.searchValue = event.target.value;
    }

    onSearchSubmit = (event) => {
        event.preventDefault();
        this.props.onSearchClick(this.searchValue);
    }

    render() {
        return (
            <form onSubmit={this.onSearchSubmit}>
                <FormGroup>
                    <InputGroup>
                        <FormControl type="text" onChange={this.onChangeText} />
                        <InputGroup.Button>
                            <Button type="submit">Buscar</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </form>
        )
    }
}

export default TarefaSearch;