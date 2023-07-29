import React from 'react';
import { ListGroup } from 'react-bootstrap';

const ListCard = (props) => {
  const element = props.options;
  <ListGroup className='listContStyles'>
    <a className='listItemStyles' href={element.externalUrl} target='_blank' rel='noopener noreferrer'>
      <ListGroup.Item className='listItemStyles'>
        <img
          className='artistListImg'
          src={element.image}
          alt='avatar'
        />
        {element.name}
      </ListGroup.Item>
    </a>
  </ListGroup>
}

export default ListCard;