import defaultAvatar from '../../images/ket.png';

import { useDispatch } from 'react-redux';
import { authOperations } from '../../redux/auth';
import { Avatar, CssBaseline, Button } from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';

export default function UserMenu() {
  const dispatch = useDispatch();

  return (
    <>
      <CssBaseline />
      <Avatar alt="user" src={defaultAvatar} />
      <Button type="button" onClick={() => dispatch(authOperations.logOut())}>
        <LockOpenIcon fontSize="large" style={{ color: 'white' }} />
      </Button>
    </>
  );
}
