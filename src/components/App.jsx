import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';
import { Form } from './Form/Form';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

const defContacs = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState('contacts', defContacs);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactLS = localStorage.getItem('contacts');
    const parsContacts = JSON.parse(contactLS);
    if (parsContacts) {
      setContacts(parsContacts);
    }
  }, []);

  // componentDidMount() {
  //   const contactLS = localStorage.getItem('contacts');
  //   const parsContacts = JSON.parse(contactLS);
  //   if (parsContacts) {
  //     this.setState({ contacts: parsContacts });
  //   }
  // }

  useEffect(() => {
    contacts && localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // componentDidUpdate(_, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  const handleChangeFilter = e => {
    setFilter(e.currentTarget.toLocaleLowerCase().trim());
  };

  // handleChangeFilter = e => {
  //   const { name, value } = e.currentTarget;
  //   this.setState({ [name]: value });
  // };
  const getFilterContacts = () => {
    const normFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normFilter)
    );
  };

  // getFilterContacts = () => {
  //   const { filter, contacts } = this.state;
  //   const normFilter = filter.toLowerCase();
  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(normFilter)
  //   );
  // };

  const deleteContact = deleteId => {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.id !== deleteId);
    });
    // setFilter('');
  };

  // deleteContact = deleteId => {
  //   this.setState(prevState => ({
  //     contacts: prevState.contacts.filter(contact => contact.id !== deleteId),
  //   }));
  // };

  const formSubmit = data => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      alert(`${data.name} is already in contacts.`);
      return;
    }
    setContacts(...contacts, { id: nanoid(), ...data });
  };

  // formSubmit = data => {
  //   const { contacts } = this.state;

  //   if (
  //     contacts.some(
  //       contact => contact.name.toLowerCase() === data.name.toLowerCase()
  //     )
  //   ) {
  //     alert(`${data.name} is already in contacts.`);
  //     return;
  //   }
  //   this.setState({
  //     contacts: [...contacts, { id: nanoid(), ...data }],
  //   });
  // };

  const filterContacts = getFilterContacts();

  return (
    <div className={css.container}>
      <h1>Phoneboock</h1>
      <Form onSubmit={formSubmit}></Form>
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleChangeFilter} />
      <ContactList
        filterContacts={filterContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};
