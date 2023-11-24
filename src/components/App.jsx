import { Component } from "react";
import { nanoid } from 'nanoid';
import css from './App.module.css';
import {Form} from './Form/Form'
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";

export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  };

  componentDidMount() {
    const contactLS = localStorage.getItem('contacts');
    const parsContacts = JSON.parse(contactLS);
    if (parsContacts) {
      this.setState({contacts: parsContacts});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }


  formSubmit = data => {
    const { contacts } = this.state;

    if (contacts.some(contact => contact.name.toLowerCase() === data.name.toLowerCase())) {
      alert(`${data.name} is already in contacts.`);
      return;
    }
    this.setState({
      contacts: [
        ...contacts, {id: nanoid(), ...data},
      ],
    });
  };

  handleChangeFilter = e => {
    const {name, value} = e.currentTarget;
    this.setState({ [name]: value});
  };

  getFilterContacts = () => {
    const {filter, contacts} = this.state;
    const normFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normFilter));
  }

  deleteContact = deleteId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== deleteId),
    }))
  };


  render() {
    const filterContacts = this.getFilterContacts();
    return (
      <div className={css.container}>
        <h1>Phoneboock</h1>
        <Form onSubmit={this.formSubmit}></Form>
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.handleChangeFilter}/>
        <ContactList filterContacts={filterContacts} onDeleteContact={this.deleteContact}/>
      </div>
    );
  }
}
