import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchContacts, unsubscribeUser } from '../../../store/actions';

import { Link} from 'react-router-dom';
import { Trans } from 'react-i18next';

const ContactList = (props) => {
  
  const { fetchContacts } = props
  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);


  const unsubscribe = ({target}) => {
    const contact = target.getAttribute('contact')
    props.unsubscribeUser(contact)
  }

  return (
    <div>
      <h3><Trans>ContactList</Trans></h3>

      {props.contacts.map(({_id, contact_person, message, advertisement_id, updatedAt}) => 
            <div className="row advertisements-row advertisements-row--green" key={_id}>
              <div className="col-md-10 advertisements-row__description">
                {contact_person &&<Link to={`/profiles/${contact_person._id}`} className="text-success">
                    {contact_person.name || contact_person.email}
                  </Link>}
                  &nbsp; | &nbsp;<span className="text-success">{new Date(updatedAt).toDateString()}</span>

              </div>
              <div className="col-md-2 advertisements-row__description">
                  <span className="text-success" contact={_id} onClick={unsubscribe}>
                    <Trans>Unsubscribe</Trans>
                  </span>
              </div>
            </div>
      )}
    </div>
  )
}

const mapStateToProps = ({auth, contacts: {contacts}, ...res}) => ({ user: auth, contacts});

export default connect(mapStateToProps, { fetchContacts, unsubscribeUser })(ContactList);
