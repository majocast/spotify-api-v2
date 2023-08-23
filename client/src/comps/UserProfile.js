import React from 'react';
import { Card, Image } from 'react-bootstrap';

const UserProfile = (props) => {
  const profile = props.options;
  return (
    <Card className='text-white align-items-center justify-content-center' style={{width:'100%', fontWeight: '700', background: '#2C2828'}}>
      <a className='topCard' href={profile.externalUrl} target='_blank' rel='noopener noreferrer'>
        <Card.Body className='text-center'>
          <Image
            src={profile.image}
            alt='avatar'
            className='img-fluid'
            style={{
              objectFit: 'cover',
              margin: '0',
            }}
          />
          <Card.Title className='profileName my-2 text-md'>{profile.name}</Card.Title>
        </Card.Body>
      </a>
    </Card>
  )
}

export default UserProfile;