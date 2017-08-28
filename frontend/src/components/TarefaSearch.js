import React, { Component } from 'react';

import {
    FormGroup, InputGroup,
    FormControl, Button,
} from 'react-bootstrap';

class TarefaSearch extends Component {

    onChangeText = (event) => {
        this.searchValue = event.target.value;
    }

    onSearchClick = () => {
        this.props.onSearchClick(this.searchValue);
    }

    render() {
        return (
            <FormGroup>
                <InputGroup>
                    <FormControl type="text" onChange={this.onChangeText} />
                    <InputGroup.Button>
                        <Button onClick={this.onSearchClick}>Buscar</Button>
                    </InputGroup.Button>
                </InputGroup>
            </FormGroup>
        )
    }
}

export default TarefaSearch;