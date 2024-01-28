import styled from "styled-components"
import { useState} from "react"
import {NotificationManager} from "react-notifications"
import NotificationContainer from "react-notifications/lib/NotificationContainer"

function EditPost(props) {

    const [description, setDescription] = useState(props.post.description)

    const editPostHandler = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:8000/api/posts/'+props.post.id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                description,
            })
        })
        let responseData = await response.json()
        if(response.status === 200) {
            NotificationManager.success(responseData.message, 'Operation completed successfully.', 2000)
            props.onClose(responseData.data.post)
        }
        if(response.status === 422)
            NotificationManager.warning(responseData.message, 'Invalid data warning.', 2000)
        if(response.status === 500)
            NotificationManager.error(responseData.message, 'Internal server error.', 2000)
    }

    return (
        <EditProfileContainer>
            <NotificationContainer/>
            <div className="editProfileWrapper">
                <div className="editProfileLeft">
                    <label className="fileupload" htmlFor="file">
                        <img
                          src={props.post.image}
                          alt=""
                          className="editProfileLeftImg"
                        />
                    </label>
                </div>
                <div className="editProfileRight">
                    <form className="editProfileBox" onSubmit={editPostHandler} noValidate={true}>
                        <div className="editProfileBoxInput">
                            <input
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                                value={description}
                                required
                                type="textarea"
                                className="BoxInput"
                                placeholder="Descrizione..."
                            />
                        </div>
                        <div className="editProfileBoxInput">
                            <button className="editProfileButton"> Save </button>
                        </div>
                    </form>
                </div>
            </div>
        </EditProfileContainer>
    )
}

const EditProfileContainer = styled.div`
    padding: 9px;

    .editProfileLeftImg {
        width: 150px;
        display: block;
    }

    .editProfileWrapper {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-direction: column;
    }

    .editProfileBox {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        background-color: white;
        padding: 20px;
    }
    .editProfileBoxInput {
        padding-bottom: 10px;
    }
    .BoxInput {
        height: 30px;
        border-radius: 5px;
        border: 1px solid gray;
        font-size: 18px;
        padding-left: 10px;
    }
    .editProfileButton {
        height: 30px;
        border-radius: 10px;
        border: none;
        background-color: black;
        color: white;
        font-size: 16px;
        padding: 0 20px;
        cursor: pointer;
    }
    .shareOptionText {
        height: 20px;
        border-radius: 10px;
        border: none;
        background-color: #3b3b3b;
        color: white;
        font-size: 16px;
        padding: 0 20px;
        cursor: pointer;
    }
    .fileupload {
        cursor: pointer;
        display: flex;
        flex-direction: column;
    } 
`

export default EditPost
