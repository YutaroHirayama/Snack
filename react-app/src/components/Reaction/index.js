import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addReactionThunk } from "../../store/channels";

const Reaction = ({reaction, messageId}) => {
  // const messageState = useSelector(state => state.channels?.currentChannel?.channel?.messages?.messageId)
  // const reactionState = messageState?.reactions?.

  const [used, setUsed] = useState(false)
  const dispatch = useDispatch()

    const onClick = (e) => {
        e.preventDefault()
        if(used === false) {
          dispatch(addReactionThunk(reaction, messageId))
          setUsed(true)
        // } else {
        //   dispatch(removeReactionThunk(reaction))
        //   setUsed(false)
        }


    }

    return (
        <>
          <button
            onClick={onClick}
          >{reaction.reaction}</button>
        </>
    )
}

export default Reaction
