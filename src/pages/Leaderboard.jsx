import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Leaderboard = () => {

  const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("leaderboard")) || [];
    setData(stored.sort((a, b) => b.score - a.score));
  }, []);

  const confirmClear = () => {
  localStorage.removeItem("leaderboard");
  setData([]);
  setShowModal(false);
};
const cancelClear = () => {
  setShowModal(false);
};
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-br from-[#583156] via-[#9d6c9d] to-[#6d2c6c] p-6">
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
    border border-white/20 p-8 rounded-3xl 
    shadow-[0_0_40px_rgba(0,0,0,0.3)] 
    w-[380px] text-center">
      <h1 className="text-3xl font-bold mb-6">🏆 Leaderboard</h1>

      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 mb-6 scrollbar-hide">
        {data.length === 0 ? (
          <p className="text-[#DDC3C3]/80">Start your first quiz to appear here 🚀</p>
        ) : (
          data.map((item, index) => (
            <div key={index} className="p-4 rounded-xl bg-white/10 border border-white/20 text-left">
              <p className="font-semibold">🏅 Score: {item.score}</p>
              <p className="text-sm">📚 Category: {item.category}</p>
              <p className="text-xs opacity-70">{item.date}</p>
            </div>
          ))
        )}
      </div>
      
      <div className="flex gap-3">
  <button
    onClick={() => navigate("/")}
    className="flex-1 py-3 rounded-xl 
          bg-gradient-to-r from-[#6B3F69] to-[#A376A2] border border-white/20  
          hover:scale-105 transition font-semibold"
  >
    Home 🏠
  </button>

  <button
    onClick={() => setShowModal(true)}
    className="flex-1 py-3 rounded-xl 
          bg-gradient-to-r from-[#6B3F69] to-[#A376A2] border border-white/20  
          hover:scale-105 transition font-semibold"
  >
    Clear 🗑️
  </button>
</div>
</div>
{showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    
    <div className="bg-[#DDC3C3]/10 border border-white/20 p-6 rounded-2xl text-white w-[300px] text-center shadow-xl">

      <h2 className="text-xl font-bold mb-3">Clear Leaderboard?</h2>
      <p className="text-sm text-white/70 mb-5">
        This will remove all saved scores permanently.
      </p>

      <div className="flex gap-3">
        <button
          onClick={cancelClear}
          className="flex-1 py-2 rounded-xl bg-white/10 hover:scale-105 transition"
        >
          Cancel
        </button>

        <button
          onClick={confirmClear}
          className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#6B3F69] to-[#A376A2] hover:scale-105 transition"
        >
          Yes, Clear
        </button>
      </div>

    </div>

  </div>
)}
    </div>
  );
};

export default Leaderboard;