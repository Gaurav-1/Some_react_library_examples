import { useState } from 'react'
import { Popconfirm, Table, Button, message } from 'antd'
import { useStore } from '../store/store'
import axios from 'axios'
import { toJS } from 'mobx'
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
      title: Tbname,
      dataIndex: 'name',
      key: 'name',
      showSorterTooltip: {target: 'full-header'}
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
          <Popconfirm title={popup.title} okText={popup.ok} cancelText={popup.cancel} onConfirm={() => { console.log(toJS(record).id); DeleteEmployee(toJS(record).id) }}>
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