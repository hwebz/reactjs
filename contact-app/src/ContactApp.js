import React, { Component, PropTypes } from 'react';
import './ContactApp.css';

//
class ContactApp extends Component {

  constructor() {
    super();
    this.state = {
      filterText: 'Ryan'
    }
  }

  handleUserInput(searchTerm) {
    this.setState({filterText: searchTerm});
  }

  render() {
    return (
      <div>
        <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)} />
        <ContactList contacts={this.props.contacts} filterText={this.state.filterText} />
      </div>
    );
  }
}

ContactApp.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object)
}

class SearchBar extends Component {

  handleChange(event) {
    this.props.onUserInput(event.target.value);
  }

  render() {
    return <input type="search" placeholder="search" value={this.props.filterText} onChange={this.handleChange.bind(this)} />
  }
}

// Don't forget to add new propType requirements
SearchBar.propTypes = {
  onUserInput: PropTypes.func.isRequired,
  filterText: PropTypes.string.isRequired
}

class ContactList extends Component {
  render() {
    let filteredContacts = this.props.contacts.filter((contact) => contact.name.indexOf(this.props.filterText) !== -1);
    return (
      <ul>
        {/**this.props.contacts.map((contact) => <ContactItem key={contact.email} name={contact.name} email={contact.email} />)*/}
        {filteredContacts.map((contact) => <ContactItem key={contact.email} name={contact.name} email={contact.email} />)}
      </ul>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object)
}

class ContactItem extends Component {
  render() {
    return <li>{this.props.name} - {this.props.email}</li>
  }
}

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}

export default ContactApp;
