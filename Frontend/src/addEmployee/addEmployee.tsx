import { useState } from 'react';
import { useTranslation } from 'react-i18next'
import './style.css'
import axios from 'axios';
import { useStore } from '../store/store';
import { message } from 'antd';
import Dnd from '../dnd/dnd';


export default function AddEmployee() {

    const store = useStore();
    const { t } = useTranslation()
    const { Fimage, Fmname, Fmaddress, Fmcity, Fmstate, Fmcountry, Fmsalary, Fmbtn } = t('addEmployee')

    const [image, setImage] = useState(null)
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [salary, setSalary] = useState<Number>()

    const AddEmployee = async () => {
        try {
            const body = { image, name, address, city, state, country, salary }
            // body.append('EmpImg', image)
            // body.append('name', name)
            // body.append('address', address)
            // body.append('city', city)
            // body.append('state', state)
            // body.append('country', country)
            // body.append('salary', salary)
            const result = await axios({ method: 'post', url: '/employee', data: { ...body }, headers: {'Content-Type' : 'multipart/form-data'} }).then(res => res.data)
            store.addEmployee(result.message)
            message.success('Employee Added')
        } catch (error) {
            console.log(error)
            message.error('Unable to add the employee')
        }
        finally {
            reset()
        }
    }


    const reset = () => {
        setImage(null)
        setName('')
        setAddress('')
        setCity('')
        setState('')
        setCountry('')
        setSalary(0)
    }

    return (
        <div className='addEmployee'>
            <div>
                <label htmlFor="image">{Fimage}</label>
                <div><Dnd setImage={setImage} /></div>
            </div>
            <div>
                <label htmlFor="name">{Fmname}</label>
                <input name='name' type="text" placeholder={Fmname} value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="address">{Fmaddress}</label>
                <input name='address' type="text" placeholder={Fmaddress} value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div>
                <label htmlFor="city">{Fmcity}</label>
                <input name='city' type="text" placeholder={Fmcity} value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div>
                <label htmlFor="state">{Fmstate}</label>
                <input name='state' type="text" placeholder={Fmstate} value={state} onChange={(e) => setState(e.target.value)} />
            </div>
            <div>
                <label htmlFor="country">{Fmcountry}</label>
                <input name='country' type="text" placeholder={Fmcountry} value={country} onChange={(e) => setCountry(e.target.value)} />
            </div>
            <div>
                <label htmlFor="salary">{Fmsalary}</label>
                <input name='salary' type="number" placeholder={Fmsalary} onChange={(e) => setSalary(e.target.valueAsNumber)} />
            </div>
            <div><button onClick={AddEmployee}>{Fmbtn}</button></div>
        </div>
    )
}