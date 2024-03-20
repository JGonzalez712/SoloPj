import { React, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateRemainder = () => {

    const priority = ['High', 'Normal', 'Low']
    const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Meeting', 'Study', 'Exercise'];

    const navigate = useNavigate()

    const [errors, setErrors] = useState({})//this will handle validation

    const [reminder, setReminder] = useState({
        title: "",
        category: "",
        priority: "",
        description: "",
        location: "",
        image:"",
        remindOn: new Date(),
        deadline: new Date()
    })

    const handleChange = (e) => {
        setReminder({ ...reminder, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/reminders', reminder)
            .then((response) => {
                console.log(response)
                navigate("/reminders")
            })
            .catch((error) => {
                console.log(error)
                setErrors(error.response.data.errors) //this handles errors validations
            })
    }


    return (
        <div className='min-h-screen py-40' style={{ backgroundImage: 'linear-gradient(115deg, #e1f4f3, #333333  )', }}>
            <div className='container mx-auto'>
                <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
                    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url('/src/images/bam.jpg')" }}>
                        <h1 className='text-white text-8xl mb-8'><span style={{ fontFamily: ' lucida handwriting' }}>Jenny!</span></h1>
                        <div>
                            <p className='text-white'>Welcome to Jenny!, your personal reminder assistant! Stay organized and never miss an important task or event again with our intuitive reminder app. </p>
                        </div>
                    </div>
                    <div className='w-full lg:w-1/2 py-16 px-12'>
                        <h2 className='text-3xl mb-4'>Set A Reminder!</h2>
                        <p className='mb-4'>Start your journey with Jenny today and experience the freedom of a more organized and productive life. </p>
                        <form onSubmit={handleSubmit}>
                            <div className='mt-5'>
                                <input type="text" placeholder='Title' name="title" className='border border-gray-400 py-1 px2-2 w-full' onChange={handleChange} />
                                <p style={{ color: "red" }}>{errors.description ? errors.description.message : null}</p>
                            </div>
                            <div className='grid grid-cols-2  gap-5'>
                                <select name="category" className='border border-gray-400 py-1 px2-2 mt-5' onChange={handleChange}>
                                    <option value=''  disabled selected>Select Category</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                                    ))}
                                </select>
                                <select className='border border-gray-400 py-1 px2-2 mt-5' name="priority" onChange={handleChange}>
                                    <option value=''  disabled selected>Select Priority</option>
                                    {priority.map((level, index) => (
                                        <option key={index} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)} Priority</option>
                                    ))}
                                </select>
                            </div>
                            <div className='mt-5'>
                                <input type="text" placeholder='Description' name="description" onChange={handleChange} className='border border-gray-400 py-1 px2-2 w-full' />
                                <p style={{ color: "red" }}>{errors.description ? errors.description.message : null}</p>
                            </div>
                            <div className='mt-5'>
                                <input type="text" placeholder='Location' name="location" onChange={handleChange} className='border border-gray-400 py-1 px2-2 w-full' />
                            </div>
                            <div className='mt-5'>
                                <input type="text" placeholder='Image' name="image" onChange={handleChange} className='border border-gray-400 py-1 px2-2 w-full' />
                            </div>
                            {/* <div className='grid grid-cols-2 gap-  mt-5'>
                                <p className='py-1 px2-2 pl-5 ' style={{ color: 'gray' }}>Remind me on:</p>
                                <input type="date" value={reminder.remindOn} name="remindOn" onChange={handleChange} className='border border-gray-400 py-1 px2-2' />
                            </div> */}
                            <div className='grid grid-cols-2 gap-  mt-5'>
                                <p className='py-1 px2-2 pl-5 ' style={{ color: 'gray' }}>Deadline:</p>
                                <input type="date" value={reminder.deadline} name="deadline" onChange={handleChange} className='border border-gray-400 py-1 px2-2' />
                            </div>
                            <div className='mt-5'>
                                <button className='w-full py-3 rounded-xl text-center text-white' style={{ background:'linear-gradient(109.6deg, rgb(5, 85, 84) 11.2%, rgb(64, 224, 208) 91.1%)' }} > Remind me!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreateRemainder