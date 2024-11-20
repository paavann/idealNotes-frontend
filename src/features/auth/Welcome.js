import React from 'react'




const Welcome = () => {

    const date = new Date()
    const today = Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className='welcome'>
            <h1>Welcome</h1>
            <p><link to='/dash/notes' />View idealNotes</p>
            <p><link to='/dash/users' />View User Details</p>
        </section>
    )


  return content
}




export default Welcome