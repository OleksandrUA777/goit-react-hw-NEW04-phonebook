import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

const CONTACTS__KEY = 'contacts-key';
export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const parsedData = JSON.parse(localStorage.getItem(CONTACTS__KEY));
    if (parsedData) {
      return parsedData;
    }
    return [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(CONTACTS__KEY, JSON.stringify(contacts));
  }, [contacts]);

  const contactAddHandler = obj => {
    const namesList = contacts.map(({ name }) => name.toLowerCase());
    const normalizedName = obj.name.toLowerCase();

    if (namesList.includes(normalizedName)) {
      return alert(`${obj.name} is already in your contacts`);
    }
    setContacts(prevContacts => [obj, ...prevContacts]);
  };
  const filterChangeHandler = event => {
    const value = event.currentTarget.value;

    setFilter(value);
  };
  const filterRenderHandler = () => {
    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter.trim())
    );

    return filteredContacts;
  };
  const contactDeleteHandler = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };
  const stats = filterRenderHandler();

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onContactAdd={contactAddHandler} />

      <h2>Contacts</h2>
      <Filter onFilterSearch={filterChangeHandler} value={filter} />
      <ContactList onDelete={contactDeleteHandler} contacts={stats} />
    </div>
  );
};

// <div>
//   <h1>Phonebook</h1>
//   <ContactForm ... />

//   <h2>Contacts</h2>
//   <Filter ... />
//   <ContactList ... />
// </div>
