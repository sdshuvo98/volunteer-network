import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Event from './Event/Event';

const Events = () => {
    const [events, setEvents] = useState([])
    useEffect(() => {
        (async () => {
            const { data } = await axios.get('http://localhost:5000/registered')
            setEvents(data)
        })()
    }, [])

    const handleCancel = async (id) => {
        await axios.delete(`http://localhost:5000/registered/${id}`)
            .then(data => {
                const permission = window.confirm("Are you sure to Cancel?")
                if (permission) {
                    console.log(data)
                    const remaining = events.filter(event => event._id !== id)
                    setEvents(remaining)
                }
            })
    }


    return (
        <div className='my-10'>
            <section className='px-[150px] grid grid-cols-2 gap-5'>
                {
                    events.map(getEvent => <Event key={getEvent._id} getEvent={getEvent} handleCancel={handleCancel} />)
                }
            </section>
        </div>
    );
};

export default Events;