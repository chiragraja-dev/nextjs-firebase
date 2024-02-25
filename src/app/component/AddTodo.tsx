import { db } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

interface Props {
    onClose: any,
    isVisible: any,
    isEdit: any,
    data: any
}

const AddTodo = ({ onClose, isVisible, isEdit, data }: Props) => {
    const [newTask, setNewTask] = useState({ title: '', detail: '' });

    const handleAddTask = async () => {
        // Validate newTask object before adding to Firebase
        if (!newTask.title || !newTask.detail) {
            alert('Title and detail are required for a new task');
            return;
        }

        try {
            const docRef = await addDoc(collection(db, 'todos'), {
                title: newTask.title,
                detail: newTask.detail,
                timestamp: new Date(),
                new: ""
            }).then(
                await onClose()
            );
            setNewTask({ title: '', detail: '' });

        } catch (error) {
            console.error('Error adding new task: ', error);
        }
    };

    const handleUpdatetask = async () => {

    }

    useEffect(() => {
        if (isEdit == true) {
            setNewTask({ title: data.title, detail: data.detail })
        }
    }, [isEdit])


    if (!isVisible) return null
    return (
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-opacity-60 bg-black">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className=" p-10 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="detail" className="block text-sm font-medium text-gray-700">
                            Detail:
                        </label>
                        <input
                            type="text"
                            id="detail"
                            name="detail"
                            value={newTask.detail}
                            onChange={(e) => setNewTask({ ...newTask, detail: e.target.value })}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                    <br />
                    <div className=' flex float-end gap-3 '>
                        <button className='bg-red-500 text-white p-2 rounded-md' onClick={() => onClose()}>Close</button>
                        <button
                            type="button"
                            onClick={handleAddTask}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Add Task
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddTodo