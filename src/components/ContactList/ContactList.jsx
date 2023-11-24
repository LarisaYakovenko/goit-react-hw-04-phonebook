// import PropTypes from 'prop-types';
import { ContactListItem } from '../ContactListItem/ContactListItem';
import css from './ContactList.module.css';
export const ContactList = ({ filterContacts, onDeleteContact }) => {
  return (
    <ul className={css.list}>
      {filterContacts.map(contact => (
        <ContactListItem
          key={contact.id}
          contact={contact}
          onDeleteContact={onDeleteContact}
        />
      ))}
    </ul>
  );
};

// ContactList.propTypes = {
//   filterContacts: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
//   onDeleteContact: PropTypes.func.isRequired,
// };
