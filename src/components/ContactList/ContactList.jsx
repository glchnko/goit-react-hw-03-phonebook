import React from "react";
import PropTypes from 'prop-types';
import s from './contactList.module.css'

const ContactList = ({contacts, onRemoveItem}) => {
    return (
        <ul className={s.list}>
            {contacts.map((contact)=> {
                return (
                    <li className={s.item} key={contact.id}>
                    {contact.name + ":" + contact.number}
                    {
                      <button
                        className={s.button}
                        type="button"
                        name="delte"
                        onClick={() => onRemoveItem(contact.id)}
                      >
                        delete
                      </button>
                    }
                  </li>
                    
                )
            })}
        </ul>
    )
}
    
ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
    onClick: PropTypes.func.isRequired,
  }
  
  export default ContactList;