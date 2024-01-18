import Topbar from "../Topbar/Topbar";
import ChatList from "../ChatList";
import Conversation from "../Conversation";

function Messages() {
    return(
        <>
            <Topbar/>
            <>
                <ChatList/>
                <Conversation/>
            </>
        </>
    )
}
export default Messages;