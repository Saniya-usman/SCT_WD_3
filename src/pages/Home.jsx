import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(false);
  const categories = [
    { name: "Tech", emoji: "💻" },
    { name: "General", emoji: "🧠" },
    { name: "Movies", emoji: "🎬" },
    { name: "Fun", emoji: "😂" },
    { name: "Cricket", emoji: "🏏" },
    { name: "Cartoons", emoji: "🧸" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-[#583156] via-[#9d6c9d] to-[#6d2c6c] 
    text-[#ffffff] relative overflow-hidden">

      
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <span
            key={i}
            className="absolute w-2 h-2 bg-[#ffffff]/70 rounded-full animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      
     <div className="relative backdrop-blur-xl 
bg-[#DDC3C3]/10 border border-white/20 
p-8 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.2)] 
w-[380px] text-center space-y-4">
        
        <h1 className="text-4xl font-bold ">Quizora</h1>
        <p className="text-[#dbd5d5]/70 mb-6">Think fast. Score higher. Rise on the leaderboard</p>

      
        <div className="grid grid-cols-2 gap-4 mb-8">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => {setSelected(cat.name);setError(false);}}
              className={`cursor-pointer p-4 rounded-xl transition transform hover:scale-105 border 
              ${
                selected === cat.name
                  ? "bg-[#774c75] border-[#F1F3E0]"
                  : "bg-[#F1F3E0]/10 border-white/20 hover:bg-[#F1F3E0]/20"
              }`}
            >
              <div className="text-2xl">{cat.emoji}</div>
              <p className="mt-2">{cat.name}</p>
            </div>
          ))}
        </div>

       
<div className="flex gap-3">
  <button
    onClick={() => {
      if (!selected) {
        setError(true);
        return;
      }
      navigate("/quiz", { state: { category: selected } });
    }}
    className="flex-1 py-3 rounded-xl 
    bg-gradient-to-r from-[#6B3F69] to-[#A376A2] border border-white/20 
    hover:scale-105 transition font-semibold shadow-lg"
  >
    Start Quiz 🚀
  </button>

  <button
    onClick={() => navigate("/leaderboard")}
    className="flex-1 py-3 rounded-xl border border-white/20 
    bg-gradient-to-r from-[#6B3F69] to-[#A376A2] 
    hover:scale-105 transition font-semibold shadow-lg"
  >
    Leaderboard 🏆
  </button>
</div>

        {error && (
  <p className="text-sm text-[#2e0e2c] font-bold mt-3 animate-pulse">
    Please select a category
  </p>
)}
      </div>

     
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); opacity: 0.5; }
            50% { transform: translateY(-20px); opacity: 1; }
            100% { transform: translateY(0px); opacity: 0.5; }
          }
        `}
      </style>
    </div>
  );
};

export default Home;