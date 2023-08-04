import React from 'react';
import { Card, Image } from 'react-bootstrap';

const UserProfile = (props) => {
  const profile = props.options;
  return (
    <Card className='text-white align-items-center justify-content-center' style={{width:'100%', fontWeight: '700', background: '#2C2828'}}>
      <Card.Body className='text-center'>
        <Image
          src={profile.image}
          alt='avatar'
          className='my-3 d-block rounded'
          style={{
            objectFit: 'cover',
            margin: '0',
          }}
          roundedCircle
        />
        <Card.Title className='profile-name my-2'>{profile.name}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default UserProfile;