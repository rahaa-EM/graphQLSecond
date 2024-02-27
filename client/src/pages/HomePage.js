import AddPerson from "../components/forms/AddPerson";
import AddCar from "../components/forms/AddCar";
import PersonCard from "../components/PersonCard";
import People from "../components/People";
// ==========================================

const HomePage = () => {
    return (
        <>
            <AddPerson />
             <AddCar />
             <People />
        </>
    );
}
export default HomePage;