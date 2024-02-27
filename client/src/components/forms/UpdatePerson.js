import { Form, Input, Button } from 'antd';
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_PERSON } from '../../graphql/queries';
// =================================================

const UpdatePerson = props => {
    const {id, firstName, lastName} = props;
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();
    const [updatePerson] = useMutation(UPDATE_PERSON);
    useEffect(() => {
        forceUpdate();
    }, []);

    const onFinish = values => {
        const { firstName, lastName } = values;
        updatePerson({
            variables: {
                id,
                firstName,
                lastName
            }
        });
        props.onButtonClick();
    }

    return (
        <Form
            name='updatePerson'
            layout='inline'
            size='large'
            onFinish={onFinish}
            initialValues={{
                firstName,
                lastName
            }}
            >
                <Form.Item name='firstName' rules={[{ required: true, message: 'Please Enter a first name'}]}>
                    <Input placeholder='John' />
                </Form.Item>

                <Form.Item name='lastName' rules={[{ required: true, message: 'Please Enter a last name'}]}>
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
                                Update Person
                            </Button>
                    )}
                </Form.Item>
                <Button onClick={props.onButtonClick}>Cancel</Button>

            </Form>
            
    )
}
export default UpdatePerson;