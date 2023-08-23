import React from 'react';
import { Card, Image } from 'react-bootstrap';

const TopCard = (props) => {
    const element = props.options[0];
    const cardTitle = props.options[1];
  return (
    <Card className='d-flex align-items-center justify-content-center' style={{ width: '100%', margin: '0', background: '#2C2828', marginBottom: '0'}}>
      <Card.Body className='text-center text-white'>
        <Card.Title style={{ fontWeight: '700' }} className='text-md'>{cardTitle}</Card.Title>
          <a className='topCard' href={element[0].externalUrl} target='_blank' rel='noopener noreferrer'>
            <Image
              style={{
                maxWidth: '10rem',
                maxHeight: '10rem',
                objectFit: 'cover',
              }}
              src={element[0].image}
              alt='avatar'
            />
            <Card.Text className='py-1 text-md'>
              {element[0].name}
            </Card.Text>
          </a>
      </Card.Body>
    </Card>
  );
}

export default TopCard;