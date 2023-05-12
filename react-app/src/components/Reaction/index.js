import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addReactionThunk, removeReactionThunk } from "../../store/channels";
import { useModal } from "../../context/Modal";

const Reaction = ({reaction, count, message, socket}) => {

  const sessionUser = useSelector((state) => state.session.user)
  const [used, setUsed] = useState(false)
  const dispatch = useDispatch()
  const { closeModal } = useModal()

  const messageId = message.id
  const userId = sessionUser.id
  let existingReaction = message?.reactions?.find(r => r.userId === userId && r.reaction === reaction)
  let reactionId = existingReaction?.id
  let reactionClick = false


  const onClick = async (e) => {
    e.preventDefault()
    reactionClick = true
      if(!reactionId) {
        const newReaction = dispatch(addReactionThunk(reaction, messageId, userId))
          .then(() => socket.emit('chat', newReaction))
          .then(() => closeModal())
      } else {
      if(reactionId){
        dispatch(removeReactionThunk(reactionId, messageId))
          .then(() => socket.emit('chat', 'DELETED'))
          .then(() => closeModal())
      }
     }
     reactionClick = false
  }
    return (
        <>
          <button disabled={reactionClick}
            onClick={onClick}
          >{reaction} {count}</button>
        </>
    )
}
export default Reaction
