import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ContactForm from '../components/ContactForm';
import Filter from '../components/Filter';
import ContactList from '../components/ContactList';
import { contactsOperations } from '../redux/phonebook';
import { contactsSelectors } from '../redux/phonebook';
import MyModal from '../components/Modal';

export default function PhonebookView() {
  const [contactForEdit, setContactForEdit] = useState(null);
  const dispatch = useDispatch();

  const modalBoolean = useSelector(contactsSelectors.getModalBoolean);
  const items = useSelector(contactsSelectors.contactsArray);

  useEffect(() => {
    console.log('render-1 UserView');
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);

  const getContact = contactForEdit => {
    setContactForEdit(contactForEdit);
  };

  // const { items, modalBoolean, closeModal } = this.props;

  return (
    <>
      <ContactForm />
      {items.length > 0 && (
        <>
          <Filter />
          <ContactList getContact={getContact} />
        </>
      )}
      <MyModal modal={modalBoolean}>
        <ContactForm contactForEdit={contactForEdit} />
      </MyModal>
    </>
  );
}
