import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AiFillEdit } from 'react-icons/ai';
import { BsCheckSquare } from 'react-icons/bs';
import { MdDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const TaskShowcase = ({ task, refetch }) => {
    const { darkMode } = useContext(AuthContext)
    const { _id, taskTitle, taskDetails, taskImg, taskDate, status } = task;

    //Mark any Task as complete
    const handleCompleteTask = (id) => {
        fetch(`https://doroutine.vercel.app/updatetask/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'Completed' })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Task Marked as Complete...')
                    refetch()
                }
            })
    }
    //Delete any Task
    const handleDeleteTask = (id) => {
        fetch(`https://doroutine.vercel.app/deletetask/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.error('Uffs!! Task Deleted...')
                    refetch()
                }
            })
    }
    return (
        <div className={`${darkMode ? 'bg-gray-100' : 'bg-gray-800'} rounded-md shadow-lg p-5 font-poppins`}>
            <div className='border-b border-accent pb-3'>
                <div className='flex justify-between gap-1'>
                    <h3 className='font-bigshoulder text-xl font-semibold text-primary'>{taskTitle}</h3>
                    <Link to={`/updatetask/${_id}`}>
                        <button
                            onClick={() => handleCompleteTask(_id)}
                            className='bg-primary text-white py-2 px-3 rounded'>
                            <AiFillEdit></AiFillEdit>
                        </button>
                    </Link>
                </div>
                <img src={taskImg} alt={taskTitle} className='w-full h-32 rounded my-5' />
                <p>{taskDetails}</p>
            </div>
            {/* Showing Task date and time */}
            <div className='flex justify-between mt-2'>
                <p>Date: {taskDate.slice(0, 10)}</p>
                <p>Time: {taskDate.slice(11)}</p>
            </div>
            {/* Task Action buttons */}
            <div className='flex justify-between mt-3'>
                <button
                    onClick={() => handleCompleteTask(_id)}
                    className={`flex items-center gap-1 ${status === 'Completed' ? 'bg-secondary' : 'bg-primary hover:bg-actionbtn'} text-white py-2 px-3 rounded duration-300 ease-in-out`} disabled={status === 'Completed'}>
                    {
                        status === 'Completed' ? 'Completed'
                            : <><BsCheckSquare></BsCheckSquare>
                                Complete</>
                    }
                </button>
                <button
                    onClick={() => handleDeleteTask(_id)}
                    className='flex items-center gap-1 bg-actionbtn text-white py-2 px-3 rounded duration-300 ease-in-out hover:bg-[#ed5745]'>
                    <MdDeleteForever></MdDeleteForever>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskShowcase;