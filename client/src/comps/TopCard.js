import React from 'react';
import { Card } from 'react-bootstrap';

const TopCard = (props) => {
  const element = props.options;
  return (
    <Card>
    <Card.Body>
      <Card.Title className='cardTitle'>Top Artist</Card.Title>
      {element ? 
        <a href={element[0].externalUrl} target='_blank' rel='noopener noreferrer'>
          <img
            className='artistImg'
            src={element[0].image}
            alt='avatar'
          />
        </a> : undefined }
      {props.items ? 
      <Card.Text className='topTitle'>
        {element[0].name}
      </Card.Text> : undefined}
    </Card.Body>
  </Card>
  );
}

export default TopCard;