import { useState } from 'react';
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import {UserDataModal} from "../index.js";


function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('Сменить данные пользователя', '1', <UserSwitchOutlined />),
    getItem('Выход', '2', <LogoutOutlined />),
];

const SidebarMenu = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [userDataModalVisible, setUserDataModalVisible] = useState(false);
    const [activeKey, setActiveKey] = useState(null);
    const navigate = useNavigate();

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const handleLogout = () => {
        navigate('/login');
    };

    const openUserDataModal = () => {
        setUserDataModalVisible(true);
    };

    const closeUserDataModal = () => {
        setUserDataModalVisible(false);
        setActiveKey(null);
    };

    return (
        <div className="menu-wrapper">
            <Button
                type="primary"
                onClick={toggleCollapsed}
                className="menu-wrapper__button"
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu
                mode="inline"
                theme="light"
                inlineCollapsed={collapsed}
                items={items}
                selectedKeys={[activeKey]} // Укажите активные ключи
                onSelect={({ key }) => {
                    setActiveKey(key);
                    if (key === '2') {
                        handleLogout();
                    }
                    if (key === '1') {
                        openUserDataModal();
                    }
                }}
            />
            <UserDataModal
                visible={userDataModalVisible}
                onClose={closeUserDataModal}
            />
        </div>
    );
};

export default SidebarMenu;
