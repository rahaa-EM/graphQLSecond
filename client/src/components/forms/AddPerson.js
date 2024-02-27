import React from 'react';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Form, Input, Button } from 'antd';
import { useMutation } from '@apollo/client';
import { ADD_PERSON } from '../../graphql/queries';
import { GET_PEOPLE } from '../../graphql/queries';
// =================================================

const AddPerson = () => {
 const [id, setId] = useState(uuidv4());
 const [form] = Form.useForm();
 const [, forceUpdate] = useState();
 const styles = getStyles();

 const [addPerson] = useMutation(ADD_PERSON);
 useEffect(() => {
    forceUpdate();
 }, []);

 const onFinish = values => {
    console.log('on finish from AddPerson.js')
    const { firstName, lastName } = values;
    console.log('firstName:', firstName);
    console.log('lastName:', lastName);

    addPerson({
        variables: {
            id,
            firstName,
            lastName
        },
        update: (cache, { data: { addPerson } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE });
        cache.writeQuery(
            {
                query: GET_PEOPLE,
                data: {
                    ...data,
                    people: [...data.people, addPerson]
                }
            }
        )
    }    
    }
    );
 }
 return(
    <div>
        <h2 style={styles.addTitle}>Add Person</h2>
    <Form 
        name='addPerson'
        layout='inline'
        size='large'
        style={{marginBottom: '20px'}}
        form={form}
        onFinish={onFinish}
    >
    
        <Form.Item 
            label='First Name' 
            name='firstName'
            rules={[{
                        required: true,
                        message: 'Please enter a first name'
                    }]}
            >
            <Input placeholder='John' />
        </Form.Item>

        <Form.Item 
            label='Last Name' 
            name='lastName'
            rules={[{
                required: true,
                message: 'Please enter a last name'
            }]}
            >
            <Input placeholder='Lenon' />
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
                    Add Person
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
export default AddPerson;