import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export const ContactForm = ({ onContactAdd }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const resetForm = () => {
    setName('');
    setNumber('');
  };
  const formSubmitHandler = event => {
    event.preventDefault();

    const obj = {
      name: name,
      number: number,
      id: nanoid(4),
    };
    onContactAdd(obj);

    resetForm();
  };

  const inputChangeHandler = event => {
    const name = event.currentTarget.name;
    const text = event.currentTarget.value;

    switch (name) {
      case 'name':
        setName(text);
        break;
      case 'number':
        setNumber(text);
        break;
      default:
        break;
    }
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <label htmlFor="name">
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={inputChangeHandler}
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label htmlFor="number">
        Number
        <input
          type="tel"
          name="number"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          onChange={inputChangeHandler}
          required
        />
      </label>

      <button type="submit">Add contact</button>
    </form>
  );
};
ContactForm.propTypes = {
  onContactAdd: PropTypes.func.isRequired,
};
