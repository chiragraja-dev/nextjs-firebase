"use client";
import { db } from '@/firebase'
import { QuerySnapshot, collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import AddTodo from './AddTodo';

const TodoList = () => {


    const [todo, setTodo] = useState<any>()
    const [data, setData] = useState<any>()
    const [edit, setEdit] = useState<any>()
    const [showModal, setShowModal] = useState<boolean>(false)


    useEffect(() => {

        const collectionRef = collection(db, "todos")
        const q = query(collectionRef, orderBy("timestamp", "asc"))
        setData(q)
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            setTodo((QuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime() }))))
        })
        return unsubscribe
    }, [])


    const handleDeleteTask = async (taskId: any) => {
        try {
            const docRef = doc(db, 'todos', taskId);
            await deleteDoc(docRef)
        } catch (error) {
            console.error('Error deleting task: ', error);
        }
    };

    return (
        <div className="p-10">
            <div className=' float-end'>
                <button className='bg-blue-400 text-white p-2' onClick={() => { setShowModal(true) }}>Add Todo</button>
            </div>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-start">Title</th>
                        <th className="py-2 px-4 border-b text-start">Detail</th>
                        <th className="py-2 px-4 border-b text-start">Timestamp</th>
                        <th className='py-2 px-4 border-b text-start'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {todo && todo.map((task: any) => (
                        <tr key={task.id}>
                            <td className="py-2 px-4 border-b">{task.title}</td>
                            <td className="py-2 px-4 border-b">{task.detail}</td>
                            <td className="py-2 px-4 border-b">{task.timestamp}</td>
                            <td className='py-2 px-4 border-b flex justify-end gap-4'>
                                <button className='bg-green-400 text-white p-2' onClick={() => { setEdit(true) }}>Edit</button>
                                <button className='bg-red-400 text-white p-2' onClick={() => { handleDeleteTask(task.id) }}>Delete</button>
                            </td>
                            <AddTodo isVisible={edit} onClose={() => setEdit(false)} isEdit={true} data={task} />
                        </tr>
                    ))}
                </tbody>
            </table>
            <AddTodo isVisible={showModal} onClose={() => setShowModal(false)} isEdit={false} data={null} />
        </div>
    )
}

export default TodoList