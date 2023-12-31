import React from 'react';
import GenreChart from './GenreChart';
import { Card } from 'react-bootstrap';

const ChartCard = (props) => {
  const data = props.data;
  return (
    <Card className='text-white d-flex justify-content-center' border='dark' style={{height: '100%', width: '100%', background: '#2C2828'}}>
      <Card.Header style={{background: '#2C2828'}} className='fs-4 text-center'>Genre Breakdown</Card.Header>
      <Card.Body className='align-items-top' style={{padding: 0, height: '100%', width: '100%'}}>
        <GenreChart data={ data }/>
      </Card.Body>
    </Card>
  )
}

export default ChartCard;