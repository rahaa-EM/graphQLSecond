import React from 'react';
import { Card, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import RemoveCar from './buttons/RemoveCar';
import UpdateCar from './forms/UpdateCar';
import { useState } from 'react';

// =================================================

const CarCard = ({ car }) => {
    const [editMode, setEditMode] = useState(false);
    const styles = getStyles();
    // const {id, year, make, model, price } = props;
    const handleButtonClick = () =>{
      setEditMode(!editMode);
    }
    // const filteredCars = car.filter(car => car.personId === personId);

    return (
      <div>
        {editMode ? (
          <UpdateCar id={car.id}
            year={car.year}
            make={car.make}
            model={car.model}
            price={car.price}
            personId={car.personId}
            onButtonClick={handleButtonClick}
            />
        ) : (
        // filteredCars.map(car=>(
            <Card
            key={car.id}
            style={styles.card}
            actions={[
              <EditOutlined key='edit' onClick={handleButtonClick} />,
              <RemoveCar id={car.id} carId={car.id} />
            ]}
          >
           <p> Year: {car.year} - Make: {car.make} Model: {car.model} - Price: {formatCurrency(car.price)} </p>
          </Card>
        // ))
        )}
      
      </div>
    );
  };

  const getStyles = () => ({
    card:{
      width: '800px',
      display: 'flex',
      margin: '1rem',
      flexDirection: 'column',
      gap: '1rem',
    }
  })
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

export default CarCard;
