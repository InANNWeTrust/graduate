'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  {
    q: 'Что тебе интереснее в устройстве мира?',
    options: [
      'Изучать ядро и элементарные частицы',
      'Работать с клетками и биосенсорами',
      'Проектировать схемы и электронику',
      'Анализировать процессы с помощью математики'
    ]
  },
  {
    q: 'Твоя исследовательская зона мечты — это…',
    options: [
      'Зал с управляемым реактором',
      'Биомедицинская лаборатория',
      'Производственная линия с датчиками',
      'Чистая комната с нанотехнологиями'
    ]
  },
  {
    q: 'Какой объект тебе интереснее всего изучить?',
    options: [
      'Материалы для реакторов',
      'Механизмы старения живых систем',
      'Сложные технологические цепочки',
      'Молекулы, вещества и их реакции'
    ]
  },
  {
    q: 'Что бы ты с удовольствием собрал?',
    options: [
      'Автоматику для промышленного объекта',
      'Алгоритм контроля качества',
      'Систему управления физической установкой',
      'Интерфейс для цифрового двойника'
    ]
  },
  {
    q: 'Ты создаёшь новый прибор. Что в нём главное?',
    options: [
      'Миниатюрность и точность',
      'Химическая устойчивость',
      'Функции контроля и диагностики',
      'Способность взаимодействовать с организмом'
    ]
  },
  {
    q: 'Тебе предлагают исследование. Что ты выберешь?',
    options: [
      'Изучение свойств топлива для реактора',
      'Создание микроустройства для диагностики',
      'Разработку химтехнологии для энергетики',
      'Контроль качества продукции на производстве'
    ]
  },
  {
    q: 'Какой стиль работы тебе ближе?',
    options: [
      'Работа с оборудованием и схемами',
      'Сбор и анализ больших массивов данных',
      'Исследование и синтез веществ',
      'Проектирование биомедицинских решений'
    ]
  },
  {
    q: 'Ты студент. На какую практику мечтаешь попасть?',
    options: [
      'На физическую установку с контролем',
      'На завод по переработке урана',
      'В лабораторию нейротехнологий',
      'В центр радиационной безопасности'
    ]
  },
  {
    q: 'Какая суперспособность тебе подходит?',
    options: [
      'Понимать наномир',
      'Управлять производственными процессами',
      'Предсказывать физические явления',
      'Находить дефекты в материалах'
    ]
  },
  {
    q: 'Что ближе всего к твоей инженерной философии?',
    options: [
      'Всё должно быть просчитано',
      'Всё должно быть проверено',
      'Всё должно быть эффективно',
      'Всё должно помогать людям'
    ]
  }
];

const rules = [
  { keyword: 'реактор', direction: 'Ядерные реакторы и материалы' },
  { keyword: 'уран', direction: 'Химическая технология материалов современной энергетики' },
  { keyword: 'дефекты', direction: 'Инженерия неразрушающего контроля' },
  { keyword: 'физическая установка', direction: 'Электроника и автоматика физических установок' },
  { keyword: 'данных', direction: 'Информационные системы и технологии' },
  { keyword: 'био', direction: 'Биотехнические системы и технологии' },
  { keyword: 'схемами', direction: 'Электроника и наноэлектроника' },
  { keyword: 'математика', direction: 'Прикладные математика и физика' },
  { keyword: 'хим', direction: 'Химическая технология' },
  { keyword: 'качество', direction: 'Управление качеством' },
  { keyword: 'нано', direction: 'Наноинженерия' },
  { keyword: 'интерфейс', direction: 'Инноватика' },
  { keyword: 'радиац', direction: 'Ядерные физика и технологии' }
];

function predictDirection(answers: string[]): string {
  const text = answers.join(' ').toLowerCase();
  for (const rule of rules) {
    if (text.includes(rule.keyword)) {
      return rule.direction;
    }
  }
  return 'Ты особенный! Придумай своё направление 😊';
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

  const restart = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
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
              <p className="text-2xl mb-6">{result}</p>
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