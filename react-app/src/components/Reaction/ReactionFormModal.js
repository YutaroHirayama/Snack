import Reaction from './index';
import "./ReactionFormModal.css"

const ReactionFormModal = ({ message }) => {
    let emojis = ["👍🏻", "👎🏻", "😂", "💩", "🇺🇸", "🇯🇵", "🇰🇬", "🇲🇩", "😍", "🤌🏻", "🙏🏻", "❤️", "😎"];

    return (
        <div className='reaction-form-modal'>
            <h2>Choose Reaction</h2>
            {emojis.map(emoji =>
                <Reaction reaction={emoji} message={message} />
            )}
        </div>
    )
}

export default ReactionFormModal
