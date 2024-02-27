import React from 'react';
import { Card, List } from 'antd';
import CarCard from './CarCard';
import { useQuery } from '@apollo/client';
import { GET_PEOPLE } from '../graphql/queries';
import PersonCard from './PersonCard';
// =================================================

const People = ({ firstName, lastName, cars }) => {
    const { loading, error, data } = useQuery(GET_PEOPLE);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    console.log('This is data from People:', data);
  return (
      <List grid={{ gutter: 20, column: 1 }}>
          {data.people.map(({ id, firstName, lastName, cars }) => (
            <List.Item key={id}>
              <PersonCard 
                id={id}  
                firstName={firstName} 
                lastName={lastName}
                cars={cars}
              />
            </List.Item>
          ))}
      </List>
  );
};

export default People;
