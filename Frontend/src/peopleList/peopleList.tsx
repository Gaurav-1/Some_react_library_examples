import { useState } from 'react'
import { Popconfirm, Table, Button, message } from 'antd'
import { useStore } from '../store/store'
import axios from 'axios'
import { keys, toJS } from 'mobx'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import './style.css'


function PeopleList() {

  const store = useStore()

  const { t } = useTranslation();
  const { Tbname, Tbaddress, Tbcity, Tbstate, Tbcountry, Tbsalary, Tboperation, Tbbutton, popup } = t('tables')

  const DeleteEmployee = async (id: string) => {
    try {
      await axios({ method: 'delete', url: '/employee', data: { id: id } })
      store.deleteEmployee(id)
      message.info('Employee deleted')
    } catch (error: any) {
      message.error(error)
    }
  }


  const columns = [
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'images',
      render: (text: string)=> <img src={`/employeesPics${text}`} alt="Employee Image" style={{width: '50px', height: '50px'}} />
    },
    {
      title: Tbname,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: Tbaddress,
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: Tbcity,
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: Tbstate,
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: Tbcountry,
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: Tbsalary,
      dataIndex: 'salary',
      key: 'salary',
    },
    {
      title: Tboperation,
      dataIndex: 'operation',
      render: (_, record) =>
        store.employee.length > 0 ? (
          <Popconfirm title={popup.title} okText={popup.ok} cancelText={popup.cancel} onConfirm={() => { DeleteEmployee(toJS(record).id) }}>
            <Button type='primary'>{Tbbutton}</Button>
          </Popconfirm>
        ) : null
    }
  ]

  return (
    <Table className='peopleList' dataSource={store.employee} columns={columns} bordered showSorterTooltip={{target: 'sorter-icon'}}></Table>
  )
}

export default observer(PeopleList)