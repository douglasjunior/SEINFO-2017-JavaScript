import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import App from './App';

axios.defaults.baseURL = 'http://localhost:3001/';

ReactDOM.render(<App />, document.getElementById('root'));
