import React from 'react'
import { useSelector } from 'react-redux'
import { selectNotesById } from './notesApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'




const Note = ({ noteId }) => {

    const note = useSelector(state => selectNotesById(state, noteId))
    const navigate = useNavigate()

    if (note) {
        const created = new Date(note.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'long' })
        const updated = new Date(note.updatedAt).toLocaleString('en-IN', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/notes/${noteId}`)

        return (
            <tr className='table___row'>
                <td className='table__cell note__status'>
                    {note.completed ? <span className='note__status--completed'>Completed</span> : <span className='note__status--open'>Open</span>}
                </td>
                <td className='table__cell note__created'>{created}</td>
                <td className='table__cell note__updated'>{updated}</td>
                <td className='table__cell note__title'>{note.title}</td>
                <td className='table__cell note__username'>{note.username}</td>

                <td className='table__cell'>
                    <button
                        className='icon-button table__button'
                        onClick={handleEdit} 
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )
    } else {
        return null
    }
}

export default Note
