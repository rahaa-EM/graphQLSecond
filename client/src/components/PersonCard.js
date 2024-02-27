import { Card } from 'antd';
import RemovePerson from './buttons/RemovePerson';
import { useState } from 'react';
import UpdatePerson from './forms/UpdatePerson';
import { EditOutlined } from '@ant-design/icons';
import Cars from './Cars';
import { Link } from 'react-router-dom'; 
// ================================================

const PersonCard = props => {
    const [editMode, setEditMode] = useState(false);
    const styles = getStyle();
    const { id, firstName, lastName, cars } = props;

    const handleButtonClick = () => {
        setEditMode(!editMode);
    };
    return (
        <div className="card">
            {editMode ? (
            <UpdatePerson id={id}
                firstName={firstName}
                lastName={lastName}    
                onButtonClick={handleButtonClick}
            /> 

            ) :(
            <Card 
            style={styles.card}
            actions={[
                <EditOutlined key='edit' onClick={handleButtonClick} />,
                <RemovePerson id={id} />

            ]}
             >
                <Link to={`/detail/${id}`}>
             <Card.Meta
                        title={<h3>{firstName} {lastName}</h3>}
                    />
             <Cars cars={cars} firstName={firstName} lastName={lastName}/>
             </Link>
            </Card>
        )}
        
        </div>
    );
}

const getStyle = () => ({
    card: {
        width: '100%',
        padding: '0'
    }
})
export default PersonCard;