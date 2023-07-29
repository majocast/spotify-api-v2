import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const ListCard = (props) => {
  const element = props.options;
  const nextFive = element.slice(1,6);
  return (
    <Card>
      <ListGroup className='list-group-flush'>
        {nextFive.map((item) => {
          return (
            <a className='listItemStyles' href={item.externalUrl} target='_blank' rel='noopener noreferrer'>
              <ListGroup.Item className='listItemStyles'>
                <img 
                  src={item.image}
                  alt='avatar'
                />
                {item.name}
              </ListGroup.Item>
            </a>
          )
        })}
      </ListGroup>
    </Card>
  )
}

export default ListCard;