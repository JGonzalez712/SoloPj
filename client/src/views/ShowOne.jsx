import { React, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { format } from 'date-fns';

const ShowOne = () => {
    // const card = { 
    //     title: "Title", 
    //     category: "Category", 
    //     priority: "Priority", 
    //     description: "Description", 
    //     location: "Location", 
    //     dueDate: "Due Date", 
    //     image: "image-url" 
    // };

    const { id } = useParams()
    const navigate = useNavigate()
    // const {stateUpdater} = props
    const [reminder, setReminder] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/reminders/${id}`)
            .then((response) => {
                console.log(response)
                setReminder(response.data)
                // stateUpdater(response.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [id])

    const deleteReminder = () => {
        axios.delete(`http://localhost:8000/api/reminders/${id}`)
            .then((response) => {//this two lines not really necessary
                console.log(response);
                navigate("/reminders")
            })
    }


    return (
        <div className='min-h-screen py-40' style={{ backgroundImage: 'linear-gradient(115deg, #e1f4f3, #333333  )', }}>
            <div className="navbar thisNav">
           
                    <Link  className='thisLink' to={`/reminders`}>Home</Link>
                    <Link className='thisLink' to={`/`}>Add A Reminder</Link>
                
            </div>
            <div className='mainContent'>
                <div className="card">
                    {/* Access card properties using dot notation */}
                    {reminder.image && <img src={reminder.image} alt="Banner" className="banner" />}
                    <div className="content">
                        <h1 className='text-4xl mb-5'>{reminder.title}</h1>
                        <p><strong>Category:</strong> {reminder.category}</p>
                        <p><strong>Priority:</strong> {reminder.priority}</p>
                        <p><strong>Description:</strong> {reminder.description}</p>
                        <p><strong>Location:</strong> {reminder.location}</p>
                        {reminder.deadline ? (
                            <p><strong>Due Date: </strong>{format(new Date(reminder.deadline), 'MMM d, yyyy')}</p>
                        ) : (
                            <p><strong>Due Date: </strong>Invalid date</p>
                        )}
                        <Link className='ml-5' to={`/reminders/${reminder._id}/edit`} style={{color:'blue'}}>Edit</Link>
                        <div className='mt-5'>
                                    <button onClick={deleteReminder} className='w-2/5 py-3 rounded-xl text-center text-white' style={{ background: 'radial-gradient(circle at -1% 57.5%, rgb(19, 170, 82) 0%, rgb(0, 102, 43) 90%)' }} > Completed ✓</button>
                                </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowOne