import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../graphql/queries";
import { List } from "antd";
import CarCard from "./CarCard";
// ==========================================

const Cars = ({ personId, cars }) => {
    const styles = getStyles();
    const { loading, error, data } = useQuery(GET_PEOPLE, {variables: {id: personId}});
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    console.log('Data of Cars', data.people);

    return (
        <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
        {cars.map(car => (
            <List.Item key={car.id}>
                <CarCard key={car.id} car={car} />
            </List.Item>
        ))}
    </List>
);
};

const getStyles =() =>({
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
})
export default Cars;