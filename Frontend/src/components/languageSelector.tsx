import { useTranslation } from "react-i18next";
import { Dropdown, Space, message } from 'antd'
import type { MenuProps } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import { useEffect } from "react";

const languages: MenuProps['items'] = [
    { label: 'English', key: 'en', icon: <UserOutlined /> },
    { label: 'हिंदी', key: 'hi', icon: <UserOutlined /> },
    { label: '日本語', key: 'ja', icon: <UserOutlined /> }
]


const LanguageSelector = () => {
    const { i18n, t } = useTranslation()
    const changeLanguage = async (e: { key: string }) => {
        try {
            await i18n.changeLanguage(e.key)
            const msg = t('languageChangeMsg')
            message.info(msg)
        } catch (error) {
            message.info('Error occured')
        }
    }

    const menuProps = {
        items: languages,
        onClick: changeLanguage,
    };


    return (
        <Space wrap>
            <Dropdown.Button menu={menuProps} trigger={['click']} key='langDropdown' icon={<DownOutlined />}>
                <Space>
                    {localStorage.getItem('i18nextLng')}
                </Space>
            </Dropdown.Button>
        </Space>
    )
}

export default LanguageSelector;