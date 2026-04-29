import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state;

const score = state?.score ?? 0;
const total = state?.total ?? 0;
const category = state?.category ?? "Unknown";
useEffect(() => {
  if (score === undefined || total === undefined) {
    navigate("/");
  }
}, [score, total, navigate]);

 const percentage = total ? Math.round((score / total) * 100) : 0;

 
  let caption = "";
  if (percentage === 100) {
    caption = "🔥 Excellent! Perfect Score!";
  } else if (percentage >= 80) {
    caption = "👏 Great job! You did amazing!";
  } else if (percentage >= 50) {
    caption = "🙂 Good effort! Keep improving!";
  } else {
    caption = "💪 Don't worry! Try again and improve!";
  }

  
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = percentage / 100;
  const strokeDashoffset = circumference - progress * circumference;

  useEffect(() => {
  if (score === undefined || total === undefined || !category) return;

  const existing = JSON.parse(localStorage.getItem("leaderboard")) || [];

  const newEntry = {
    score,
    total,
    category,
    percentage: Math.round((score / total) * 100),
    date: new Date().toLocaleString(),
  };

  existing.push(newEntry);
  localStorage.setItem("leaderboard", JSON.stringify(existing));
}, []);

  
  const handleTryAgain = () => {
    sessionStorage.removeItem("quiz_saved");

    navigate("/quiz", {
      state: { category }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-[#583156] via-[#9d6c9d] to-[#6d2c6c] 
    text-[#ffffff] p-6">

     
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
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

      
      <div className="relative backdrop-blur-xl bg-[#DDC3C3]/10 
      border border-white/20 p-10 rounded-3xl 
      shadow-[0_0_40px_rgba(0,0,0,0.3)] 
      w-[380px] text-center">

       
        <h1 className="text-3xl font-bold mb-4">🎉 Quiz Completed</h1>

        
        <div className="relative flex items-center justify-center mb-4">
          <svg width="220" height="220">
            <circle
              cx="110"
              cy="110"
              r={radius}
              stroke="#ffffff20"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="110"
              cy="110"
              r={radius}
              stroke="#DDC3C3"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 110 110)"
              className="transition-all duration-700"
            />
          </svg>

          <span className="absolute text-3xl font-bold">
            {percentage}%
          </span>
        </div>

        <p className="text-sm text-[#DDC3C3]/90 mb-2">
          Category: {category}
        </p>

        <p className="text-sm font-semibold mb-4">
          {caption}
        </p>

        <p className="mb-6 text-lg">
          You scored <span className="font-semibold">{score}</span> / {total}
        </p>

        <div className="space-y-3">

          <div className="flex gap-3">
            <button
              onClick={handleTryAgain}
              className="flex-1 py-3 rounded-xl 
              bg-gradient-to-r from-[#6B3F69] to-[#A376A2] border border-white/20 
              hover:scale-105 transition font-semibold"
            >
              Try Again
            </button>

            <button
              onClick={() => {
                sessionStorage.removeItem("quiz_saved");
                navigate("/");
              }}
              className="flex-1 py-3 rounded-xl 
             bg-gradient-to-r from-[#6B3F69] to-[#A376A2] border border-white/20  
              hover:scale-105 transition font-semibold"
            >
              Home
            </button>
          </div>

          <button
            onClick={() => navigate("/leaderboard")}
            className="w-full py-3 rounded-xl 
            bg-gradient-to-r from-[#6B3F69] to-[#A376A2] border border-white/20  
            hover:scale-105 transition font-semibold"
          >
            Leaderboard 🏆
          </button>

        </div>
      </div>
    </div>
  );
};

export default Result;