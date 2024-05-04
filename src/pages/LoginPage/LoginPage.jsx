import {Form, Input, Button, message} from 'antd';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from "../../hooks/useLocalStorage.jsx";
import './_login-page.scss';

const LoginPage = () => {
    const navigate = useNavigate();
    const [login] = useLocalStorage('login', 'admin');
    const [password] = useLocalStorage('password', '12345');

    const onFinish = (values) => {
        if (values.username === login && values.password === password) {
            navigate('/calculator');
        } else {
            message.error('Ошибка авторизации')
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-wrapper__container">
                <h1>Wall Calculator</h1>
                <Form
                    className="container__login-form"
                    name="login_form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}
                        style={{width:'100%'}}
                    >
                        <Input placeholder="Логин" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
                        style={{width:'100%'}}
                    >
                        <Input.Password placeholder="Пароль" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
