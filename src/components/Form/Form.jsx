import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Form.module.css';

export const Form = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  //   resetForm = () => {
  //     this.setState({ name: '', number: ''})
  //   };

  const handleSubmit = e => {
    e.preventDefault();
    const data = { name, number };
    onSubmit(data);
    resetForm();
  };

  //   handleSubmit = e => {
  //     e.preventDefault();
  //     this.props.onSubmit(this.state);
  //     this.resetForm();
  //   };

  const hendleChange = e => {
    const { value, name } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  //   hendleChange = e => {
  //     const {value, name} = e.currentTarget;
  //     this.setState({[name]: value})
  //   };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Name
        <input
          className={css.input}
          type="text"
          name="name"
          value={name}
          onChange={hendleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          required
        />
      </label>
      <label className={css.label}>
        Number
        <input
          className={css.input}
          type="tel"
          name="number"
          value={number}
          onChange={hendleChange}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          required
        />
      </label>
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
