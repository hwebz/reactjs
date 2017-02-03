import React, {Component, PropTypes } from 'react';
import {render} from 'react-dom';
import ContactApp from './ContactApp';
import 'whatwg-fetch';
import './index.css';
import contacts from './contacts.json';

class ContactsAppContainer extends Component {
  constructor() {
    super();
    this.state = {
      contacts: []
    }
  }

  componentDidMount() {
    // fetch('./contacts.json')
    // .then((response) => response.json())
    // .then((responseData) => {
    //   this.setState({contacts: responseData});
    // })
    // .catch((error) => {
    //   console.log('Error fetching and parsing data', error);
    // });
    this.setState({contacts: contacts});
  }

  render() {
    return (
      <ContactApp contacts={this.state.contacts} />
    );
  }
}

ContactsAppContainer.proTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object)
}

render(
  <ContactsAppContainer />,
  document.getElementById('root')
);
