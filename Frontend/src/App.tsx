import axios from 'axios'
import { useEffect, useState } from 'react'
import PeopleList from './peopleList/peopleList'
import Map from './map/map'
import { useStore } from './store/store'
import { set, toJS } from 'mobx'
import './App.css'
import { Button, message } from 'antd'

import { useTranslation } from 'react-i18next'
import LanguageSelector from './components/languageSelector'
import Header from './header/header'
import Charts from './chart/chart'
import AddEmployee from './addEmployee/addEmployee'
import Dnd from './dnd/dnd'


function App() {
  const store = useStore()

  const [home, setHome] = useState(false)
  const [map, setMap] = useState(false)
  const [addEmployee, setAddEmployee] = useState(false)
  const [showChart, setShowChart] = useState(false)
  const [dnd, setDnd] = useState(false)

  const getEmployee = async () => {
    try {
      const emp = await axios({ method: 'get', url: '/employee' }).then(res => res.data)
      emp.message.map((props: any) => store.addEmployee(props))
    } catch (err: any) {
      message.error(err)
    }
    finally {
      setHome(true)
    }
  }

  const handleHeader = (link: string) => {
    setHome(false)
    setMap(false)
    setAddEmployee(false)
    setShowChart(false)
    setDnd(false)

    link == 'home' && setHome(true)
    link == 'map' && setMap(true)
    link == 'add employee' && setAddEmployee(true)
    link == 'chart' && setShowChart(true)
    link == 'dnd' && setDnd(true)
  }

  useEffect(() => {
    getEmployee()
  }, [])

  return (
    <>
      <Header handleHeader={handleHeader} />

      {home && <PeopleList />}

      {map && <Map />}

      {addEmployee && <AddEmployee />}

      {showChart && <Charts />}

      {dnd && <Dnd/>}

    </>
  )
}

export default App