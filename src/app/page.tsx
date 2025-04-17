'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  { q: "Какую роль ты бы хотел играть в команде будущего проекта?", options: ["Тот, кто отвечает за точность и замеры", "Разработчик цифрового ядра", "Создаю, проектирую, масштабирую", "Химичу, пока не получится"] },
  { q: "Ты в пустыне и находишь странный прибор. Что первым делом сделаешь?", options: ["Разберу и соберу заново", "Подключу к питанию и проверю выходной сигнал", "Сканирую и опишу структуру", "Попробую понять, для чего он нужен"] },
  { q: "Какой тип задач тебя вдохновляет больше всего?", options: ["Те, что требуют системного подхода и схем", "Те, где нужно быть ближе к живому организму", "Те, где нужна абстракция и математика", "Те, где руками и головой — в лаборатории"] },
  { q: "Что из этого тебе ближе по духу?", options: ["Придумать нестандартную систему контроля", "Разработать интерфейс на границе технологий и человека", "Исследовать свойства неизвестных веществ", "Поработать с микроскопами и датчиками"] },
  { q: "Ты попал в лабораторию мечты. Там есть:...", options: ["Наборы плат, паяльники и осциллограф", "Нанооборудование и спектрометр", "Реакторы, пробирки и запах химии", "Куча данных, датчиков и графиков"] },
  { q: "В тебе просыпается исследователь. Куда пойдёшь?", options: ["В реакторный зал — там интересно", "В область биосенсоров и диагностики", "К лазерам, оптике и анализу изображений", "В нанообъекты и поверхности"] },
  { q: "Ты проектируешь продукт. Что главное?", options: ["Надёжность, точность и контроль", "Минимизация, технологии и будущее", "Влияние на организм и эффективность", "Оптимизация процессов и автоматизация"] },
  { q: "Какое высказывание тебе ближе?", options: ["Без физики мы ничего не поймём", "Без химии мы ничего не создадим", "Без данных мы ничего не узнаем", "Без контроля мы всё испортим"] },
  { q: "Что ты чаще представляешь?", options: ["Потоки нейтронов и защитные оболочки", "Роботизированную операцию", "Процесс осаждения наночастиц", "Проект нового технологического процесса"] },
  { q: "Твоя суперсила как инженера — это...", options: ["Анализ и контроль", "Интуиция и моделирование", "Реакции и преобразования", "Микромир и сверхточность"] }
];

const rules = [
  { keyword: "реактор", direction: "Ядерные реакторы и материалы" },
  { keyword: "нейтрон", direction: "Ядерные физика и технологии" },
  { keyword: "осциллограф", direction: "Электроника и наноэлектроника" },
  { keyword: "живому организму", direction: "Биотехнические системы и технологии" },
  { keyword: "математика", direction: "Прикладные математика и физика" },
  { keyword: "нано", direction: "Наноинженерия" },
  { keyword: "химия", direction: "Химическая технология" },
  { keyword: "автоматизация", direction: "Информационные системы и технологии" },
  { keyword: "контроль", direction: "Инженерия неразрушающего контроля" },
  { keyword: "качество", direction: "Управление качеством" },
  { keyword: "интерфейс", direction: "Инноватика" },
  { keyword: "анализ", direction: "Инженерия неразрушающего контроля" }
];

function predictDirection(answers: string[]): string {
  const text = answers.join(" ").toLowerCase();
  for (const rule of rules) {
    if (text.includes(rule.keyword.toLowerCase())) {
      return rule.direction;
    }
  }
  return "Ты особенный! Придумай своё направление 😊";
}

export default function QuizApp() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (step + 1 === questions.length) {
      const prediction = predictDirection(newAnswers);
      setResult(prediction);
    } else {
      setStep(step + 1);
    }
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
              <div className="text-sm text-gray-500 mb-2">
                Вопрос {step + 1} из {questions.length}
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                {questions[step].q}
              </h2>
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
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-yellow-100 p-8 rounded-2xl shadow text-center"
            >
              <h2 className="text-3xl font-bold mb-4">✨ Результат:</h2>
              <p className="text-2xl">{result}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}