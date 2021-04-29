import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from '../redux/auth';
import img from '../images/online2.png';
import MyButton from '../components/Button';

import {
  CssBaseline,
  TextField,
  Container,
  Typography,
} from '@material-ui/core';

export default function LoginView() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);

      default:
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(authOperations.logIn({ email, password }));

    setEmail('');
    setPassword('');
  };
  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <Typography
        variant="h3"
        align="center"
        color="textPrimary"
        style={{ margin: '30px' }}
      >
        Please, sign in!
      </Typography>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <TextField
          id="standard-basic"
          label="e-mail"
          className="phonebook-input"
          type="tel"
          name="email"
          value={email}
          placeholder="e-mail"
          required
          onChange={handleChange}
          style={{ marginRight: '20px' }}
        />
        <TextField
          id="standard-basic"
          label="password"
          className="phonebook-input"
          type="tel"
          name="password"
          value={password}
          placeholder="password"
          type="password"
          title="Please, more than seven values"
          required
          onChange={handleChange}
        />
        <MyButton
          title={'Submit'}
          style={{ display: 'flex', marginTop: '10px' }}
        />
      </form>
      <img alt="img" src={img} width="380px"></img>
    </Container>
  );
}
