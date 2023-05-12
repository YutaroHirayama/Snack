import Reaction from './index';

const ReactionFormModal = ({message, socket}) => {
    let emojis = ["👍🏻", "👎🏻", "😂", "💩", "🇺🇸", "🇯🇵", "🇰🇬", "🇲🇩", "😍", "🤌🏻", "🙏🏻", "❤️", "😎"];

    return (
        <div>
            <h2>Choose Reaction</h2>
            {emojis.map(emoji =>
                <Reaction reaction={emoji} message={message} socket={socket}/>
            )}
        </div>
    )
}

export default ReactionFormModal
