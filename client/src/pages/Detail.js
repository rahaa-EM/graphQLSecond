import Details from '../components/Details';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PEOPLE } from '../graphql/queries';
import PersonCard from '../components/PersonCard';
import { Card } from 'antd';
import Cars from '../components/Cars';
import { Link } from 'react-router-dom';
// =========================================
const Detail = () => {
    
    const { personId } = useParams(); // Get the person ID from the URL
    console.log('Person ID:', personId);
    const { loading, error, data } = useQuery(GET_PEOPLE, { variables: { id: personId } }); 
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
   
    console.log('Data from Detail:', data.people);

    const person = data.people.find(person => person.id === personId);
    console.log('Person:', person);
    return (
        <div className="card">
             <Link to="/">Go Back</Link>
            <Card 
             >
             <h3> Name: {person.firstName} {person.lastName} </h3>
             <Cars cars={person.cars} personId={personId}/>
            </Card>
        
        </div>
    )
};
export default Detail;