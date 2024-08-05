import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { useStore } from '../store/store'
import { useState } from 'react'
import style from './style.module.css'
import {useTranslation} from 'react-i18next'

export default function Dragable() {
    const store = useStore()
    const [selectedEmpId, setSelectedEmpId] = useState<string | null>(null)
    const {t} = useTranslation()
    const {employeeList,  dragMsg} = t('dragDrop')

    function handleOnDragEnd(result: DropResult) {
        const { source, destination } = result
        if (!destination)
            return

        if (destination.droppableId === 'result-box')
            setSelectedEmpId(result.draggableId)
    }

    const selectedEmp = () => {
        const emp = store.employee.find(emp => emp.id === selectedEmpId)
        return (
            <div className={style.empCard}>
                <img src={`employeesPics/${emp?.images}`} alt={emp?.name} className={style.empImg} />
                <h3>Name: {emp?.name}</h3>
                <p className={style.address}>Address: {emp?.address}, {emp?.city}, {emp?.state}</p>
                <p>Country: {emp?.country}</p>
                <p>Salary: {emp?.salary}</p>
            </div>
        )
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className={style.dragable}>
                <div className={style.list_box}>
                    <h3>{employeeList}</h3>
                    <Droppable droppableId='list-box'>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {store.employee.map((props: any, index: any) => (
                                    <Draggable key={props.id} draggableId={props.id} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}>
                                                <label>{props.name}</label>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            </div>
                        )}
                    </Droppable>
                </div>
                <div className={style.result_box}>
                    <Droppable droppableId='result-box'>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {selectedEmpId ? selectedEmp() : <p>{dragMsg}</p>}
                            </div>
                        )}
                    </Droppable>
                </div>
            </div>
        </DragDropContext>
    )
}