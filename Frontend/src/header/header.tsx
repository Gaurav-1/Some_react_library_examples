import { } from 'react'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import LanguageSelector from '../components/languageSelector'
import './style.css'

export default function Header({ handleHeader }) {
    const { t } = useTranslation()
    const { home, map, addEmp, visData } = t('header')

    return (
        <nav className='nav'>
            <div>
                <Button type='primary' key='home' onClick={() => handleHeader('home')}>{home}</Button>
                <Button type='primary' key='map' onClick={() => handleHeader('map')}>{map}</Button>
                <Button type='primary' key='add employee' onClick={() => handleHeader('add employee')}>{addEmp}</Button>
                <Button type='primary' key='chart' onClick={() => handleHeader('chart')}>{visData}</Button>
                {/* <Button type='primary' key='dnd' onClick={() => handleHeader('dnd')}>{'Dnd'}</Button> */}
            </div>
            <div>
                <LanguageSelector />
            </div>
        </nav>
    )
}