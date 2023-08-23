import React from 'react';
import { Card, ListGroup, Image } from 'react-bootstrap';

const ListCard = (props) => {
  const element = props.options[0];
  const cardTitle = props.options[1];
  const nextFive = element.slice(1,6);

  return (
    <Card className='text-white d-flex justify-content-center' border='dark' style={{height: '100%', fontWeight: '700', background: '#2C2828', marginBottom: 'auto'}}>
      <Card.Header style={{background: '#2C2828'}} className='fs-4 text-center'>{cardTitle}</Card.Header>
      <ListGroup className='list-group-flush mx-2 my-2 px-1 rounded' style={{backgroundColor: '#1F1C1C'}}>
        {nextFive.map((item, index) => {
          return (
            <a key={index} href={item.externalUrl} target='_blank' rel='noopener noreferrer' style={{textDecoration: 'none'}}>
              <ListGroup.Item className='listCard d-flex align-items-center my-1 rounded'>
                  <Image 
                    style={{ 
                      margin: '0 1rem',
                      height: '3rem',
                      width: '3rem',
                      objectFit: 'cover',
                    }}
                    src={item.image}
                    alt={item.name}
                    fluid 
                  />
                  <Card.Text className='py-1 listText' style={{ maxWidth: 'calc(100% - 4rem)', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {item.name}
                  </Card.Text>
              </ListGroup.Item>
            </a>
          )
        })}
      </ListGroup>
    </Card>
  )
}

export default ListCard;