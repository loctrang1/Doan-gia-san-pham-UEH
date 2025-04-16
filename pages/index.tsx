import { useEffect, useState } from "react";

const products = [
  { name: "Túi canvas", image: "https://shop.ueh.edu.vn/ueh-souvenir/wp-content/uploads/2022/05/SP-202-510x610-1.png", price: 100000 },
  { name: "Nón hiphop mũi bằng", image: "https://shop.ueh.edu.vn/ueh-souvenir/wp-content/uploads/2022/05/SP-25.png", price: 100000 },
  { name: "Mũ bảo hiểm xanh", image: "https://shop.ueh.edu.vn/ueh-souvenir/wp-content/uploads/2022/05/SP-10.png", price: 340000 },
  { name: "Logo màu", image: "https://shop.ueh.edu.vn/ueh-souvenir/wp-content/uploads/2022/05/SP-24-1.png", price: 165000 },
  { name: "Dây đeo thẻ", image: "https://shop.ueh.edu.vn/ueh-souvenir/wp-content/uploads/2022/05/SP-07.png", price: 50000 },
  { name: "Bình giữ nhiệt", image: "https://shop.ueh.edu.vn/ueh-souvenir/wp-content/uploads/2022/05/Artboard-1.png", price: 260000 },
  { name: "Áo thun có cổ", image: "https://shop.ueh.edu.vn/ueh-souvenir/wp-content/uploads/2022/05/SP-14.png", price: 250000 },
  { name: "Balo UEH", image: "https://shop.ueh.edu.vn/ueh-souvenir/wp-content/uploads/2023/09/SP-211-510x610-1.png", price: 400000 },
];

export default function Home() {
  const [names, setNames] = useState<string[]>(["", "", "", "", ""]);
  const [isStarted, setIsStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guesses, setGuesses] = useState<string[]>(["", "", "", "", ""]);
  const [scores, setScores] = useState<number[]>([0, 0, 0, 0, 0]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<{ name: string; score: number }[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showScorePage, setShowScorePage] = useState(false);

  const product = products[currentIndex];

  const handleSubmit = () => {
    const updatedScores = [...scores];
    let allAnswered = true;

    for (let i = 0; i < 5; i++) {
      const guess = parseInt(guesses[i]);
      if (isNaN(guess)) {
        allAnswered = false;
        break;
      }

      const diff = Math.abs(guess - product.price);
      if (diff <= 20000) {
        updatedScores[i] += 1;
      }
    }

    if (!allAnswered) return;

    setScores(updatedScores);
    setShowAnswer(true);

    setTimeout(() => {
      setShowAnswer(false);
      setShowScorePage(true);

      setTimeout(() => {
        const next = currentIndex + 1;
        if (next < products.length) {
          setCurrentIndex(next);
          setGuesses(["", "", "", "", ""]);
          setShowScorePage(false);
        } else {
          const results = names.map((name, i) => ({
            name,
            score: updatedScores[i],
          }));
          results.sort((a, b) => b.score - a.score);
          setLeaderboard(results);
          setShowLeaderboard(true);
        }
      }, 5000);
    }, 2000);
  };

  if (!isStarted) {
    return (
      <main className="min-h-screen bg-[url('https://bit.ueh.edu.vn/wp-content/uploads/2023/06/ueh-new-campus.jpg')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-[#007C8A] space-y-4">
          <h1 className="text-4xl font-extrabold text-[#F37321] mb-4 text-center animate-bounce">
            🎯 Đoán giá sản phẩm UEH
          </h1>
          {[0, 1, 2, 3, 4].map((i) => (
            <input
              key={i}
              type="text"
              placeholder={`Tên người chơi ${i + 1}`}
              value={names[i]}
              onChange={(e) => {
                const updated = [...names];
                updated[i] = e.target.value;
                setNames(updated);
              }}
              className="p-2 border rounded w-full max-w-xs text-center focus:outline-none focus:ring-2 focus:ring-[#007C8A] shadow-md"
            />
          ))}
          <button
            className="bg-[#007C8A] hover:bg-[#005f66] text-white px-6 py-3 rounded text-lg shadow-lg transition-all transform hover:scale-105 mt-4"
            onClick={() => names.every((n) => n.trim()) && setIsStarted(true)}
          >
            🚀 Bắt đầu chơi
          </button>
        </div>
      </main>
    );
  }

  if (showLeaderboard) {
    return (
      <main className="min-h-screen bg-[#FDF7F0] flex flex-col items-center justify-center px-4 text-[#007C8A]">
        <h1 className="text-4xl font-bold mb-6 text-[#F37321]">🏆 Bảng xếp hạng</h1>
        <ul className="bg-white shadow-xl border border-[#007C8A] rounded-lg w-full max-w-md p-6 space-y-2 text-lg">
          {leaderboard.map((entry, idx) => (
            <li key={idx} className="flex justify-between">
              <span>{idx + 1}. {entry.name}</span>
              <span className="text-[#F37321] font-semibold">{entry.score} điểm</span>
            </li>
          ))}
        </ul>
        <button
          className="mt-6 bg-[#007C8A] hover:bg-[#005f66] text-white px-6 py-3 rounded shadow text-lg"
          onClick={() => window.location.reload()}
        >
          🔁 Chơi lại
        </button>
      </main>
    );
  }

  if (showScorePage) {
    return (
      <main className="min-h-screen bg-[url('https://bit.ueh.edu.vn/wp-content/uploads/2023/06/ueh-new-campus.jpg')] bg-cover bg-center flex flex-col items-center justify-center p-6 text-[#007C8A] relative">
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-0" />
        <div className="relative z-10 w-full max-w-md bg-white border border-[#007C8A] rounded-xl shadow-xl p-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#F37321] flex items-center justify-center gap-2">
            <span>📊</span> <span>Điểm sau câu {currentIndex + 1}</span>
          </h1>
          <ul className="space-y-3">
            {names.map((n, i) => (
              <li
                key={i}
                className="flex items-center justify-between px-4 py-2 border-b border-[#E0E0E0] text-lg font-medium"
              >
                <div className="flex items-center gap-2 text-[#007C8A]">
                  <span>👤</span>
                  <span>{n}</span>
                </div>
                <span className="text-[#F37321] font-semibold">{scores[i]} điểm</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm italic text-[#007C8A]">⏳ Chuyển sang câu tiếp theo sau 5 giây...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDF7F0] p-6 flex flex-col items-center justify-center font-sans">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-center text-[#007C8A]">
        🎯 Câu {currentIndex + 1} / {products.length}
      </h1>
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-xl text-center space-y-4 border-2 border-[#007C8A]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-contain rounded-lg"
        />
        <p className="text-xl font-semibold text-[#007C8A]">{product.name}</p>
        <div className="input-container">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="mb-2 text-left">
              <p className="text-sm font-medium text-[#007C8A]">👤 {names[i]}</p>
              <input
                type="number"
                placeholder="Nhập giá đoán (VNĐ)"
                value={guesses[i]}
                onChange={(e) => {
                  const updated = [...guesses];
                  updated[i] = e.target.value;
                  setGuesses(updated);
                }}
                disabled={showAnswer}
                className="border p-2 rounded w-full"
              />
            </div>
          ))}
        </div>
        {!showAnswer && (
          <button
            onClick={handleSubmit}
            className="bg-[#F37321] hover:bg-orange-600 transition-all duration-300 text-white px-4 py-2 rounded w-full text-lg shadow-md"
            disabled={guesses.some((g) => g.trim() === "")}
          >
            Gửi đáp án
          </button>
        )}
        {showAnswer && (
          <div className="text-lg font-semibold text-[#F37321] animate-pulse">
            💰 Giá đúng: {product.price.toLocaleString()} VNĐ
          </div>
        )}
      </div>
    </main>
  );
}
