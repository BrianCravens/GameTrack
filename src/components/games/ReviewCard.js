import React, { useEffect, useState } from "react";
import Modal from 'react-modal'
import '../games/GameDetail.css';
import GameManager from '../../modules/GameManager'

const ReviewCard = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState({})
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [review, setReview] = useState({})
    const getUsername = (id) => {
        GameManager.getUserId(id).then(user => {
            setUsername(user)
        })
    }
    const handleFieldChange = (event) => {
        const stateToChange = {...review}
        stateToChange[event.target.id] = event.target.value;
        setReview(stateToChange)
    }

    const handleDelete = (id) => {
        setIsLoading(true)
        GameManager.deleteReview(id)
    }

    const handleEdit = (event) => {
        event.preventDefault()
        setIsLoading(true)

        const editedReview ={ 
        userId: props.review.userId,
        name: props.review.name,
        id: props.review.id,
        gameApiId: props.review.gameApiId,
        description: review.description
        }
        GameManager.updateReview(editedReview)
            .then(() => setModalIsOpen(false))
            props.history.push(`/games/${props.gameId}`)
        setIsLoading(false)

    }

    useEffect(() => {
        getUsername(props.review.userId)
    },[])


    return(
        <div className= "reviews-container">
            <h3 className="review-user">{username.username}</h3>
        <div className = "review-content">
        {props.review.description}
        </div>
        <div>
        <button className = "review-edit" id= {"edit--" + props.review.id} onClick = {() => setModalIsOpen(true)} >Edit</button>
        <button className = "review-delete" disabled={isLoading} id= {"delete--" + props.review.id} onClick = {() => handleDelete(props.review.id)}>Delete</button>
        </div>
        <Modal className="modal-container" isOpen={modalIsOpen} onRequestClose = {() => setModalIsOpen(false)}>
            <textarea id = "description" className="modal-textarea" onChange= {handleFieldChange} defaultValue={props.review.description}></textarea>
            <button className="modal-close" onClick = {handleEdit}>Save</button>
        </Modal>
        </div>
    )
}
export default ReviewCard