
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, Sparkles, User, ArrowUpRight } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

export default function DotAIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Hi, I’m Dot AI. Tell me what you want to build and I’ll point you to the right DotByte service.',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = inputValue.trim();
    setInputValue('');
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("API key not found.");
      }

      const promptContext = `You are Dot AI, the professional, futuristic automated assistant for DotByte Systems, an engineering and digital agency founded by Devaan. You specialize in IoT, Web Apps, and Custom PCBs. Keep responses extremely concise (1-3 sentences maximum). DotByte Systems services: Website Plan (starts ₹1299), App Plan (starts ₹1699), Custom IoT Code (starts ₹399), Custom PCB Design (starts ₹499). Contact: WhatsApp +91 8921546426 or email dotdvn16@gmail.com. Respond to this user query: "${currentInput}"`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptContext }] }]
        })
      });

      const data = await response.json();
      const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, my neural networks are currently experiencing latency. Please try again.";

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "I’m temporarily offline. You can still reach the team at dotdvn16@gmail.com or on WhatsApp.",
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <div className={`floating-actions ${isOpen ? 'is-chat-open' : ''}`}>
        <a className="floating-portfolio" href="https://dotdvn.me" target="_blank" rel="noopener noreferrer" aria-label="Visit DOTDVN portfolio">
          <span className="portfolio-orbit" aria-hidden="true"><i/></span>
          <span className="portfolio-copy"><small>MADE BY</small><b>DOTDVN</b></span>
          <ArrowUpRight size={13}/>
        </a>
        <motion.button onClick={() => setIsOpen(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="dot-ai-launcher" aria-label="Open Dot AI assistant">
          <span className="dot-ai-launcher-pulse" aria-hidden="true"/>
          <Bot size={22}/><span>ASK DOT AI</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="dot-ai-panel"
            role="dialog"
            aria-label="Dot AI assistant"
          >
            <div className="dot-ai-header">
              <div className="dot-ai-identity"><div className="dot-ai-mark"><Bot size={18}/></div><div><h3>Dot AI <Sparkles size={13}/></h3><p><i/> PROJECT GUIDE / ONLINE</p></div></div>
              <button onClick={() => setIsOpen(false)} className="dot-ai-close" aria-label="Close Dot AI assistant"><X size={17}/></button>
            </div>

            <div className="dot-ai-context"><span>IDEA → DIRECTION → BUILD</span><small>Ask about services, pricing, or your next step.</small></div>

            <div className="dot-ai-messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`dot-ai-message ${msg.sender}`}>
                  <span className="dot-ai-avatar">{msg.sender === 'ai' ? <Bot size={13}/> : <User size={13}/>}</span>
                  <div>{msg.text}</div>
                </div>
              ))}
              
              {isTyping && (
                <div className="dot-ai-message ai typing"><span className="dot-ai-avatar"><Bot size={13}/></span><div>
                  {[0,.2,.4].map(delay=><motion.i key={delay} animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay }}/>)}</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="dot-ai-composer">
              {messages.length === 1 && <div className="dot-ai-suggestions">{['Which service fits my idea?','Show starting prices'].map(text=><button type="button" key={text} onClick={()=>setInputValue(text)}>{text}</button>)}</div>}
              <form onSubmit={handleSend}>
                <label className="sr-only" htmlFor="dot-ai-input">Ask Dot AI</label>
                <input id="dot-ai-input" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Describe what you want to build…" autoComplete="off"/>
                <button type="submit" disabled={!inputValue.trim() || isTyping} aria-label="Send message"><Send size={16}/></button>
              </form>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
