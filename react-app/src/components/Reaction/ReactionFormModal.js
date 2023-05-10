import { useModal } from "../../context/Modal"
import Reaction from './index';

const ReactionFormModal = () => {
    let emojis = ["👍🏻", "👎🏻", "😂"];



    const onClick = (e) => {
        e.preventDefault()

    }

    return (
        <>
            <div>
                <h2>Choose Reaction</h2>
                {emojis.map(emoji =>
                  <button
                    onClick={onClick}
                  >{emoji}</button>
                )}

            </div>


        </>

    )
}


export default ReactionFormModal
