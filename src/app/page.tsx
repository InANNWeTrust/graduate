'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

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
  { keyword: 'физика', direction: 'Ядерные физика и технологии' },
  { keyword: 'радиаци', direction: 'Ядерные физика и технологии' },
  { keyword: 'нейтрон', direction: 'Ядерные физика и технологии' },
  { keyword: 'реактор', direction: 'Ядерные реакторы и материалы' },
  { keyword: 'топливо', direction: 'Ядерные реакторы и материалы' },
  { keyword: 'уран', direction: 'Химическая технология материалов современной энергетики' },
  { keyword: 'реагент', direction: 'Химическая технология' },
  { keyword: 'вещество', direction: 'Химическая технология' },
  { keyword: 'биомедицина', direction: 'Биотехнические системы и технологии' },
  { keyword: 'организм', direction: 'Биотехнические системы и технологии' },
  { keyword: 'микроконтроллер', direction: 'Электроника и наноэлектроника' },
  { keyword: 'электроника', direction: 'Электроника и наноэлектроника' },
  { keyword: 'физическая установка', direction: 'Электроника и автоматика физических установок' },
  { keyword: 'автоматика', direction: 'Электроника и автоматика физических установок' },
  { keyword: 'контроль', direction: 'Инженерия неразрушающего контроля' },
  { keyword: 'дефекты', direction: 'Инженерия неразрушающего контроля' },
  { keyword: 'нано', direction: 'Наноинженерия' },
  { keyword: 'микроустройства', direction: 'Наноинженерия' },
  { keyword: 'математика', direction: 'Прикладные математика и физика' },
  { keyword: 'формула', direction: 'Прикладные математика и физика' },
  { keyword: 'информатика', direction: 'Информационные системы и технологии' },
  { keyword: 'данных', direction: 'Информационные системы и технологии' },
  { keyword: 'качество', direction: 'Управление качеством' },
  { keyword: 'инновации', direction: 'Инноватика' },
  { keyword: 'цифровой двойник', direction: 'Инноватика' },
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

export default function QuizApp() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [chartData, setChartData] = useState<{ direction: string; value: number }[]>([]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (step + 1 === questions.length) {
        const scores = getScores(newAnswers);
        const top3 = getTopDirections(scores);
        setResult(top3[0]?.[0] || 'Ты особенный! Придумай своё направление 😊');
        setChartData(top3.map(([direction, value]) => ({ direction, value })));
      } else {
        setStep(step + 1);
      }
    }, 500); // задержка перед переходом
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
    setChartData([]);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-100 p-8 rounded-2xl shadow text-center"
            >
              <div className="text-4xl font-bold text-gray-800 mb-6">{step + 1}</div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">{questions[step].q}</h2>
              <div className="grid gap-4">
                {questions[step].options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.95, opacity: 0 }}
                    onClick={() => handleAnswer(opt)}
                    className="bg-white border-2 border-gray-300 rounded-xl py-4 px-6 text-lg hover:bg-gray-200 transition"
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
              <div className="flex justify-center gap-2 mt-6">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full border transition-all duration-300 ${
                      index <= step ? 'bg-green-200 border-green-300' : 'bg-white border-gray-300'
                    }`}
                  ></div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-yellow-100 p-8 rounded-2xl shadow text-center"
            >
              <h2 className="text-3xl font-bold mb-4">✨ Тебе подходит направление:</h2>
              <p className="text-2xl mb-6">{result}</p>
              {chartData.length > 0 && (
                <div className="w-full h-[300px] mb-6">
                  <ResponsiveContainer>
                    <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 3]} />
                      <YAxis type="category" dataKey="direction" tick={{ fontSize: 14 }} width={220} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#6366f1" isAnimationActive radius={[0, 10, 10, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill="#6366f1" />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
              <button
                onClick={restart}
                className="bg-white border-2 border-gray-600 text-lg rounded-xl px-6 py-3 hover:bg-gray-200 transition"
              >
                Пройти ещё раз
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}