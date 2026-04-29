import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useEffect, useState } from "react";

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const category = location.state?.category;
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15);

  if (!category) {
    navigate("/");
    return null;
  }

  
  const questionsData = {
  Tech: [
  { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool Multi Language", "Hyperlinks Text Mark Language"], answer: "Hyper Text Markup Language" },
  { question: "Which language is used for styling web pages?", options: ["HTML", "JQuery", "CSS", "XML"], answer: "CSS" },
  { question: "Which language is used for web development logic?", options: ["Python", "Java", "JavaScript", "C++"], answer: "JavaScript" },
  { question: "Which tag is used to create a link in HTML?", options: ["<a>", "<link>", "<href>", "<url>"], answer: "<a>" },
  { question: "Which company developed React?", options: ["Google", "Facebook", "Microsoft", "Amazon"], answer: "Facebook" },
  { question: "Which hook is used for state in React?", options: ["useEffect", "useState", "useRef", "useMemo"], answer: "useState" },
  { question: "Which hook is used for side effects?", options: ["useState", "useEffect", "useRef", "useContext"], answer: "useEffect" },
  { question: "What is the full form of CSS?", options: ["Cascading Style Sheets", "Color Style Sheets", "Creative Style Sheets", "Computer Style Sheets"], answer: "Cascading Style Sheets" },
  { question: "Which symbol is used for comments in JavaScript?", options: ["//", "<!-- -->", "#", "**"], answer: "//" },
  { question: "Which method is used to print in console?", options: ["console.print()", "print()", "console.log()", "log.console()"], answer: "console.log()" },
  { question: "Which data type is used for true/false?", options: ["String", "Boolean", "Number", "Array"], answer: "Boolean" },
  { question: "Which keyword is used to declare variable in JS?", options: ["var", "let", "const", "All of these"], answer: "All of these" },
  { question: "Which operator is used for equality check?", options: ["=", "==", "===", "Both == and ==="], answer: "Both == and ===" },
  { question: "Which is a JavaScript framework/library?", options: ["React", "HTML", "CSS", "SQL"], answer: "React" },
  { question: "Which company developed Java?", options: ["Microsoft", "Sun Microsystems", "Google", "IBM"], answer: "Sun Microsystems" },
  { question: "Which is used to store multiple values?", options: ["String", "Array", "Number", "Boolean"], answer: "Array" },
  { question: "Which method adds element to array?", options: ["push()", "add()", "insert()", "append()"], answer: "push()" },
  { question: "Which symbol is used for ID in CSS?", options: [".", "#", "*", "&"], answer: "#" },
  { question: "Which symbol is used for class in CSS?", options: ["#", ".", "*", "$"], answer: "." },
  { question: "Which tool is used for version control?", options: ["Git", "Node", "React", "Chrome"], answer: "Git" }
],

  General: [
  { question: "Capital of India? 🇮🇳", options: ["Mumbai", "Delhi", "Chennai", "Kolkata"], answer: "Delhi" },
  { question: "National animal of India? 🐯", options: ["Lion", "Tiger", "Elephant", "Leopard"], answer: "Tiger" },
  { question: "How many states are there in India?", options: ["28", "29", "30", "27"], answer: "28" },
  { question: "Which is the largest ocean? 🌊", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: "Pacific" },
  { question: "Which planet is known as Red Planet? 🔴", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
  { question: "National bird of India? 🦚", options: ["Parrot", "Peacock", "Crow", "Eagle"], answer: "Peacock" },
  { question: "Which gas do we breathe in? 😮‍💨", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Oxygen" },
  { question: "How many continents are there? 🌍", options: ["5", "6", "7", "8"], answer: "7" },
  { question: "Which is the longest river in the world?", options: ["Ganga", "Amazon", "Nile", "Yamuna"], answer: "Nile" },
  { question: "Who is known as Father of Nation (India)?", options: ["Nehru", "Gandhi", "Patel", "Ambedkar"], answer: "Gandhi" },
  { question: "Which is the fastest land animal? 🐆", options: ["Lion", "Tiger", "Cheetah", "Horse"], answer: "Cheetah" },
  { question: "Which festival is known as Festival of Lights? 🪔", options: ["Holi", "Diwali", "Eid", "Christmas"], answer: "Diwali" },
  { question: "Which is the smallest prime number?", options: ["0", "1", "2", "3"], answer: "2" },
  { question: "How many colors are in rainbow? 🌈", options: ["5", "6", "7", "8"], answer: "7" },
  { question: "Which is the national currency of India?", options: ["Dollar", "Euro", "Rupee", "Yen"], answer: "Rupee" },
  { question: "Which is the largest continent? 🌍", options: ["Africa", "Asia", "Europe", "Australia"], answer: "Asia" },
  { question: "Which animal is known as Ship of Desert? 🐪", options: ["Horse", "Camel", "Donkey", "Elephant"], answer: "Camel" },
  { question: "Which is the tallest mountain in the world? 🏔️", options: ["K2", "Everest", "Kangchenjunga", "Makalu"], answer: "Everest" },
  { question: "Which day is celebrated as Independence Day in India? 🇮🇳", options: ["26 Jan", "15 Aug", "2 Oct", "1 May"], answer: "15 Aug" },
  { question: "Which is the national sport of India (commonly believed)? 🏑", options: ["Cricket", "Hockey", "Football", "Kabaddi"], answer: "Hockey" }
],

  Movies: [
  { question: "Who is called King Khan? 😎", options: ["Salman Khan", "Aamir Khan", "Shah Rukh Khan", "Ranbir Kapoor"], answer: "Shah Rukh Khan" },
  { question: "Which movie has the dialogue 'All is well'? 😂", options: ["3 Idiots", "Dangal", "Chhichhore", "PK"], answer: "3 Idiots" },
  { question: "Who played Rancho in 3 Idiots?", options: ["Aamir Khan", "Ranbir Kapoor", "Shahid Kapoor", "Varun Dhawan"], answer: "Aamir Khan" },
  { question: "Which movie is about wrestling? 💪", options: ["Dangal", "Sultan", "Chak De India", "Lagaan"], answer: "Dangal" },
  { question: "Who is known as Bhaijaan? 😄", options: ["Salman Khan", "Shah Rukh Khan", "Aamir Khan", "Akshay Kumar"], answer: "Salman Khan" },
  { question: "Which movie features MS Dhoni’s life? 🏏", options: ["83", "MS Dhoni: The Untold Story", "Lagaan", "Jersey"], answer: "MS Dhoni: The Untold Story" },
  { question: "Which movie is based on college friendship? 🎓", options: ["Chhichhore", "Dangal", "War", "Pathaan"], answer: "Chhichhore" },
  { question: "Who played Kabir Singh? 🤯", options: ["Shahid Kapoor", "Ranbir Kapoor", "Varun Dhawan", "Tiger Shroff"], answer: "Shahid Kapoor" },
  { question: "Which movie has 'Senorita' song? 💃", options: ["ZNMD", "YJHD", "War", "Race"], answer: "ZNMD" },
  { question: "Full form of ZNMD? 🤔", options: ["Zindagi Na Milegi Dobara", "Zindagi Na Mile Dobara", "Zindagi Mile Dobara", "Zindagi Nahi Milegi Dobara"], answer: "Zindagi Na Milegi Dobara" },
  { question: "Which movie has character 'Bunny'? 😎", options: ["Yeh Jawaani Hai Deewani", "Tamasha", "Wake Up Sid", "Barfi"], answer: "Yeh Jawaani Hai Deewani" },
  { question: "Who played Geet in Jab We Met? 💖", options: ["Kareena Kapoor", "Alia Bhatt", "Deepika Padukone", "Priyanka Chopra"], answer: "Kareena Kapoor" },
  { question: "Which movie has dialogue 'How’s the josh?' 🔥", options: ["Uri", "War", "Pathaan", "Raazi"], answer: "Uri" },
  { question: "Which movie is about space scientist? 🚀", options: ["Mission Mangal", "Ra.One", "Krrish", "PK"], answer: "Mission Mangal" },
  { question: "Who played PK? 👽", options: ["Aamir Khan", "Salman Khan", "Ranbir Kapoor", "Akshay Kumar"], answer: "Aamir Khan" },
  { question: "Which movie has robot 'Chitti'? 🤖", options: ["Robot", "Krrish", "Ra.One", "PK"], answer: "Robot" },
  { question: "Which movie is about cricket in British era? 🏏", options: ["Lagaan", "83", "Jersey", "MS Dhoni"], answer: "Lagaan" },
  { question: "Who played Kapil Dev in 83? 🏆", options: ["Ranveer Singh", "Ranbir Kapoor", "Ayushmann", "Vicky Kaushal"], answer: "Ranveer Singh" },
  { question: "Which movie has character 'Barfi'? 🍬", options: ["Barfi", "Tamasha", "Rockstar", "Wake Up Sid"], answer: "Barfi" },
  { question: "Which movie is about boxing girl? 🥊", options: ["Mary Kom", "Dangal", "Chak De India", "Sultan"], answer: "Mary Kom" }
],
  Fun: [
  { question: "Why did the computer go to the doctor? 😂", options: ["It had a virus", "It was hungry", "It was sleepy", "It broke"], answer: "It had a virus" },
  { question: "What has keys but can’t open locks? 🤔", options: ["Piano", "Car", "Door", "Phone"], answer: "Piano" },
  { question: "Why did the student bring a ladder to school? 😂", options: ["To climb", "To reach high grades", "To play", "For fun"], answer: "To reach high grades" },
  { question: "What runs but never walks? 🤯", options: ["Water", "Dog", "Car", "Human"], answer: "Water" },
  { question: "Why don’t programmers like nature? 😂", options: ["Too many bugs", "Too hot", "Too cold", "Too boring"], answer: "Too many bugs" },
  { question: "What has a face and two hands but no legs? 🤔", options: ["Clock", "Robot", "Human", "Fan"], answer: "Clock" },
  { question: "Why did the phone go to sleep? 😂", options: ["Low battery", "Tired", "Bored", "Broken"], answer: "Low battery" },
  { question: "What gets wetter as it dries? 🤯", options: ["Towel", "Water", "Rain", "Cloth"], answer: "Towel" },
  { question: "Why did the math book look sad? 😂", options: ["Too many problems", "Lost", "Broken", "Dirty"], answer: "Too many problems" },
  { question: "What can travel around the world while staying in one place? 🤔", options: ["Stamp", "Car", "Plane", "Ship"], answer: "Stamp" },
  { question: "Why did the computer get cold? 😂", options: ["Left its Windows open", "No power", "Broken fan", "Virus"], answer: "Left its Windows open" },
  { question: "What has an eye but cannot see? 🤯", options: ["Needle", "Human", "Camera", "Robot"], answer: "Needle" },
  { question: "Why was the keyboard always happy? 😂", options: ["It had good keys", "It was new", "It was fast", "It worked"], answer: "It had good keys" },
  { question: "Why don’t secrets last in class? 😂", options: ["Too many listeners", "Too noisy", "Too quiet", "Too boring"], answer: "Too many listeners" },
  { question: "What has legs but doesn’t walk? 🤔", options: ["Table", "Dog", "Chair", "Fan"], answer: "Table" },
  { question: "Why did the WiFi break up? 😂", options: ["Weak connection", "Too many users", "No signal", "Slow speed"], answer: "Weak connection" },
  { question: "What kind of room has no doors or windows? 🤯", options: ["Mushroom", "Bedroom", "Hall", "Kitchen"], answer: "Mushroom" },
  { question: "Why did the student sleep in class? 😂", options: ["Night study", "Boring lecture", "Tired", "All of these"], answer: "All of these" },
  { question: "What is always in front of you but can’t be seen? 🤔", options: ["Future", "Air", "Light", "Shadow"], answer: "Future" },
  { question: "Why did the mobile go to school? 😂", options: ["To become smart", "To charge", "To call", "To play"], answer: "To become smart" }
],
Cricket: [
  { question: "What do batsmen usually eat before getting out for a duck?", options: ["Egg", "Nothing, they are already sad", "Burger", "Pizza"], answer: "Nothing, they are already sad" },

  { question: "RCB fans after every season usually say?", options: ["Ee Sala Cup Namde", "Next year will be ours", "We are champions", "Both A and B"], answer: "Both A and B" },

  { question: "CSK fans trust only one thing blindly:", options: ["Dhoni finishing match", "Rain", "Lucky jersey", "Umpire"], answer: "Dhoni finishing match" },

  { question: "What happens when RCB starts winning 2 matches in a row?", options: ["Fans celebrate IPL trophy", "Memes start dying", "Hope rises dangerously", "All of these"], answer: "All of these" },

  { question: "What is CSK’s superpower?", options: ["Yellow jersey magic", "Dhoni calm finishing", "Old players still strong", "All of these"], answer: "All of these" },

  { question: "If a bowler gets hit for 3 sixes, he usually thinks:", options: ["Retirement plan", "New hairstyle", "Why me?", "All of these"], answer: "All of these" },

  { question: "What do commentators say when they are confused?", options: ["Interesting shot", "He meant that", "Intent was clear", "All of these"], answer: "All of these" },

  { question: "RCB full form according to fans:", options: ["Royal Challengers Bangalore", "Really Can't Bowl", "Really Can't Bat", "Royal Champions Bangalore"], answer: "Royal Challengers Bangalore" },

  { question: "CSK stands for fans as:", options: ["Chennai Super Kings", "Consistent Super Kings", "Captain Strong Kingdom", "Chennai Silent Killers"], answer: "Chennai Super Kings" },

  { question: "What is a batsman’s worst nightmare?", options: ["Yorker", "Umpire finger", "RCB pressure match", "All of these"], answer: "All of these" },

  { question: "What happens when a fielder drops a catch?", options: ["Instant regret", "Memes on internet", "Captain disappointment", "All of these"], answer: "All of these" },

  { question: "What do RCB fans do every year?", options: ["Believe again", "Cry again", "Wait again", "All of these"], answer: "All of these" },

  { question: "Why CSK is always dangerous?", options: ["Experience", "Dhoni factor", "Calm mindset", "All of these"], answer: "All of these" },

  { question: "What is IPL fans’ favorite hobby?", options: ["Arguing online", "Meme sharing", "Team roasting", "All of these"], answer: "All of these" },

  { question: "What happens when a batsman hits first-ball six?", options: ["Hero moment", "Commentators go crazy", "Opposition shocked", "All of these"], answer: "All of these" },

  { question: "What do RCB fans say after losing final?", options: ["Next year is ours", "Unlucky again", "We played well", "All of these"], answer: "All of these" },

  { question: "CSK fans reaction when Dhoni comes to bat?", options: ["Silence in stadium", "Hope increases", "Heartbeat increases", "All of these"], answer: "All of these" },

  { question: "What is bowler thinking after getting hit for six?", options: ["Change sport", "Yoga time", "New plan needed", "All of these"], answer: "All of these" },

  { question: "Why IPL is most loved league?", options: ["Drama", "Fun", "Memes", "All of these"], answer: "All of these" },

  { question: "Final question: What is cricket without memes?", options: ["Boring", "Impossible", "Still fun", "Nothing"], answer: "Boring" }
],
Cartoons: [
  { question: "Who is Naruto’s best friend?", options: ["Sasuke", "Kakashi", "Sakura", "Itachi"], answer: "Sasuke" },

  { question: "Doraemon comes from which century?", options: ["20th", "21st", "22nd", "23rd"], answer: "22nd" },

  { question: "What does Shinchan love eating?", options: ["Pizza", "Chocolate Biryani", "Choco Chips", "Ice Cream"], answer: "Choco Chips" },

  { question: "What is Pikachu’s main power?", options: ["Fire", "Water", "Electricity", "Ice"], answer: "Electricity" },

  { question: "Who is the princess in Cinderella?", options: ["Elsa", "Ariel", "Cinderella", "Snow White"], answer: "Cinderella" },

  { question: "What loses Cinderella at midnight?", options: ["Ring", "Carriage", "Glass slipper", "Crown"], answer: "Glass slipper" },

  { question: "Who helps Cinderella go to the ball?", options: ["Fairy Godmother", "Witch", "Mother", "Friend"], answer: "Fairy Godmother" },

  { question: "Oggy is from which cartoon?", options: ["Tom and Jerry", "Oggy and the Cockroaches", "Shinchan", "Ben 10"], answer: "Oggy and the Cockroaches" },

  { question: "Who always troubles Oggy?", options: ["Cats", "Dogs", "Cockroaches", "Mice"], answer: "Cockroaches" },

  { question: "What is Naruto’s dream?", options: ["Become Hokage", "Be rich", "Be strongest ninja", "All of these"], answer: "Become Hokage" },

  { question: "What is Goku from?", options: ["One Piece", "Dragon Ball Z", "Naruto", "Bleach"], answer: "Dragon Ball Z" },

  { question: "What is Luffy’s goal in One Piece?", options: ["Find treasure", "Become Pirate King", "Defeat enemies", "Become Navy"], answer: "Become Pirate King" },

  { question: "Which cartoon character is a sponge?", options: ["Patrick", "Squidward", "SpongeBob", "Jerry"], answer: "SpongeBob" },

  { question: "Tom and Jerry are always doing what?", options: ["Fighting", "Cooking", "Sleeping", "Studying"], answer: "Fighting" },

  { question: "What animal is Pikachu?", options: ["Cat", "Mouse", "Rabbit", "Dog"], answer: "Mouse" },

  { question: "Who is Elsa’s sister in Frozen?", options: ["Anna", "Ariel", "Rapunzel", "Belle"], answer: "Anna" },

  { question: "Which anime has death note?", options: ["Naruto", "Death Note", "Bleach", "Attack on Titan"], answer: "Death Note" },

  { question: "Who is the main character in Attack on Titan?", options: ["Eren Yeager", "Naruto", "Luffy", "Sasuke"], answer: "Eren Yeager" },

  { question: "What does Oggy usually do all day?", options: ["Sleep and relax", "Study", "Fight villains", "Work office"], answer: "Sleep and relax" },

  { question: "What is Cinderella’s main trait?", options: ["Rude", "Kind and patient", "Angry", "Rich"], answer: "Kind and patient" }
],
};


const shuffleArray = (arr) => {
  if (!Array.isArray(arr)) return [];
  return [...arr].sort(() => Math.random() - 0.5);
};


const handleAutoNext = () => {
  const isCorrect = selected === currentQ.answer;
  const newScore = isCorrect ? score + 1 : score;

  if (currentIndex < questions.length - 1) {
    setScore(newScore);
    setCurrentIndex(prev => prev + 1);
    setSelected(null);
  } else {
    navigate("/result", {
      state: {
        score: newScore,
        total: questions.length,
        category,
        questions,
      },
    });
  }
};

useEffect(() => {
  if (!category) return;

  const data = questionsData[category] || [];
  const shuffled = shuffleArray(data).slice(0, 5);

  setQuestions(shuffled);
  setCurrentIndex(0);
  setScore(0);
  setSelected(null);
}, [category]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  const currentQ = questions?.[currentIndex];

  const handleNext = () => {
  
  if (!selected) {
    setError(true);
    return;
  }

  setError(false);

  
  const isCorrect = selected === currentQ.answer;
  const newScore = isCorrect ? score + 1 : score;

  
  if (currentIndex < questions.length - 1) {
    setScore(newScore);
    setCurrentIndex(prev => prev + 1);
    setSelected(null);
    setTimeLeft(15);
  } else {
    navigate("/result", {
      state: {
        score: newScore,
        total: questions.length,
        category,
        questions,
      },
    });
  }
};

useEffect(() => {
  if (!questions.length) return;

  setTimeLeft(15);

  const timer = setInterval(() => {
    setTimeLeft(prev => {
      if (prev <= 1) {
        clearInterval(timer);

        // auto move to next question when time finishes
        handleAutoNext();
        return 15;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [currentIndex, questions]);

    if (!currentQ) {
  return (
    <div className="text-black text-2xl flex items-center justify-center min-h-screen">
      Loading questions...
    </div>
  );
};



  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-[#583156] via-[#9d6c9d] to-[#6d2c6c] 
    text-[#ffffff]">
      
      {/* Floating bubbles */}
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


      <div className="backdrop-blur-xl bg-[#DDC3C3]/10 
      border border-white/20 p-8 rounded-3xl 
      shadow-[0_0_40px_rgba(0,0,0,0.3)] 
      w-[400px]">

        {/* Top */}
        <div className="flex justify-between mb-4 text-sm">
          <span>Category: {category}</span>
          <span>Question : {currentIndex + 1} / {questions.length}</span>
        </div>

        

<div className="text-center text-lg font-bold mb-3 text-[#ffffff]">
  ⏱️ {timeLeft}s
</div>

        
        <h2 className="text-xl font-semibold mb-6">
          Q{currentIndex + 1}. {currentQ.question}
        </h2>

      
        <div className="space-y-3 mb-6">
          {currentQ?.options?.map((opt, index) => (
            <div
              key={index}
              onClick={() => {setSelected(opt); setError(false);}}
              className={`cursor-pointer p-3 rounded-xl border transition 
              ${
                selected === opt
                  ? "border-[#dbc9c9] shadow-[0_0_10px_#DDC3C3]"
                  : "border-white/40 hover:border-[#A376A2]"
              }`}
            >
              {opt}
            </div>
          ))}
        </div>
          {error && (
  <p className="text-sm text-[#2e0e2c] font-bold text-center mb-4 animate-pulse">
    Please select an option
  </p>
)}
       
        <button
          onClick={handleNext}
          className="w-full py-3 rounded-xl 
          bg-gradient-to-r from-[#6B3F69] to-[#A376A2] border border-white/20 
          hover:scale-105 transition font-semibold"
        >
          {currentIndex === questions.length - 1 ? "Finish" : "Next"}
        </button>
         </div>
    </div>
  );
};

export default Quiz;