import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import { SmilePlus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
    updateReaction,
    subscribeToReaction,
    unsubscribeFromReaction,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const prevMessageCount = useRef(messages.length);
  const [activeReaction, setActiveReaction] = useState(false);
  const [activeMessageId, setActiveMessageId] = useState(null);
  const Reactions = [
    { emoji: "👍", type: "like" },
    { emoji: "❤️", type: "love" },
    { emoji: "😂", type: "laugh" },
    { emoji: "😢", type: "sad" },
  ];

  useEffect(() => {
    if (!selectedUser?._id) return;
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    //clean up
    return () => unsubscribeFromMessages();
  }, [
    selectedUser,
    getMessagesByUserId,
    subscribeToMessages,
    unsubscribeFromMessages,
    selectedUser?._id,
  ]);

  useEffect(() => {
    if (messages.length > prevMessageCount.current) {
      messageEndRef.current?.scrollIntoView({ behavior: "auto" });
    }

    prevMessageCount.current = messages.length;
  }, [messages.length]);

  useEffect(() => {
    subscribeToReaction();

    return () => unsubscribeFromReaction();
  }, [subscribeToReaction, unsubscribeFromReaction]);

  const animationProps = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { type: "spring", stiffness: 800, damping: 20, mass: 0.5 },
  };

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat  ${
                  msg.senderId === authUser._id ? "chat-end" : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble rounded-t-xl relative ${
                    msg.senderId === authUser._id
                      ? "bg-cyan-800 text-white rounded-bl-xl"
                      : "bg-slate-700 text-slate-200 rounded-br-xl"
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Shared"
                      className="rounded-lg h-48 object-cover"
                    />
                  )}
                  {msg.text && (
                    <p className="mt-1" dir="auto">
                      {msg.text}
                    </p>
                  )}
                  <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  {msg.senderId !== authUser._id ? (
                    <div
                      className="absolute -bottom-3 -right-2 cursor-pointer"
                      onClick={() => {
                        setActiveMessageId(msg._id);
                        setActiveReaction((prev) => !prev);
                      }}
                    >
                      <AnimatePresence mode="wait">
                        {activeReaction && activeMessageId === msg._id && (
                          <motion.div
                            key="reaction-bar"
                            {...animationProps}
                            className="absolute z-10 -bottom-10 -right-10 p-2 bg-slate-800 gap-2 rounded-2xl flex shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {Reactions.map((emoji) => (
                              <motion.span
                                key={emoji.type}
                                {...animationProps}
                                whileHover={{ scale: 1.5 }}
                                whileTap={{ scale: 1.2 }}
                                className="text-lg cursor-pointer select-none"
                                onClick={() => {
                                  updateReaction(msg._id, emoji.type);
                                  setActiveReaction(false);
                                }}
                              >
                                {emoji.emoji}
                              </motion.span>
                            ))}
                          </motion.div>
                        )}

                        {!activeReaction || activeMessageId !== msg._id ? (
                          <motion.div key="smile-container" {...animationProps}>
                            {msg.reaction ? (
                              <motion.span
                                key="current-reaction"
                                {...animationProps}
                                whileHover={{ scale: 1.25 }}
                                whileTap={{ scale: 0.9 }}
                                className="cursor-pointer"
                                title="Remove reaction"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateReaction(msg._id, null);
                                }}
                              >
                                {
                                  Reactions.find(
                                    (one) => one.type === msg.reaction
                                  )?.emoji
                                }
                              </motion.span>
                            ) : (
                              <motion.span key="smileplus" {...animationProps}>
                                <SmilePlus size={17} />
                              </motion.span>
                            )}
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="absolute -bottom-3 -left-2">
                      {
                        Reactions.find((one) => one.type === msg.reaction)
                          ?.emoji
                      }
                    </div>
                  )}
                </div>
              </div>
            ))}
            {/* 👇 scroll target */}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullname} />
        )}
      </div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;
