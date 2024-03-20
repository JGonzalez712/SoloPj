import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns';
import { NavLink } from 'react-router-dom';

export const DisplayAll = () => {

    const people = [
        {
            name: 'Leslie Alexander',
            email: 'leslie.alexander@example.com',
            role: 'Co-Founder / CEO',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: '3h ago',
            lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
            name: 'Michael Foster',
            email: 'michael.foster@example.com',
            role: 'Co-Founder / CTO',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: '3h ago',
            lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
            name: 'Dries Vincent',
            email: 'dries.vincent@example.com',
            role: 'Business Relations',
            imageUrl:
                'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: null,
        },
        {
            name: 'Lindsay Walton',
            email: 'lindsay.walton@example.com',
            role: 'Front-end Developer',
            imageUrl:
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: '3h ago',
            lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
            name: 'Courtney Henry',
            email: 'courtney.henry@example.com',
            role: 'Designer',
            imageUrl:
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: '3h ago',
            lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
            name: 'Tom Cook',
            email: 'tom.cook@example.com',
            role: 'Director of Product',
            imageUrl:
                'https://assets-global.website-files.com/62d539593504f1e73d2c19b6/62f0c2de80308532f2f8195c_628dffe1c9fabab08f11fd85_understand%2520the%2520type%2520of%2520client%2520meeting.png',
            lastSeen: null,
        },
    ]

    const [reminders, setReminders] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/reminders')
            // .then((response) => {
            //     console.log(response)
            //     setReminders(response.data)
            // })
            .then((response) => {
                const sortedReminders = response.data.sort((a, b) => {
                    return new Date(a.deadline) - new Date(b.deadline);
                });
                setReminders(sortedReminders);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const handleOnClick = (reminderId) => {
        navigate(`/reminders/${reminderId}/show`)
    }

    return (
        <div className='min-h-screen' style={{ backgroundImage: 'linear-gradient(115deg, #e1f4f3, #333333  )', }}>
            <div className='mainPage'>
                <div className="navbar">
                    <Link  className='thisLink' to={`/reminders`}>Home</Link>
                    <Link className='thisLink' to={`/`}>Add A Reminder</Link>
                </div>
                <div className='mainContent'>
                    <div className='listItems '>
                        <ul role="list" className="divide-y divide-gray-100 ">
                            {reminders.map((reminder) => (
                                <li key={reminder.description} className=" flex justify-between  gap-x-6 py-7 myDiv" onClick={() => handleOnClick(reminder._id)}>
                                    <div className="flex min-w-0 gap-x-4 ">
                                        <img className="h-28 w-28 flex-none rounded-full bg-gray-50" src={reminder.image} alt="" />
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-xl font-semibold leading-6 text-gray-900">{reminder.title}</p>
                                            <p className="mt-1 truncate text-lg leading-5 text-gray-800">{reminder.description}</p>
                                            <p className="mt-1 truncate text-base leading-5 text-gray-800 mt-2 ml-5 mb-2"><span style={{ fontStyle: 'italic' }}>Due date: </span>{format(new Date(reminder.deadline), 'MMM d, yyyy')}</p>
                                        </div>
                                    </div>
                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                        <p className={`text-m text-white leading-6 text-gray-900 ${reminder.priority === "High" ? 'priorityLevel1' : reminder.priority === "Normal" ? 'priorityLevel2' : 'priorityLevel3'}`}>{reminder.priority}</p>
                                        {/* {person.lastSeen ? (
                                            <p className="mt-1 text-s leading-5 text-gray-700">
                                                Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                                            </p>
                                        ) : (
                                            <div className="mt-1 flex items-center gap-x-1.5">
                                                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                </div>
                                                <p className="text-xs leading-5 text-gray-500">Online</p>
                                            </div>
                                        )} */}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DisplayAll
