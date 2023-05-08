import { useModal } from "../../context/Modal"
import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"

const CreateChannelModal = () => {
    const [channelName, setChannelName] = useState('');
    const [description, setDescription] = useState('');

    


    return (
        <>
            <h3>Create Channel</h3>
            <label>Channel Name
                <input
                    type="text"
                    value={channelName}
                    onChange={e => setChannelName(e.target.value)}
                    required
                />
            </label>
            <label>Channel Description
                <input
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />
            </label>
        </>

    )

}
export default CreateChannelModal
