import PropTypes from 'prop-types';
import css from './ContactListItem.module.css'
export const ContactListItem = ({contact, onDeleteContact}) => {
  return (
    <li
    className={css.item}
      key={contact.id}>
      {contact.name}: {contact.number}
      <button className={css.button} type="button" onClick={() => onDeleteContact(contact.id)}>
        Delete
      </button>
    </li>
  )
}

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
