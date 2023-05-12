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

  const onClick = async (e) => {
    e.preventDefault()
      if(!reactionId) {
        const newReaction = await dispatch(addReactionThunk(reaction, messageId, userId))
        socket.emit('chat', newReaction)
        closeModal()
      } else {
      if(reactionId){
        await dispatch(removeReactionThunk(reactionId, messageId))
        socket.emit('chat', 'DELETED')
        closeModal()
      }
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
