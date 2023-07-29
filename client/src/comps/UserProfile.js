import React from 'react';
import { Card } from 'react-bootstrap';

const UserProfile = (props) => {
  const profile = props.options;
  return (
    <Card>
      <Card.Body>
        <img 
        src={profile.image}
        alt='avatar'
        />
      <Card.Title>{profile.name}</Card.Title>
    </Card.Body>
  </Card>
  )
}

export default UserProfile;