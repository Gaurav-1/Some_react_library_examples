import { makeObservable, observable, action, toJS, computed } from 'mobx'
import { createContext, useContext } from 'react'
import { translate } from 'google-translate-api-x'

class IEmployee {
    id!: string;
    img?: string;
    name!: string;
    address!: string;
    city!: string;
    state!: string;
    country!: string;
    salary!: number;
    latitude!: number;
    longitude!: number;
}

class EmployeeStore {
    employee: IEmployee[] = []

    constructor() {
        makeObservable(this, {
            employee: observable,
            addEmployee: action,
            deleteEmployee: action,
            employeesChart: action,
            chartJsData: action,
            canvasJsData: action,
        })
    }
    addEmployee = (props: any) => {
        this.employee.push({
            id: props.id,
            img: props.img,
            name: props.name,
            address: props.address,
            city: props.city,
            state: props.state,
            country: props.country,
            salary: props.salary,
            latitude: props.latitude,
            longitude: props.longitude
        })
    }

    deleteEmployee = (id: string) => {
        this.employee = this.employee.filter((props: any) => props.id != id)
    }

    employeesChart = () => {
        const salaryMap: { [salary: number]: string[] } = {};

        this.employee.map((props: any) => {
            if (salaryMap[props.salary]) {
                salaryMap[props.salary].push(props.name);
            } else {
                salaryMap[props.salary] = [props.name];
            }
        });
        const data = Object.entries(salaryMap).map(([salary, names]) => [names.join(', '), Number(salary)]);
        return data
    }

    chartJsData = () => {
        const salaryMap: { [salary: number]: string[] } = {};

        this.employee.map((props: any) => {
            if (salaryMap[props.salary]) {
                salaryMap[props.salary].push(props.name);
            } else {
                salaryMap[props.salary] = [props.name];
            }
        });

        const names = Object.entries(salaryMap).map(([_, names]) => names.join(', '))
        const salary = Object.entries(salaryMap).map(([salary]) => Number(salary))
        return ({ names, salary })
    }

    canvasJsData = () => {
        const salaryMap: { [salary: number]: string[] } = {};

        this.employee.map((props: any) => {
            if (salaryMap[props.salary]) {
                salaryMap[props.salary].push(props.name);
            } else {
                salaryMap[props.salary] = [props.name];
            }
        });
        const data = Object.entries(salaryMap).map(([salary, names]) => { return ({ label: names.join(', '), y: Number(salary) }) })
        return data
    }

}

const EmployeeStoreContext = createContext<EmployeeStore | null>(null);

export const EmployeeStoreProvider = ({ children }: { children: React.ReactNode }) => {
    const store = new EmployeeStore()
    return <EmployeeStoreContext.Provider value={store}>{children}</EmployeeStoreContext.Provider>
}

export const useStore = () => {
    const store = useContext(EmployeeStoreContext);
    if (!store) {
        throw new Error('use in EmployeeStoreProvider')
    }
    return store
}