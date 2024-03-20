import { React, useState, useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

const Update = () => {
    const priority = ['High', 'Normal', 'Low']
    const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Meeting', 'Study', 'Exercise'];


    const navigate = useNavigate()
    const { id } = useParams()
    const [errors, setErrors] = useState({})//this will handle validation

    const [reminder, setReminder] = useState({
        title: "",
        category: "",
        priority: "",
        description: "",
        location: "",
        image: "",
        remindOn: new Date(),
        deadline: new Date()
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/reminders/${id}`, reminder)
            .then((response) => {
                console.log(response)
                navigate("/reminders")
            })
            .catch((error) => {
                console.log(error)
                setErrors(error.response.data.errors) //this handles errors validations
            })
    }

    const handleChange = (e) => {
        setReminder({ ...reminder, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/reminders/${id}`)
            .then((response) => {
                console.log(response)
                setReminder(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [id])


    return (
        <div className='min-h-screen py-40' style={{ backgroundImage: 'linear-gradient(115deg, #e1f4f3, #333333  )', }}>
            <div className="navbar thisNav">

                <Link className='thisLink' to={`/reminders`}>Home</Link>
                <Link className='thisLink' to={`/`}>Add A Reminder</Link>

            </div>
            <div className='container mx-auto'>
                <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
                    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${reminder.image})` }}>
                        {/* <h1 className='text-white text-8xl mb-6'><span style={{ fontFamily: ' lucida handwriting' }}>Jenny!</span></h1> */}
                        {/* <div>
                                <p className='text-white'>Welcome to Jenny!, your personal reminder assistant! Stay organized and never miss an important task or event again with our intuitive reminder app. </p>
                            </div> */}
                    </div>
                    <div className='w-full lg:w-1/2 py-16 px-12' >
                        <h2 className='text-3xl mb-4'>Edit your: <br />'{reminder.title}' reminder.</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='mt-5'>
                                <input type="text" value={reminder.title} name="title" className='border border-gray-400 py-1 px2-2 w-full' onChange={handleChange} />
                            </div>
                            <div className='grid grid-cols-2  gap-5'>
                                <select name="category" value={reminder.category} className='border border-gray-400 py-1 px2-2 mt-5' onChange={handleChange}>
                                    <option value='' disabled selected>Select Category</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                                    ))}
                                </select>
                                <select className='border border-gray-400 py-1 px2-2 mt-5' value={reminder.priority} name="priority" onChange={handleChange}>
                                    <option value='' disabled selected>Select Priority</option>
                                    {priority.map((level, index) => (
                                        <option key={index} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)} Priority</option>
                                    ))}
                                </select>
                            </div>
                            <div className='mt-5'>
                                <input type="text" value={reminder.description} name="description" onChange={handleChange} className='border border-gray-400 py-1 px2-2 w-full' />
                            </div>
                            <div className='mt-5'>
                                <input type="text" value={reminder.location} name="location" onChange={handleChange} className='border border-gray-400 py-1 px2-2 w-full' />
                            </div>
                            <div className='mt-5'>
                                <input type="text" value={reminder.image} name="image" onChange={handleChange} className='border border-gray-400 py-1 px2-2 w-full' />
                            </div>
                            {/* <div className='grid grid-cols-2 gap-  mt-5'>
                                <p className='py-1 px2-2 pl-5 ' style={{ color: 'gray' }}>Remind me on:</p>
                                <input type="date" value={new Date(reminder.remindOn).toISOString().split('T')[0]} name="remindOn" onChange={handleChange} className='border border-gray-400 py-1 px2-2' />
                            </div> */}
                            <div className='grid grid-cols-2 gap-  mt-5'>
                                <p className='py-1 px2-2 pl-5 ' style={{ color: 'gray' }}>Deadline:</p>
                                <input type="date" value={new Date(reminder.deadline).toISOString().split('T')[0]} name="deadline" onChange={handleChange} className='border border-gray-400 py-1 px2-2' />
                            </div>
                            <div className='mt-5'>
                                <button className='w-full py-3 rounded-xl text-center text-white' style={{ background: 'linear-gradient(135deg, rgb(82, 229, 231) 10%, rgb(19, 12, 183) 100%)' }} > Update!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Update