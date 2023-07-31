import React from 'react';
import { Card, Image } from 'react-bootstrap';

const UserProfile = (props) => {
  const profile = props.options;
  return (
    <Card className='text-white' style={{width: '25rem', fontWeight: '700', background: '#2C2828'}}>
      <Card.Body className='text-center'>
        <Image 
          src={profile.image}
          alt='avatar'
          roundedCircle
        />
      <Card.Title className='fs-4 my-2'>{profile.name}</Card.Title>
    </Card.Body>
  </Card>
  )
}

export default UserProfile;