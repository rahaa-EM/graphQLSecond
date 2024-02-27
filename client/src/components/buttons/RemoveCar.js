import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { REMOVE_CAR, GET_PEOPLE } from '../../graphql/queries';
import filter from 'lodash/filter';
// =============================================

const RemoveCar =({ carId })=>{
    const [removeCar] = useMutation(REMOVE_CAR, {
        update(cache, { data: { removeCar } }) {
            const { people } = cache.readQuery({ query: GET_PEOPLE });
            cache.writeQuery({
                query: GET_PEOPLE,
                data: {
                    people: people.map(person => ({
                        ...person,
                        cars: person.cars.filter(car => car.id !== removeCar.id)
                    }))
                }
            });
        }
    });
    const handleRemove = () => {
        let result = window.confirm('Are you sure you want to delete this car?');
        if (result) {
            console.log('Delete Car');
            removeCar({
                variables: {
                    id: carId
                }
            
            })
        }
    };
return(
        <DeleteOutlined key='delete' style={{color: 'red'}} onClick={handleRemove} />
)
}
export default RemoveCar;