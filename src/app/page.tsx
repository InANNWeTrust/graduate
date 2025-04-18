'use client';

import { useState, useEffect } from 'react';
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
  { q: 'Что тебе ближе всего?', options: ['Физика', 'Химия', 'Информатика', 'Биология'] },
  { q: 'Как ты предпочитаешь решать задачи?', options: ['Аналитически, по формулам', 'Через эксперименты', 'С помощью кода', 'Через наблюдение за процессами'] },
  { q: 'Если бы ты был стихией, ты бы выбрал...', options: ['Огонь — мощь и преобразование', 'Воздух — лёгкость и скорость', 'Вода — адаптивность и жизнь', 'Земля — надёжность и устойчивость'] },
  { q: 'Что в мире важнее всего?', options: ['Понимать природу вещей', 'Создавать новое вещество', 'Управлять сложной системой', 'Помогать живым существам'] },
  { q: 'Ты пришёл в лабораторию. Что первым делом притягивает твой взгляд?', options: ['Контейнер с реагентами', 'Рабочее место у компьютера с микроконтроллером', 'Диагностическая система организма', 'Панель с сигнальными индикаторами'] },
  { q: 'Где бы тебе хотелось реализовать свои знания?', options: ['На производстве с контролем качества', 'В исследовательской установке', 'В центре цифровых решений', 'В медико-биологическом центре'] },
  { q: 'Что тебе ближе как будущему профессионалу?', options: ['Управление физическими процессами', 'Создание новых технологий для медицины', 'Проектирование электронных схем', 'Разработка производственной линии'] },
  { q: 'Какая рабочая среда тебя вдохновляет?', options: ['Лаборатория', 'Завод или установка', 'Научный институт', 'IT-компания или стартап'] },
  { q: 'Что тебе кажется важнее всего?', options: ['Безопасность и устойчивость', 'Скорость и эффективность', 'Надёжность и точность', 'Инновации и человекоориентированность'] },
  { q: 'Что бы ты выбрал?', options: ['Реактор и защита от нейтронов', 'Микроскоп и живые клетки', 'Чистая комната и наносборка', 'Код и датчики'] },
];

const rules = [
// Ядерные физика и технологии
{ keyword: 'физика', direction: 'Ядерные физика и технологии' },
{ keyword: 'радиация', direction: 'Ядерные физика и технологии' },
{ keyword: 'нейтрон', direction: 'Ядерные физика и технологии' },
{ keyword: 'защита', direction: 'Ядерные физика и технологии' },
{ keyword: 'ядерные', direction: 'Ядерные физика и технологии' },

// Ядерные реакторы и материалы
{ keyword: 'реактор', direction: 'Ядерные реакторы и материалы' },
{ keyword: 'топливо', direction: 'Ядерные реакторы и материалы' },
{ keyword: 'облучение', direction: 'Ядерные реакторы и материалы' },
{ keyword: 'реакторный', direction: 'Ядерные реакторы и материалы' },
{ keyword: 'цепная реакция', direction: 'Ядерные реакторы и материалы' },

// Химическая технология
{ keyword: 'химия', direction: 'Химическая технология' },
{ keyword: 'реагент', direction: 'Химическая технология' },
{ keyword: 'раствор', direction: 'Химическая технология' },
{ keyword: 'вещество', direction: 'Химическая технология' },
{ keyword: 'лаборатория', direction: 'Химическая технология' },

// Химическая технология материалов современной энергетики
{ keyword: 'энергетика', direction: 'Химическая технология материалов современной энергетики' },
{ keyword: 'уран', direction: 'Химическая технология материалов современной энергетики' },
{ keyword: 'переработка', direction: 'Химическая технология материалов современной энергетики' },
{ keyword: 'радиохимия', direction: 'Химическая технология материалов современной энергетики' },
{ keyword: 'ядерное топливо', direction: 'Химическая технология материалов современной энергетики' },

// Биотехнические системы и технологии
{ keyword: 'биология', direction: 'Биотехнические системы и технологии' },
{ keyword: 'физиология', direction: 'Биотехнические системы и технологии' },
{ keyword: 'медицина', direction: 'Биотехнические системы и технологии' },
{ keyword: 'биоинженерия', direction: 'Биотехнические системы и технологии' },
{ keyword: 'экг', direction: 'Биотехнические системы и технологии' },

// Электроника и наноэлектроника
{ keyword: 'интегральные схемы', direction: 'Электроника и наноэлектроника' },
{ keyword: 'транзистор', direction: 'Электроника и наноэлектроника' },
{ keyword: 'платы', direction: 'Электроника и наноэлектроника' },
{ keyword: 'нанотехнологии', direction: 'Электроника и наноэлектроника' },
{ keyword: 'сигнал', direction: 'Электроника и наноэлектроника' },

// Электроника и автоматика физических установок
{ keyword: 'автоматика', direction: 'Электроника и автоматика физических установок' },
{ keyword: 'датчик', direction: 'Электроника и автоматика физических установок' },
{ keyword: 'установка', direction: 'Электроника и автоматика физических установок' },
{ keyword: 'сигнальные цепи', direction: 'Электроника и автоматика физических установок' },
{ keyword: 'микроконтроллер', direction: 'Электроника и автоматика физических установок' },

// Инженерия неразрушающего контроля
{ keyword: 'ультразвук', direction: 'Инженерия неразрушающего контроля' },
{ keyword: 'дефектоскопия', direction: 'Инженерия неразрушающего контроля' },
{ keyword: 'контроль', direction: 'Инженерия неразрушающего контроля' },
{ keyword: 'визуальный осмотр', direction: 'Инженерия неразрушающего контроля' },
{ keyword: 'твердость', direction: 'Инженерия неразрушающего контроля' },

// Наноинженерия
{ keyword: 'нано', direction: 'Наноинженерия' },
{ keyword: 'атом', direction: 'Наноинженерия' },
{ keyword: 'наночастицы', direction: 'Наноинженерия' },
{ keyword: 'микроскоп', direction: 'Наноинженерия' },
{ keyword: 'тонкие пленки', direction: 'Наноинженерия' },

// Прикладные математика и физика
{ keyword: 'математика', direction: 'Прикладные математика и физика' },
{ keyword: 'формула', direction: 'Прикладные математика и физика' },
{ keyword: 'физические законы', direction: 'Прикладные математика и физика' },
{ keyword: 'оптика', direction: 'Прикладные математика и физика' },
{ keyword: 'моделирование', direction: 'Прикладные математика и физика' },

// Информационные системы и технологии
{ keyword: 'программирование', direction: 'Информационные системы и технологии' },
{ keyword: 'информатика', direction: 'Информационные системы и технологии' },
{ keyword: 'данные', direction: 'Информационные системы и технологии' },
{ keyword: 'алгоритм', direction: 'Информационные системы и технологии' },
{ keyword: 'информационные технологии', direction: 'Информационные системы и технологии' },

// Управление качеством
{ keyword: 'качество', direction: 'Управление качеством' },
{ keyword: 'стандартизация', direction: 'Управление качеством' },
{ keyword: 'сертификация', direction: 'Управление качеством' },
{ keyword: 'гост', direction: 'Управление качеством' },
{ keyword: 'анализ', direction: 'Управление качеством' },

// Инноватика
{ keyword: 'инновации', direction: 'Инноватика' },
{ keyword: 'стартап', direction: 'Инноватика' },
{ keyword: 'цифровой двойник', direction: 'Инноватика' },
{ keyword: 'интерфейс', direction: 'Инноватика' },
{ keyword: 'технологическое предпринимательство', direction: 'Инноватика' },
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
  const [isGlowing, setIsGlowing] = useState(false);

  const handleClick = () => {
    setIsGlowing(true);
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={handleClick}
      className="fixed inset-0 flex items-center justify-center bg-black cursor-pointer"
    >
      <div className="relative w-64 h-64">
        {/* Эффект свечения при клике */}
        <AnimatePresence>
          {isGlowing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.3, 0],
              }}
              transition={{ 
                duration: 2,
                times: [0, 0.3, 1],
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-white rounded-full blur-xl"
              style={{
                mixBlendMode: 'screen'
              }}
            />
          )}
        </AnimatePresence>

        {/* Основное изображение */}
        <motion.div
          animate={isGlowing ? {
            opacity: [1, 1, 0]
          } : {}}
          transition={{ 
            duration: 2,
            times: [0, 0.3, 1],
            ease: "easeInOut"
          }}
          className="relative z-10 w-full h-full flex items-center justify-center"
        >
          <div className="relative w-full h-full">
            {/* Постоянное мягкое свечение */}
            <div className="absolute inset-0 w-full h-full">
              <svg viewBox="0 0 1000 1000" className="w-full h-full">
                {/* Свечение орбит */}
                <g className="opacity-30">
                  <ellipse
                    cx="500"
                    cy="500"
                    rx="200"
                    ry="400"
                    fill="none"
                    stroke="white"
                    strokeWidth="40"
                    className="blur-sm"
                    transform="rotate(0 500 500)"
                  />
                  <ellipse
                    cx="500"
                    cy="500"
                    rx="200"
                    ry="400"
                    fill="none"
                    stroke="white"
                    strokeWidth="40"
                    className="blur-sm"
                    transform="rotate(60 500 500)"
                  />
                  <ellipse
                    cx="500"
                    cy="500"
                    rx="200"
                    ry="400"
                    fill="none"
                    stroke="white"
                    strokeWidth="40"
                    className="blur-sm"
                    transform="rotate(120 500 500)"
                  />
                  {/* Свечение ядра */}
                  <circle
                    cx="500"
                    cy="500"
                    r="50"
                    fill="white"
                    className="blur-sm"
                  />
                  {/* Свечение электрона */}
                  <circle
                    cx="500"
                    cy="100"
                    r="25"
                    fill="white"
                    className="blur-sm"
                  />
                </g>
              </svg>
            </div>

            {/* Основные элементы */}
            <svg 
              viewBox="0 0 1000 1000" 
              className="absolute inset-0 w-full h-full text-white"
            >
              {/* Орбиты */}
              <g>
                <ellipse
                  cx="500"
                  cy="500"
                  rx="200"
                  ry="400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="20"
                  transform="rotate(0 500 500)"
                />
                <ellipse
                  cx="500"
                  cy="500"
                  rx="200"
                  ry="400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="20"
                  transform="rotate(60 500 500)"
                />
                <ellipse
                  cx="500"
                  cy="500"
                  rx="200"
                  ry="400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="20"
                  transform="rotate(120 500 500)"
                />

                {/* Ядро */}
                <circle
                  cx="500"
                  cy="500"
                  r="50"
                  fill="currentColor"
                />

                {/* Стационарный электрон */}
                <circle
                  cx="500"
                  cy="100"
                  r="25"
                  fill="currentColor"
                />
              </g>
            </svg>
          </div>
        </motion.div>

        {/* Текст */}
        <motion.div
          animate={isGlowing ? {
            opacity: [1, 0],
            y: [0, 20]
          } : {}}
          transition={{ duration: 0.5 }}
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-full text-center"
        >
          <p className="text-white text-sm">Нажмите, чтобы начать</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function QuizApp() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [chartData, setChartData] = useState<{ direction: string; value: number }[]>([]);
  const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 10;
      const y = (e.clientY / window.innerHeight) * 10;
      setBgPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      className="min-h-screen relative overflow-hidden px-4 py-10 flex items-center justify-center bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500"
    >
      <div className="absolute inset-0 bg-grid opacity-20"></div>
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
              className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl text-center"
            >
              <motion.div 
                className="text-4xl font-bold text-gray-900 mb-6"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {step + 1}
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900">{questions[step].q}</h2>
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
                    className="bg-white shadow-md backdrop-blur-md border-2 border-gray-300 rounded-xl py-4 px-6 text-lg transition-all duration-300 hover:shadow-lg hover:border-green-300 text-gray-900"
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
                        ? 'bg-green-400 border-green-500 scale-110' 
                        : index === step 
                        ? 'bg-white border-green-400 scale-125' 
                        : 'bg-white/50 border-gray-300'
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
              className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold mb-4">✨ Тебе подходит направление:</h2>
                <p className="text-2xl mb-6 text-green-600 font-semibold">{result}</p>
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
                        {chartData.map((entry, index) => (
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
              >
                <button
                  onClick={restart}
                  className="bg-gradient-to-r from-green-400 to-green-500 text-white text-lg rounded-xl px-8 py-3 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Пройти ещё раз
                </button>

                <a
                  href="https://vk.com/ftientrants"
                  target="_blank"
                  className="block mt-4 text-blue-600 hover:text-blue-700 underline text-sm transition-colors"
                >
                  Вступай в нашу группу ВКонтакте — ФТИ | Абитуриентам
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}