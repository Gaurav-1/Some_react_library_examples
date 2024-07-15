import { useCallback, useState, useMemo } from 'react'
import { DndProvider, DropTargetMonitor, useDrop } from 'react-dnd'
import { HTML5Backend, NativeTypes } from 'react-dnd-html5-backend'
import style from './style.module.css'
import { message } from 'antd'

export interface FileListProps {
    files: File[]
}

export interface TargetBoxProps {
    onDrop: (item: { files: any[] }) => void
}

export function TargetBox({ onDrop, files }) {

    const [{ canDrop, isOver }, drop] = useDrop(
        () => ({
            accept: [NativeTypes.FILE],
            drop(item: { files: any[] }) {
                if (onDrop) {
                    const imageFile = item.files.filter(file => file.type.startsWith('image/'))
                    if (imageFile.length > 0)
                        onDrop(item)
                    else
                        message.error('Only image files are accepted')
                }
            },
            collect: (monitor: DropTargetMonitor) => {
                const item = monitor.getItem() as any
                if (item) {
                    console.log('collect', item.files, item.items);
                }
                return {
                    isOver: monitor.isOver(),
                    canDrop: monitor.canDrop()
                }
            },
        }), [onDrop]
    )

    const isActive = canDrop && isOver

    const preview = files.map((file: any)=>{
        const src = URL.createObjectURL(file)
        return <img src={src} key={file.name} style={{width: '100%', height: '100%'}} />
    })

    return (
        <div ref={drop} className={style.targetBox}>
            {!files.name ? (isActive ? 'Release to drop' : 'Drag file here') : ''}
            <div className={style.preview}>
                {preview}
                {console.log('dfjm',files)}
            </div>
        </div>
    )
}

export default function Dnd({setImage}) {
    const [droppedFiles, setDroppedFiles] = useState<File[]>([])

    const handleFileDrop = useCallback(
        (item: { files: any[] }) => {
            if (item) {
                const files = item.files
                setDroppedFiles(files)
                setImage(files)
            }
        }, [setDroppedFiles]
    )


    const list = (files: File[]) => {
        const label = (file: File) => `'${file.name}' of size '${file.size}' and type '${file.type}'`
        return files.map((file) => <label key={file.name}>{label(file)}</label>)
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <TargetBox onDrop={handleFileDrop} files={droppedFiles} />
            {(droppedFiles.length > 0) ? list(droppedFiles) : <div>No file dropped</div>}
        </DndProvider>
    )
}