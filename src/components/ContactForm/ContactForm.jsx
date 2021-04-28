import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import s from './ContactForm.module.css';
import PropTypes from 'prop-types';
import { contactsOperations, contactsSelectors } from '../../redux/phonebook';

import MyButton from '../Button';
import { Container, Input, InputAdornment } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CallIcon from '@material-ui/icons/Call';

export default function ContactForm({ contactForEdit }) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (contactForEdit) {
      const { id, name, number } = contactForEdit;
      setId(id);
      setName(name);
      setNumber(number);
    }
    return () => {
      setId(id);
      setName(name);
      setNumber(number);
    };
  }, [contactForEdit]);

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        return setName(value);
      case 'number':
        return setNumber(value);

      default:
    }
  };

  const contacts = useSelector(contactsSelectors.contactsArray);

  const handleSubmit = e => {
    e.preventDefault();

    setId(id);
    setName(name);
    setNumber(number);

    let newContact;
    reset();

    if (id) {
      dispatch(contactsOperations.changeContact({ id, name, number }));
      return;
    }

    if (contacts.find(el => el.name.toLowerCase() === name.toLowerCase())) {
      return alert(`${name} is already in contacts`);
    } else if (contacts.some(el => el.number === number)) {
      return alert(`Number ${number} is already in contacts`);
    } else {
      newContact = {
        name: name,
        number: number,
      };
    }
    dispatch(contactsOperations.addContact(newContact));
  };

  const reset = () => {
    setName('');
    setNumber('');
  };
  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <div className={s.phonebookInputFields}>
          <label className="phonebook-label">
            <Input
              className={s.phonebookInput}
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              }
              type="text"
              name="name"
              value={name}
              inputProps={{
                pattern:
                  "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
                title:
                  'The name can only consist of letters, apostrophes, dashes and spaces. For example: Jacob Mercer',
              }}
              placeholder="Kate White"
              onChange={handleChange}
              required
            />
          </label>
          <label className="phonebook-label">
            <Input
              startAdornment={
                <InputAdornment position="start">
                  <CallIcon />
                </InputAdornment>
              }
              className={s.phonebookInput}
              type="tel"
              name="number"
              value={number}
              placeholder="+380683033145"
              onChange={handleChange}
              required
              inputProps={{
                pattern: '[+][0-9]{2}[0-9]{3}[0-9]{2}[0-9]{2}[0-9]{3}',
                title:
                  'The phone number must be 11-12 digits long and can contain numbers, spaces, dashes, pot-bellied brackets and can start with +',
              }}
            />
          </label>
          {contactForEdit ? (
            <MyButton title={'Edit'} />
          ) : (
            <MyButton title={'Add contact'} />
          )}
        </div>
      </form>
    </Container>
  );
}

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
  onSubmit: PropTypes.func,
};
