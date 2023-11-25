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
  const initialContacts = JSON.parse(localStorage.getItem('contacts'));
  const [contacts, setContacts] = useState(
    () => [...initialContacts] ?? defContacs
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    contacts && localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChangeFilter = e => {
    setFilter(e.currentTarget.value.toLocaleLowerCase().trim());
  };

  const getFilterContacts = () => {
    const normFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normFilter)
    );
  };

  const deleteContact = deleteId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== deleteId)
    );
  };

  const formSubmit = data => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      alert(`${data.name} is already in contacts.`);
      return;
    }
    setContacts(prev => [...contacts, { id: nanoid(), ...data }]);
  };

  return (
    <div className={css.container}>
      <h1>Phoneboock</h1>
      <Form onSubmit={formSubmit}></Form>
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleChangeFilter} />
      <ContactList
        filterContacts={getFilterContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};