import { useCallback, useState, useMemo } from 'react'
import { DndProvider, DropTargetMonitor, useDrop } from 'react-dnd'
import { HTML5Backend, NativeTypes } from 'react-dnd-html5-backend'
import style from './style.module.css'
import { message } from 'antd'

// export interface FileListProps {
//     files: File[]
// }

export interface TargetBoxProps {
    onDrop: (item: { files: any[] }) => void
    files: File[]
}

export function TargetBox({ onDrop, files }: TargetBoxProps) {

    const [{ canDrop, isOver }, drop] = useDrop(
        () => ({
            accept: [NativeTypes.FILE],
            drop(item: { files: any[] }) {
                if (onDrop) {
                    const imageFile = item.files.filter(file => file.type.startsWith('image/'))
                    if (imageFile.length > 0)
                        onDrop({files: imageFile})
                    else
                        message.error('Only image files are accepted')
                }
            },
            collect: (monitor: DropTargetMonitor) => {
                return {
                    isOver: monitor.isOver(),
                    canDrop: monitor.canDrop()
                }
            },
        }), [onDrop]
    )

    const isActive = canDrop && isOver

    const preview = useMemo(()=>files.map((file: any) => {
        const src = URL.createObjectURL(file)
        return <img src={src} key={file.name} style={{ width: '90%', height: '5rem' }} alt={file.name} />
    }),[files])

    return (
        <div ref={drop} className={style.targetBox}>
            {!files.length ? (isActive ? 'Release to drop' : 'Drag image here') : null}
            <div className={style.preview}>
                {preview}
            </div>
        </div>
    )
}

export default function Dnd({ setImage }) {
    const [droppedFiles, setDroppedFiles] = useState<File[]>([])

    const handleFileDrop = useCallback(
        (item: { files: any[] }) => {
            if (item && item.files.length >0) {
                const files = item.files
                setDroppedFiles(files)
                setImage(files[0])
            }
        }, [setImage]
    )


    const list = (files: File[]) => {
        return files.map((file) => <label key={file.name} className={style.fileName}>{file.name}</label>)
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <TargetBox onDrop={handleFileDrop} files={droppedFiles} />
            {(droppedFiles.length > 0) ? list(droppedFiles) : <div>No file dropped</div>}
        </DndProvider>
    )
}