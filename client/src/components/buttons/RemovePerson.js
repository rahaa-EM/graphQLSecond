import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { REMOVE_PERSON , GET_PEOPLE} from '../../graphql/queries';
import filter from 'lodash/filter';
// ==============================================

const RemovePerson = ({ id }) => {
    const [removePerson] = useMutation(REMOVE_PERSON, {
        update(cache, { data: { removePerson } }) {
            const { people } = cache.readQuery({ query: GET_PEOPLE });
            cache.writeQuery({
                query: GET_PEOPLE,
                data: {
                    people: filter(people, p => { return p.id !== removePerson.id })
                }
            });
        }
    });
    const handleRemove = () => {
        let result = window.confirm("Are you sure you want to delete this person?");
        if(result){
            console.log("Person has been deleted");
            removePerson({
                variables: {
                    id: id
                }
            });
        }
    };
    return (
        <DeleteOutlined key="delete" style={{ color: 'red'}} onClick={handleRemove}/>
    );
}
export default RemovePerson;