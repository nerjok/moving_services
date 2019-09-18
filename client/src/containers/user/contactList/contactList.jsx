import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchContacts, unsubscribeUser } from '../../../store/actions';

import Card from '../../../hoc/cardBorders';
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,  faSearch } from '@fortawesome/free-solid-svg-icons';

const ContactList = (props) => {
  
  useEffect(() => {
    props.fetchContacts();
  }, [])
  const { user: {_id: user_id } } = props;

  const unsubscribe = ({target}) => {
    const contact = target.getAttribute('contact')
    console.log(target, contact)
    props.unsubscribeUser(contact)
  }

  return (
    <div>
      ContactList

      {props.contacts.map(({_id, contact_person, message, advertisement_id, updatedAt}) => 
            <div className="row advertisements-row advertisements-row--green" key={_id}>
              <div className="col-md-10 advertisements-row__description">
                <Link to={`/profiles/${contact_person._id}`} className="text-success">
                    {contact_person.name || contact_person.email}
                  </Link>
                  &nbsp; | &nbsp;<span className="text-success">{new Date(updatedAt).toDateString()}</span>

              </div>
              <div className="col-md-2 advertisements-row__description">
                  <span className="text-success" contact={_id} onClick={unsubscribe}>
                    Unsubscribe
                  </span>
              </div>
            </div>
      )}
    </div>
  )
}

const mapStateToProps = ({auth, contacts: {contacts}, ...res}) => ({ user: auth, contacts});

export default connect(mapStateToProps, { fetchContacts, unsubscribeUser })(ContactList);