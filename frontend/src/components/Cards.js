import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import producer from '../images/producer.jpg';
import distributor from '../images/distributor.jpg';
import retailer from '../images/retailer.jpg';
import consumer from '../images/consumer.jpg';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out the different roles in our supply chain!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src={producer}
              text='The organizations that make products or services'
              label='Producer'
              path='/producer'
            />
            <CardItem
              src={distributor}
              text='The companies that take inventory in bulk from producers and deliver a bundle of related product lines to customers'
              label='Distributor'
              path='/distributor'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src={retailer}
              text='Those who stock inventory and sell in smaller quantities to customers in the general public'
              label='Retailer'
              path='/retailer'
            />
            <CardItem
              src={consumer}
              text='Individuals or organizations that purchase and use a product or service'
              label='Consumer'
              path='/consumer'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
