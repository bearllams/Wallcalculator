import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import useLocalStorage from "../../../hooks/useLocalStorage.jsx";

const UserDataModal = ({ visible, onClose, key }) => {
    const [login, setLogin] = useLocalStorage('login', ''); // Получаем и устанавливаем логин из/в localStorage
    const [password, setPassword] = useLocalStorage('password', ''); // Получаем и устанавливаем пароль из/в localStorage

    const onFinish = (values) => {
        console.log('Received values:', values);
        setLogin(values.username);
        setPassword(values.password);
        onClose();
    };

    return (
        <Modal
            title="Смена данных пользователя"
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form
                name="user_data_form"
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}
                >
                    <Input placeholder={`Текущий логин: ${login}`} />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
                >
                    <Input.Password placeholder={`Текущий пароль: ${password}`} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

UserDataModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default UserDataModal;
