import { useState } from "react";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!question.trim()) return;

    const userMessage = { type: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/ask-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
      });

      const data = await response.json();

      const aiMessage = {
        type: "ai",
        text: data.answer
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { type: "ai", text: "⚠ Error contacting AI service." }
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-cyan-500 text-black font-bold w-14 h-14 rounded-full shadow-lg hover:scale-110 transition"
      >
        AI
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl flex flex-col">

          {/* Header */}
          <div className="p-4 border-b border-slate-700 text-cyan-400 font-semibold">
            SentinelAI Assistant
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm text-white">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  msg.type === "user"
                    ? "bg-cyan-600 text-black self-end"
                    : "bg-slate-800"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="text-gray-400 animate-pulse">
                AI is thinking...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-700 flex gap-2">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about threats..."
              className="flex-1 bg-slate-800 text-white px-3 py-2 rounded-md outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-cyan-500 px-3 py-2 rounded-md font-semibold text-black"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}