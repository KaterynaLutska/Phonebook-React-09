import PropTypes from 'prop-types';
import s from './Filter.module.css';

import { useDispatch, useSelector } from 'react-redux';

import { contactsSelectors } from '../../redux/phonebook';
import { changeFilter } from '../../redux/phonebook';

import { Container, Input, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

export default function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(contactsSelectors.getFilter);

  return (
    <Container maxWidth="sm">
      <div>
        <label>
          <Input
            className={s.filterInput}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            type="text"
            value={filter}
            placeholder="find contacts by name..."
            onChange={e => dispatch(changeFilter(e.target.value))}
          />
        </label>
      </div>
    </Container>
  );
}

Filter.protoType = {
  filter: PropTypes.string,
  changeFilter: PropTypes.func,
};
