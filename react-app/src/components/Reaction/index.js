import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addReactionThunk } from "../../store/channels";

const Reaction = ({reaction, count, messageId}) => {
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
          >{reaction} {count}</button>
        </>
    )
}

export default Reaction
