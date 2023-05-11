import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addReactionThunk, removeReactionThunk } from "../../store/channels";

const Reaction = ({reaction, count, message}) => {
  // const messageState = useSelector(state => state.channels?.currentChannel?.channel?.messages?.messageId)
  // const reactionState = messageState?.reactions?.
  const sessionUser = useSelector((state) => state.session.user)
  const [used, setUsed] = useState(false)
  const dispatch = useDispatch()
  console.log("123", message)

  const messageId = message.id
  const userId = sessionUser.id

  // console.log(check)


  //const {userId = message

  const onClick = (e) => {
    e.preventDefault()
      let check = message.reactions.find(reaction => reaction.userId === userId && reaction.messageId === message.id && reaction.reaction === reaction)
      if (check) {
        setUsed(true)
      } else {
        setUsed(false)
      }
      if(used === false) {
        dispatch(addReactionThunk(reaction, messageId, userId))
        setUsed(true)
      } else {
        dispatch(removeReactionThunk(reaction))
        setUsed(false)
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
