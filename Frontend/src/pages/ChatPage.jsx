import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { useChatStore } from "../store/useChatStore";
import ActiveTabSwitch from "./../components/ActiveTabSwitch";
import ProfileHeader from "./../components/ProfileHeader";
import ChatsList from "./../components/ChatsList";
import ContactList from "./../components/ContactList";
import ChatContainer from "./../components/ChatContainer";
import NoConversationPlaceholder from "./../components/NoConversationPlaceholder";
import { ListX, Menu } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

function ChatPage() {
  const { activeTab, selectedUser, toggleSpreadChat, spreadChat } =
    useChatStore();

  useEffect(() => {
    if (selectedUser && window.innerWidth < 768) {
      toggleSpreadChat(false);
    }
  }, [selectedUser, toggleSpreadChat]);

  return (
    <div className="relative w-full min-w-50 max-w-5xl h-160 md:h-155">
      <BorderAnimatedContainer>
        {/* LEFT SIDE */}

        <div className="hidden md:min-w-70 md:max-w-75 md:flex-1 bg-slate-800/50 backdrop-blur-sm md:flex flex-col">
          <ProfileHeader />
          <ActiveTabSwitch />

          <div className="flex-1 overflow-y-auto px-4 space-y-2">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        <div
          className={`${
            selectedUser ? "hidden sm:flex " : "md:hidden flex"
          }md:hidden bg-slate-800/50 backdrop-blur-sm  flex-col items-center mt-5 relative`}
        >
          {spreadChat ? (
            <motion.div
              className="flex flex-col flex-1"
              initial={{ width: "45px" }}
              animate={{ width: "300px" }}
              transition={{ duration: 0.5 }}
            >
              <ListX
                className="cursor-pointer hover:text-slate-600 flex-start absolute right-2  "
                onClick={() => {
                  toggleSpreadChat(false);
                }}
              />
              <ProfileHeader />
              <ActiveTabSwitch />

              <div className="flex-1 overflow-y-auto px-4 space-y-2 overscroll-contain">
                {activeTab === "chats" ? <ChatsList /> : <ContactList />}
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="flex flex-col items-center"
              initial={{ width: "300px" }}
              animate={{ width: "40px" }}
              transition={{ duration: 0.5 }}
            >
              <Menu
                className="cursor-pointer hover:text-cyan-800 "
                onClick={() => {
                  toggleSpreadChat(true);
                }}
              />
            </motion.div>
          )}
        </div>
        {/* RIGHT SIDE */}
        <div
          className={`min-w-50 flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm`}
        >
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage;
