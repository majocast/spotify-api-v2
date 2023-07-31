import React from 'react';
import { Card, Image } from 'react-bootstrap';

const TopCard = (props) => {
    const element = props.options[0];
    const cardTitle = props.options[1];
  return (
    <Card className='d-flex align-items-center justify-content-center' style={{ background: '#2C2828', width: '18rem', marginBottom: '0'}}>
      <Card.Body className='text-center text-white'>
        <Card.Title style={{ fontWeight: '700' }} className='fs-4'>Top Artist</Card.Title>
          <a href={element[0].externalUrl} target='_blank' rel='noopener noreferrer'>
            <Image
              style={{
                width: 'min(10rem, 15rem)',
                height: 'min(10rem, 15rem)',
                objectFit: 'cover',
              }}
              src={element[0].image}
              alt='avatar'
              roundedCircle
            />
          </a>
        <Card.Text className='py-1'>
            {element[0].name}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default TopCard;