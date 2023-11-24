import { Component } from "react";
import PropTypes from 'prop-types';
import css from './Form.module.css';

export class Form extends Component {
  state = {
    name: '',
    number: '',
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ name: '', number: ''})
  };

  hendleChange = e => {
    const {value, name} = e.currentTarget;
    this.setState({[name]: value})
  };

  render() {
    return (
      <form  className={css.form} onSubmit={this.handleSubmit}>
        <label className={css.label}>
          Name
          <input
          className={css.input}
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.hendleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          required  />
          </label>
          <label className={css.label}>
            Number
            <input
            className={css.input}
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.hendleChange}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            required
             />
          </label>
          <button className={css.button} type="submit">
            Add contact
          </button>
      </form>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
