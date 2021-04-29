import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import img from '../../images/face.png';
import { openModal } from '../../redux/phonebook/phonebook-actions';

import { contactsOperations, contactsSelectors } from '../../redux/phonebook';

import {
  Card,
  CardMedia,
  CardContent,
  CssBaseline,
  Grid,
  Container,
  Typography,
  CardActions,
} from '@material-ui/core';

import useStyles from '../../styles';
import MyButton from '../Button';

export default function ContactList({ getContact }) {
  const dispatch = useDispatch(null);

  const classes = useStyles();
  const contacts = useSelector(contactsSelectors.getVisibleContacts);

  const onDelete = id => dispatch(contactsOperations.deleteContacts(id));

  const modalOpen = () => {
    dispatch(openModal());
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" className={classes.cardCrid}>
        <Grid container spacing={4}>
          {contacts.map(el => (
            <Grid key={el.id} item xs={12} sm={6}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={img}
                  title="imgTitle"
                />
                <CardContent className={classes.cardContent}>
                  <Typography variant="h5"> {el.name + ':'} </Typography>
                  <Typography variant="h5">{el.number}</Typography>
                  <Typography variant="h4">{el.message}</Typography>
                </CardContent>
                <CardActions>
                  <MyButton title={'Delete'} onClick={() => onDelete(el.id)} />
                  <MyButton
                    title={'Edit'}
                    onClick={() => {
                      modalOpen();
                      getContact(el);
                    }}
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape),
  onDelete: PropTypes.func,
};
