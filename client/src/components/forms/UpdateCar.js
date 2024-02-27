import { Form, Input, Button, Select } from 'antd';
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_CAR , GET_PEOPLE} from '../../graphql/queries';
// =================================================
const { Option } = Select;
const UpdateCar = props => {
    const {id, year, make, price, model, personId} = props;
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();
    const [updateCar] = useMutation(UPDATE_CAR);
    const { loading, error, data } = useQuery(GET_PEOPLE, {
        variables: { id: personId }
    });
    useEffect(() => {
        forceUpdate();
    }, []);

    const onFinish = values => {
        const { year, make, model, price, personId } = values;
        updateCar({
            variables: {
                id,
                year,
                make,
                model,
                price,
                personId
            },
            update: (cache, { data: { updateCar } }) => {
                const data = cache.readQuery({ query: GET_PEOPLE });
                cache.writeQuery({
                    query: GET_PEOPLE,
                    data: {
                            ...data,
                            people: [...data.people, updateCar]
                    }
                });
            }
        });
        props.onButtonClick();
    }

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    const person = data.people[0];
    return (
        <Form
            name='updateCar'
            layout='inline'
            size='large'
            onFinish={onFinish}
            initialValues={{
                year,
                make,
                model,
                price,
                personId
            }}
            >
                <Form.Item name='year' rules={[{ required: true, message: 'Please Enter the Year'}]}>
                    <Input placeholder='Year' />
                </Form.Item>

                <Form.Item name='make' rules={[{ required: true, message: 'Please Enter the Make'}]}>
                    <Input placeholder='Make' />
                </Form.Item>

                <Form.Item name='model' rules={[{ required: true, message: 'Please Enter the Model'}]}>
                    <Input placeholder='Model' />
                </Form.Item>

                <Form.Item name='price' rules={[{ required: true, message: 'Please Enter the Price'}]}>
                    <Input placeholder='Price' />
                </Form.Item>

                <Form.Item 
                label='Person' 
                name='personId'
                rules={[{
                    required: true,
                    message: 'Please select a person'
                }]}
            >
                <Select placeholder="Select a person">
                {data?.people && data.people.map(({ id, firstName, lastName }) => (
                    <Option key={id}>
                        {firstName} {lastName}
                    </Option>
                    ))
                }
                </Select>
                </Form.Item>

                <Form.Item shouldUpdate={true}>
                    {() => (
                        <Button
                            type='primary'
                            htmlType='submit'
                            disabled={
                                !form.isFieldsTouched(true) ||
                                form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                            >
                                Update Car
                            </Button>
                    )}
                </Form.Item>
                <Button onClick={props.onButtonClick}>Cancel</Button>

            </Form>
    )

};
export default UpdateCar;