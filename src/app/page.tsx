'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import confetti from 'canvas-confetti';

const questions = [
  { 
    q: 'Что тебе ближе всего?', 
    options: [
      'Физика и ядерные технологии',
      'Химия и материалы',
      'Информационные технологии',
      'Биотехнические системы'
    ] 
  },
  { 
    q: 'Как ты предпочитаешь решать задачи?', 
    options: [
      'Через расчеты и моделирование',
      'Через эксперименты с веществами',
      'Через программирование и алгоритмы',
      'Через анализ биологических систем'
    ] 
  },
  { 
    q: 'Какая область тебе интереснее?', 
    options: [
      'Ядерные реакторы и радиация',
      'Наноматериалы и микроскопия',
      'Электроника и автоматика',
      'Медицинские технологии'
    ] 
  },
  { 
    q: 'Что в науке важнее всего?', 
    options: [
      'Управление ядерными процессами',
      'Создание новых материалов',
      'Разработка умных систем',
      'Помощь живым организмам'
    ] 
  },
  { 
    q: 'Что привлекает в лаборатории?', 
    options: [
      'Реакторы и защитные системы',
      'Химические реагенты и растворы',
      'Микроконтроллеры и датчики',
      'Биомедицинские приборы'
    ] 
  },
  { 
    q: 'Где хотел бы работать?', 
    options: [
      'На ядерном производстве',
      'В химической лаборатории',
      'В центре инноваций',
      'В медико-биологическом центре'
    ] 
  },
  { 
    q: 'Какие технологии интереснее?', 
    options: [
      'Ядерная энергетика',
      'Нанотехнологии',
      'Электроника и схемы',
      'Биоинженерия'
    ] 
  },
  { 
    q: 'Какая специализация ближе?', 
    options: [
      'Физика ядра и частиц',
      'Химические технологии',
      'Автоматика и контроль',
      'Биотехнические системы'
    ] 
  },
  { 
    q: 'Что важнее в работе?', 
    options: [
      'Безопасность и точность',
      'Качество и стандарты',
      'Инновации и оптимизация',
      'Эффективность и надежность'
    ] 
  },
  { 
    q: 'С чем хотел бы работать?', 
    options: [
      'Ядерное топливо и защита',
      'Химические процессы',
      'Цифровые технологии',
      'Биомедицинские системы'
    ] 
  },
];

const rules = [
// Ядерные физика и технологии
{ keyword: 'ядерн', direction: 'Ядерные физика и технологии' },
{ keyword: 'радиац', direction: 'Ядерные физика и технологии' },
{ keyword: 'физика ядра', direction: 'Ядерные физика и технологии' },
{ keyword: 'защита', direction: 'Ядерные физика и технологии' },
{ keyword: 'частиц', direction: 'Ядерные физика и технологии' },

// Ядерные реакторы и материалы
{ keyword: 'реактор', direction: 'Ядерные реакторы и материалы' },
{ keyword: 'топлив', direction: 'Ядерные реакторы и материалы' },
{ keyword: 'энергетик', direction: 'Ядерные реакторы и материалы' },
{ keyword: 'производств', direction: 'Ядерные реакторы и материалы' },
{ keyword: 'безопасность', direction: 'Ядерные реакторы и материалы' },

// Химическая технология
{ keyword: 'хими', direction: 'Химическая технология' },
{ keyword: 'реагент', direction: 'Химическая технология' },
{ keyword: 'раствор', direction: 'Химическая технология' },
{ keyword: 'вещест', direction: 'Химическая технология' },
{ keyword: 'лаборатор', direction: 'Химическая технология' },

// Химическая технология материалов современной энергетики
{ keyword: 'материал', direction: 'Химическая технология материалов современной энергетики' },
{ keyword: 'процесс', direction: 'Химическая технология материалов современной энергетики' },
{ keyword: 'технолог', direction: 'Химическая технология материалов современной энергетики' },
{ keyword: 'стандарт', direction: 'Химическая технология материалов современной энергетики' },
{ keyword: 'качеств', direction: 'Химическая технология материалов современной энергетики' },

// Биотехнические системы и технологии
{ keyword: 'био', direction: 'Биотехнические системы и технологии' },
{ keyword: 'медиц', direction: 'Биотехнические системы и технологии' },
{ keyword: 'организм', direction: 'Биотехнические системы и технологии' },
{ keyword: 'биоинженер', direction: 'Биотехнические системы и технологии' },
{ keyword: 'биомедицин', direction: 'Биотехнические системы и технологии' },

// Электроника и наноэлектроника
{ keyword: 'электрон', direction: 'Электроника и наноэлектроника' },
{ keyword: 'схем', direction: 'Электроника и наноэлектроника' },
{ keyword: 'нано', direction: 'Электроника и наноэлектроника' },
{ keyword: 'микроскоп', direction: 'Электроника и наноэлектроника' },
{ keyword: 'микро', direction: 'Электроника и наноэлектроника' },

// Электроника и автоматика физических установок
{ keyword: 'автомат', direction: 'Электроника и автоматика физических установок' },
{ keyword: 'датчик', direction: 'Электроника и автоматика физических установок' },
{ keyword: 'контрол', direction: 'Электроника и автоматика физических установок' },
{ keyword: 'установк', direction: 'Электроника и автоматика физических установок' },
{ keyword: 'систем', direction: 'Электроника и автоматика физических установок' },

// Инженерия неразрушающего контроля
{ keyword: 'контрол', direction: 'Инженерия неразрушающего контроля' },
{ keyword: 'надежност', direction: 'Инженерия неразрушающего контроля' },
{ keyword: 'эффективност', direction: 'Инженерия неразрушающего контроля' },
{ keyword: 'точност', direction: 'Инженерия неразрушающего контроля' },
{ keyword: 'измерен', direction: 'Инженерия неразрушающего контроля' },

// Наноинженерия
{ keyword: 'нано', direction: 'Наноинженерия' },
{ keyword: 'микроскоп', direction: 'Наноинженерия' },
{ keyword: 'материал', direction: 'Наноинженерия' },
{ keyword: 'технолог', direction: 'Наноинженерия' },
{ keyword: 'микро', direction: 'Наноинженерия' },

// Информационные системы и технологии
{ keyword: 'информацион', direction: 'Информационные системы и технологии' },
{ keyword: 'цифров', direction: 'Информационные системы и технологии' },
{ keyword: 'программ', direction: 'Информационные системы и технологии' },
{ keyword: 'алгоритм', direction: 'Информационные системы и технологии' },
{ keyword: 'технолог', direction: 'Информационные системы и технологии' },

// Инноватика
{ keyword: 'инновац', direction: 'Инноватика' },
{ keyword: 'оптимизац', direction: 'Инноватика' },
{ keyword: 'развити', direction: 'Инноватика' },
{ keyword: 'эффективност', direction: 'Инноватика' },
{ keyword: 'умн', direction: 'Инноватика' },
];

function getScores(answers: string[]) {
  const text = answers.join(' ').toLowerCase();
  const scoreMap: Record<string, number> = {};
  for (const rule of rules) {
    if (text.includes(rule.keyword.toLowerCase())) {
      scoreMap[rule.direction] = (scoreMap[rule.direction] || 0) + 1;
    }
  }
  return scoreMap;
}

function getTopDirections(scoreMap: Record<string, number>, topN = 3) {
  const entries = Object.entries(scoreMap);
  if (entries.length === 0) return [];
  return entries.sort((a, b) => b[1] - a[1]).slice(0, topN);
}

interface ConfettiOptions {
  spread?: number;
  startVelocity?: number;
  decay?: number;
  scalar?: number;
}

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [showLetters, setShowLetters] = useState(false);

  const handleClick = () => {
    if (!showLetters) {
      setShowLetters(true);
      setTimeout(() => {
        onComplete();
      }, 3000); // Даем время на анимацию появления букв
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={handleClick}
      className="fixed inset-0 flex flex-col items-center justify-center bg-black cursor-pointer"
    >
      {/* Атом */}
      <div className="relative w-64 h-64 mb-8">
        {/* Ядро */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.6, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div className="w-12 h-12 rounded-full bg-white relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="absolute inset-0 rounded-full bg-white blur-md"
            />
          </div>
        </motion.div>

        {/* Электрон */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.6, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.5
          }}
          className="absolute top-0 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-6 rounded-full bg-white relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
              className="absolute inset-0 rounded-full bg-white blur-md"
            />
          </div>
        </motion.div>

        {/* Орбиты */}
        {[0, 60, 120].map((rotation, index) => (
          <motion.div
            key={rotation}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0.4, 0.8] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 0.3
            }}
            className="absolute inset-0"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[400px] h-[200px] border-2 border-white rounded-full transform rotate-90 relative">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 border-2 border-white rounded-full blur-sm"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Текст ФИЗТЕХ */}
      <div className="flex items-center space-x-2">
        {/* Ф в квадрате */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ 
            boxShadow: ['0 0 10px #4ade80', '0 0 20px #4ade80', '0 0 10px #4ade80'],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="relative"
        >
          <div className="w-12 h-12 border-2 border-green-400 flex items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-0 border-2 border-green-400 blur-sm"
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: showLetters ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl font-bold text-magenta"
            >
              Ф
            </motion.span>
          </div>
        </motion.div>

        {/* И */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ 
            textShadow: ['0 0 10px #ff00ff', '0 0 20px #ff00ff', '0 0 10px #ff00ff'],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="text-2xl font-bold italic text-magenta"
          style={{ fontFamily: "Times New Roman" }}
        >
          И
        </motion.div>

        {/* З */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ 
            textShadow: ['0 0 10px #ff00ff', '0 0 20px #ff00ff', '0 0 10px #ff00ff'],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="text-2xl font-bold italic text-magenta"
          style={{ fontFamily: "Times New Roman" }}
        >
          З
        </motion.div>

        {/* Т в квадрате */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ 
            boxShadow: ['0 0 10px #4ade80', '0 0 20px #4ade80', '0 0 10px #4ade80'],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="relative"
        >
          <div className="w-12 h-12 border-2 border-green-400 flex items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-0 border-2 border-green-400 blur-sm"
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: showLetters ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-2xl font-bold text-magenta"
            >
              Т
            </motion.span>
          </div>
        </motion.div>

        {/* Е */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ 
            textShadow: ['0 0 10px #ff00ff', '0 0 20px #ff00ff', '0 0 10px #ff00ff'],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="text-2xl font-bold italic text-magenta"
          style={{ fontFamily: "Times New Roman" }}
        >
          Е
        </motion.div>

        {/* Х в квадрате */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ 
            boxShadow: ['0 0 10px #4ade80', '0 0 20px #4ade80', '0 0 10px #4ade80'],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="relative"
        >
          <div className="w-12 h-12 border-2 border-green-400 flex items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-0 border-2 border-green-400 blur-sm"
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: showLetters ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="text-2xl font-bold text-magenta"
            >
              Х
            </motion.span>
          </div>
        </motion.div>
      </div>

      {/* Текст для клика */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8"
      >
        <p className="text-white text-sm">Нажмите, чтобы продолжить</p>
      </motion.div>
    </motion.div>
  );
}

export default function QuizApp() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [chartData, setChartData] = useState<{ direction: string; value: number }[]>([]);
  const [showSplash, setShowSplash] = useState(true);

  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 1000,
    };

    function fire(particleRatio: number, opts: ConfettiOptions) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (step + 1 === questions.length) {
        const scores = getScores(newAnswers);
        const top3 = getTopDirections(scores);
        setResult(top3[0]?.[0] || 'Ты особенный! Придумай своё направление 😊');
        setChartData(top3.map(([direction, value]) => ({ direction, value })));
        setTimeout(triggerConfetti, 500);
      } else {
        setStep(step + 1);
      }
    }, 500);
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
    setChartData([]);
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden px-4 py-10 flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, #1e3a8a, #2563eb)`
      }}
    >
      <div className="absolute inset-0 bg-grid opacity-40"></div>
      <div className="max-w-2xl w-full relative z-10">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 40, rotateX: 30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -30, rotateX: -30 }}
              transition={{ 
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="bg-white/95 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center"
            >
              <motion.div 
                className="text-4xl font-bold text-gray-900 mb-6"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {step + 1}
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">{questions[step].q}</h2>
              <div className="grid gap-4">
                {questions[step].options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      backgroundColor: '#f0fdf4',
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(opt)}
                    className="bg-white shadow-xl border border-gray-300 rounded-xl py-4 px-6 text-lg font-semibold transition-all duration-300 hover:shadow-2xl hover:border-green-500 hover:border-2 text-gray-900 active:bg-green-50"
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
              <div className="flex justify-center gap-2 mt-8">
                {questions.map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.5 }}
                    animate={{ 
                      scale: 1,
                      transition: { delay: index * 0.05 }
                    }}
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                      index < step 
                        ? 'bg-green-500 border-green-600 scale-110' 
                        : index === step 
                        ? 'bg-white border-green-500 scale-125' 
                        : 'bg-white border-gray-400'
                    }`}
                  ></motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="bg-white/95 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold mb-4 text-gray-900">✨ Тебе подходит направление:</h2>
                <p className="text-2xl mb-6 text-green-600 font-bold">{result}</p>
              </motion.div>
              
              {chartData.length > 0 && (
                <motion.div 
                  className="w-full h-[300px] mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <ResponsiveContainer>
                    <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 3]} />
                      <YAxis type="category" dataKey="direction" tick={{ fontSize: 14 }} width={220} />
                      <Bar dataKey="value" fill="#6366f1" isAnimationActive={true} radius={[0, 10, 10, 0]}>
                        {chartData.map((entry: { direction: string; value: number }, index: number) => (
                          <Cell key={`cell-${index}`} fill={`hsl(${220 + index * 20}, 70%, 60%)`} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              )}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="space-y-4"
              >
                <button
                  onClick={restart}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white text-lg rounded-xl px-8 py-3 hover:shadow-lg transition-all duration-300 hover:scale-105 font-semibold"
                >
                  Пройти ещё раз
                </button>

                <a
                  href="https://vk.com/ftientrants"
                  target="_blank"
                  className="block mt-4 text-blue-600 hover:text-blue-700 underline text-sm transition-colors font-medium"
                >
                  Вступай в нашу группу ВКонтакте — Абитуриент Физтеха УрФУ
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}