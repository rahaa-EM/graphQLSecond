import React, { useEffect } from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Form, Input, Button, Select } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CAR, GET_PEOPLE } from '../../graphql/queries';
// =================================================

const { Option } = Select;
const AddCar = () => {
 const [id, setId] = useState(uuidv4());
 const [form] = Form.useForm();
 const [, forceUpdate] = useState();
 const [addCar] = useMutation(ADD_CAR);
 const styles = getStyles();

 const { loading, error, data } = useQuery(GET_PEOPLE);

 useEffect(() => {
    forceUpdate();
 }, []);

    const onFinish = values => {
        console.log('Received values of form: ', values);
        const { year, make, model,price, personId } = values;
        addCar({
            variables: {
                id,
                year: year.toString(),
                make: make.toString(),
                model: model.toString(), 
                price: price.toString(),
                personId: personId.toString()
            },
            update: (cache, { data: { addCar } }) => {
                const data = cache.readQuery({ query: GET_PEOPLE });
                cache.writeQuery({
                    query: GET_PEOPLE,
                    data: {
                            ...data,
                            people: [...data.people, addCar]
                    }
                });
            }
        });
    
        form.resetFields();
        setId(uuidv4());
    };
    if (loading || !data || data.people.length === 0) {
        return null;
    }
 return(
    <div>
        <h2 style={styles.addTitle}>Add Car</h2>
    <Form 
        name='addCar'
        layout='inline'
        size='large'
        style={{marginBottom: '20px'}}
        form={form}    
        onFinish={onFinish}
    >
    
        <Form.Item 
            label='Year' 
            name='year'
            rules={[{
                        required: true,
                        message: 'Plrease enter a year'
                    }]}
            >
            <Input placeholder='Year' />
        </Form.Item>

        <Form.Item 
            label='Make' 
            name='make'
            rules={[{
                required: true,
                message: 'Please enter a make'
            }]}
            >
            <Input placeholder='Make' />
        </Form.Item>

        <Form.Item 
            label='Model' 
            name='model'
            rules={[{
                required: true,
                message: 'Please enter the model'
            }]}
            >
            <Input placeholder='Model' />
        </Form.Item>

        <Form.Item 
            label='Price' 
            name='price'
            rules={[{
                required: true,
                message: 'Please enter the price'
            }]}
            >
            <Input 
                placeholder='Price'
                addonBefore='$'
                type='number'
                />
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
                    Add Car
                </Button>
                )}
        </Form.Item>
    </Form>
    </div>
 )
};

const getStyles = () => {
    return {
        addTitle: {
            display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '30px',
        borderBottom: '2px solid #ddd',
        width: '100%',
        paddingBottom: '10px'
        }
    };
};
export default AddCar;