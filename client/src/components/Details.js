import { Card } from 'antd';
import Cars from './Cars';
import { Link } from 'react-router-dom';
// ================================================

const Details = props => {
    const styles = getStyle();
    const { id, firstName, lastName, cars } = props;

    return (
        <div className="card">
             <Link to="/">Go Back</Link>
            <Card 
            style={styles.card}
             >
             <h3>{firstName} {lastName} </h3>
             <Cars cars={cars}/>
            </Card>
        
        </div>
    );
}

const getStyle = () => ({
    card: {
        width: '100%',
        padding: '0'
    }
})
export default Details;