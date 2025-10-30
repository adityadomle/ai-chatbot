import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

function Bot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    try {
      // ✅ Use your backend endpoint (Render / local)
      const res = await axios.post(
        "https://ai-chatbot-backend.onrender.com/bot/v1/message",
        { text: input }
      );

      if (res.status === 200) {
        setMessages((prev) => [
          ...prev,
          { text: res.data.userMessage, sender: "user" },
          { text: res.data.botMessage, sender: "bot" },
        ]);
      }
    } catch (error) {
      console.error("❌ Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { text: input, sender: "user" },
        { text: "⚠️ Server error! Please try again later.", sender: "bot" },
      ]);
    }

    setInput("");
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0d0d0d] via-[#111111] to-[#1a1a1a] text-white font-sans">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full border-b border-gray-800 backdrop-blur-md bg-[#0d0d0d]/80 z-10">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            BotSpoof
          </h1>
          <FaUserCircle
            size={32}
            className="cursor-pointer text-gray-300 hover:text-green-400 transition-colors"
          />
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto pt-20 pb-28">
        <div className="w-full max-w-3xl mx-auto px-4 flex flex-col space-y-3">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 text-lg mt-20">
              👋 Welcome to{" "}
              <span className="text-green-400 font-semibold">BotSpoof</span>. <br />
              Start chatting below!
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`px-4 py-3 rounded-2xl max-w-[75%] ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-600 to-green-600 text-white self-end shadow-md"
                      : "bg-gray-800/70 backdrop-blur-md text-gray-100 self-start shadow"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {loading && (
                <div className="bg-gray-700/60 px-4 py-2 rounded-xl max-w-[50%] self-start animate-pulse">
                  Bot is typing...
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </main>

      {/* Input */}
      <footer className="fixed bottom-0 left-0 w-full border-t border-gray-800 bg-[#0d0d0d]/90 backdrop-blur-md z-10">
        <div className="max-w-3xl mx-auto flex justify-center px-4 py-4">
          <div className="w-full flex bg-gray-900/70 backdrop-blur-lg rounded-full px-4 py-2 shadow-lg border border-gray-700">
            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 px-2"
              placeholder="Ask BotSpoof..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:scale-105 px-5 py-2 rounded-full text-white font-medium transition-all shadow-md"
            >
              Send
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Bot;
