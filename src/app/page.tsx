'use client';

import React from 'react';
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
import localFont from 'next/font/local';

const montserrat = localFont({
  src: [
    {
      path: '../fonts/Montserrat-Bold.woff2',
      weight: '700',
      style: 'normal',
    }
  ],
});

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
  const [fadeOut, setFadeOut] = useState(false);

  const handleClick = () => {
    if (!showLetters) {
      setShowLetters(true);
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          onComplete();
        }, 1000);
      }, 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      onClick={handleClick}
      className="fixed inset-0 flex flex-col items-center justify-center bg-black cursor-pointer"
    >
      {/* Атом */}
      <div className="relative w-64 h-64 mb-8">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Ядро */}
          <motion.circle
            cx="50"
            cy="50"
            r="8"
            fill="white"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ 
              scale: [0.8, 1, 0.8],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Орбиты */}
          {[0, 60, 120].map((rotation) => (
            <motion.ellipse
              key={rotation}
              cx="50"
              cy="50"
              rx="40"
              ry="15"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              transform={`rotate(${rotation} 50 50)`}
              initial={{ opacity: 0.3 }}
              animate={{ 
                opacity: [0.3, 0.7, 0.3],
                strokeWidth: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Электрон */}
          <motion.circle
            cx="90"
            cy="50"
            r="4"
            fill="white"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ 
              scale: [0.8, 1, 0.8],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>

      {/* Текст ФИЗТЕХ */}
      <div className="flex items-center space-x-2">
        {/* Ф в квадрате */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ 
            boxShadow: ['0 0 15px #e11a63', '0 0 25px #e11a63', '0 0 15px #e11a63'],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="relative"
        >
          <div className="w-14 h-14 border-2 border-[#e11a63] flex items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0.4 }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-0 border-2 border-[#e11a63] blur-lg"
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: showLetters ? 1 : 0 }}
              transition={{ duration: 2 }}
              className={`text-2xl font-bold text-white uppercase ${montserrat.className}`}
            >
              Ф
            </motion.span>
          </div>
        </motion.div>

        {/* И */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ 
            textShadow: ['0 0 15px #fff', '0 0 25px #fff', '0 0 15px #fff'],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className={`text-2xl font-bold text-white uppercase ${montserrat.className}`}
        >
          И
        </motion.div>

        {/* З */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ 
            textShadow: ['0 0 15px #fff', '0 0 25px #fff', '0 0 15px #fff'],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className={`text-2xl font-bold text-white uppercase ${montserrat.className}`}
        >
          З
        </motion.div>

        {/* Т в квадрате */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ 
            boxShadow: ['0 0 15px #e11a63', '0 0 25px #e11a63', '0 0 15px #e11a63'],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="relative"
        >
          <div className="w-14 h-14 border-2 border-[#e11a63] flex items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0.4 }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-0 border-2 border-[#e11a63] blur-lg"
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: showLetters ? 1 : 0 }}
              transition={{ duration: 2 }}
              className={`text-2xl font-bold text-white uppercase ${montserrat.className}`}
            >
              Т
            </motion.span>
          </div>
        </motion.div>

        {/* Е */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ 
            textShadow: ['0 0 15px #fff', '0 0 25px #fff', '0 0 15px #fff'],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className={`text-2xl font-bold text-white uppercase ${montserrat.className}`}
        >
          Е
        </motion.div>

        {/* Х в квадрате */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ 
            boxShadow: ['0 0 15px #e11a63', '0 0 25px #e11a63', '0 0 15px #e11a63'],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="relative"
        >
          <div className="w-14 h-14 border-2 border-[#e11a63] flex items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0.4 }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-0 border-2 border-[#e11a63] blur-lg"
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: showLetters ? 1 : 0 }}
              transition={{ duration: 2 }}
              className={`text-2xl font-bold text-white uppercase ${montserrat.className}`}
            >
              Х
            </motion.span>
          </div>
        </motion.div>
      </div>

      {/* Текст для клика */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showLetters ? 0 : 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8"
      >
        <p className={`text-white text-xs ${montserrat.className}`}>Нажмите, чтобы продолжить</p>
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
  const [selectedOptions, setSelectedOptions] = useState<string[][]>(Array(questions.length).fill([]));

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

  const handleOptionToggle = (option: string, questionIndex: number) => {
    setSelectedOptions((prev) => {
      const newSelections = [...prev];
      const currentSelections = newSelections[questionIndex];
      if (currentSelections.includes(option)) {
        newSelections[questionIndex] = currentSelections.filter((opt) => opt !== option);
      } else {
        newSelections[questionIndex] = [...currentSelections, option];
      }
      return newSelections;
    });
  };

  const handleNext = () => {
    const newAnswers = [...answers, ...selectedOptions[step]];
    setAnswers(newAnswers);
    setSelectedOptions((prev) => {
      const newSelections = [...prev];
      newSelections[step] = [];
      return newSelections;
    });

    if (step + 1 === questions.length) {
      const scores = getScores(newAnswers);
      const top3 = getTopDirections(scores);
      setResult(top3[0]?.[0] || 'Ты особенный! Придумай своё направление 😊');
      setChartData(top3.map(([direction, value]) => ({ direction, value })));
      setTimeout(triggerConfetti, 500);
    } else {
      setStep(step + 1);
    }
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
        background: `#1e4391`
      }}
    >
      <div className="absolute inset-0 bg-grid opacity-40"></div>
      <div className="max-w-2xl w-full relative z-10">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 1,
                ease: "easeInOut"
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
                    onClick={() => handleOptionToggle(opt, step)}
                    className={`bg-white shadow-xl border border-gray-300 rounded-xl py-4 px-6 text-lg font-semibold transition-all duration-300 hover:shadow-2xl hover:border-green-500 hover:border-2 text-gray-900 active:bg-green-50 ${selectedOptions[step].includes(opt) ? 'bg-green-100' : ''}`}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white text-lg rounded-xl px-8 py-3 hover:shadow-lg transition-all duration-300 hover:scale-105 font-semibold"
                >
                  Далее
                </button>
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