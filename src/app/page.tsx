'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

type Track = 'Физический' | 'Химический' | 'IT + биотех';
type TrackScore = Record<Track, number>;

type QuizOption = {
  text: string;
  score: TrackScore;
};

type QuizQuestion = {
  q: string;
  options: QuizOption[];
};

const baseScore = (): TrackScore => ({
  'Физический': 0,
  'Химический': 0,
  'IT + биотех': 0,
});

const score = (it: number, physical: number, chemical: number): TrackScore => ({
  'IT + биотех': it,
  'Физический': physical,
  'Химический': chemical,
});

const uiAccent = 'bg-[linear-gradient(90deg,#173E75_0%,#DB3931_100%)]';
const uiButtonRed = 'bg-[#DB3931] text-white';

const questions: QuizQuestion[] = [
  {
    q: 'Какие предметы тебе правда нравятся?',
    options: [
      { text: 'Информатика', score: score(4, 1, 0) },
      { text: 'Биология', score: score(4, 0, 1) },
      { text: 'Физика', score: score(1, 4, 1) },
      { text: 'Химия', score: score(0, 1, 4) },
      { text: 'Математика', score: score(2, 3, 1) },
    ],
  },
  {
    q: 'После уроков ты чаще всего...',
    options: [
      { text: 'Придумываю тех-решения', score: score(4, 1, 0) },
      { text: 'Разбираюсь в устройствах', score: score(0, 4, 1) },
      { text: 'Проверяю идеи опытом', score: score(0, 1, 4) },
    ],
  },
  {
    q: 'Какой вайб проекта тебе ближе?',
    options: [
      { text: 'Цифровой и умный', score: score(4, 1, 0) },
      { text: 'Точный и инженерный', score: score(1, 4, 1) },
      { text: 'Живой и лабораторный', score: score(0, 1, 4) },
    ],
  },
  {
    q: 'Мем, который про тебя:',
    options: [
      { text: 'Ещё тест, и всё ясно', score: score(4, 0, 0) },
      { text: 'Не работает? Сейчас разберёмся.', score: score(0, 4, 0) },
      { text: 'Поменяло цвет? День удался.', score: score(0, 0, 4) },
    ],
  },
  {
    q: 'На экскурсии тебя зацепит в первую очередь...',
    options: [
      { text: 'Данные и решения', score: score(4, 1, 0) },
      { text: 'Приборы и механизмы', score: score(0, 4, 1) },
      { text: 'Лаборатория и опыты', score: score(0, 1, 4) },
    ],
  },
  {
    q: 'Если делать мини-стартап, то что в основе?',
    options: [
      { text: 'Умный сервис', score: score(4, 0, 1) },
      { text: 'Собранное устройство', score: score(1, 4, 0) },
      { text: 'Новый материал', score: score(0, 1, 4) },
    ],
  },
  {
    q: 'Что тебе интереснее: найти закономерность, собрать систему или получить новый результат?',
    options: [
      { text: 'Найти закономерность', score: score(4, 0, 0) },
      { text: 'Собрать систему', score: score(1, 4, 1) },
      { text: 'Получить новый результат', score: score(0, 1, 4) },
    ],
  },
  {
    q: 'Какой "рабочий стол" кажется самым уютным?',
    options: [
      { text: 'Ноутбук и анализ', score: score(4, 1, 0) },
      { text: 'Чертежи, инструменты и техника', score: score(0, 4, 1) },
      { text: 'Весы, стол и баночки', score: score(0, 1, 4) },
    ],
  },
  {
    q: 'Какой результат радует сильнее всего?',
    options: [
      { text: 'Точный вывод из данных', score: score(4, 0, 1) },
      { text: 'Схема работает точно', score: score(0, 4, 1) },
      { text: 'Опыт дал чёткий эффект', score: score(0, 1, 4) },
    ],
  },
  {
    q: 'Куда пойдешь завтра, если выбирать по интересу?',
    options: [
      { text: 'Туда, где данные и технологии', score: score(4, 0, 1) },
      { text: 'Туда, где приборы и установки', score: score(0, 4, 1) },
      { text: 'Туда, где идут исследования', score: score(0, 1, 4) },
    ],
  },
];

const trackQuotes: Record<Track, { quote: string; author: string; glow: string }> = {
  'IT + биотех': {
    quote: 'Те, кто достаточно безумен, чтобы думать, что могут изменить мир, обычно именно это и делают.',
    author: 'Стив Джобс',
    glow: 'shadow-[0_24px_80px_rgba(16,185,129,0.22)]',
  },
  'Физический': {
    quote: 'Важно не переставать задавать вопросы.',
    author: 'Альберт Эйнштейн',
    glow: 'shadow-[0_24px_80px_rgba(250,204,21,0.22)]',
  },
  'Химический': {
    quote: 'В жизни нечего бояться, её нужно только понять.',
    author: 'Мария Склодовская-Кюри',
    glow: 'shadow-[0_24px_80px_rgba(74,222,128,0.22)]',
  },
};

function getScores(answers: QuizOption[]) {
  return answers.reduce<TrackScore>((acc, answer) => {
    acc['IT + биотех'] += answer.score['IT + биотех'];
    acc['Физический'] += answer.score['Физический'];
    acc['Химический'] += answer.score['Химический'];
    return acc;
  }, baseScore());
}

function shuffleOptions(options: QuizOption[]) {
  const copy = [...options];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getTopTrack(scoreMap: Record<Track, number>): Track {
  const entries = Object.entries(scoreMap) as [Track, number][];
  return entries.sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'Физический';
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
  const letters = ['Ф', 'И', 'З', 'Т', 'Е', 'Х'];
  const framedLetters = new Set(['Ф', 'Т', 'Х']);

  const handleStart = () => {
    if (showLetters) return;

    setShowLetters(true);
    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        onComplete();
      }, 900);
    }, 2400);
  };

  return (
    <motion.div
      animate={{ opacity: fadeOut ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
      onClick={handleStart}
      onPointerUp={handleStart}
      onTouchEnd={handleStart}
      role="button"
      tabIndex={0}
      className="fixed inset-0 flex flex-col items-center justify-center bg-black cursor-pointer touch-manipulation"
    >
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(255,255,255,0.12), rgba(225,26,99,0.18) 35%, rgba(0,0,0,0.95) 70%)',
        }}
      />

      <motion.div
        className="absolute w-[420px] h-[420px] rounded-full border border-white/10"
        animate={{ scale: [0.95, 1.04, 0.95], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative w-64 h-64 mb-8 z-10">
        <motion.svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
        >
          <motion.circle
            cx="50"
            cy="50"
            r="8"
            fill="white"
            initial={{ scale: 0.8, opacity: 0.45 }}
            animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {[0, 60, 120].map((rotation, idx) => (
            <motion.ellipse
              key={rotation}
              cx="50"
              cy="50"
              rx="40"
              ry="15"
              fill="none"
              stroke="white"
              strokeWidth="0.9"
              transform={`rotate(${rotation} 50 50)`}
              initial={{ opacity: 0.2 }}
              animate={{ opacity: [0.2, 0.65, 0.2], strokeWidth: [0.7, 1.2, 0.7] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: idx * 0.2,
              }}
            />
          ))}

          {[0, 60, 120].map((rotation, idx) => (
            <motion.g
              key={`electron-${rotation}`}
              style={{ transformOrigin: '50px 50px' }}
              transform={`rotate(${rotation} 50 50)`}
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 4 + idx,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <motion.circle
                cx="90"
                cy="50"
                r="3.2"
                fill="#e11a63"
                animate={{ opacity: [0.5, 1, 0.5], scale: [0.85, 1.2, 0.85] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.g>
          ))}
        </motion.svg>
      </div>

      <div className="flex items-center gap-2 z-10">
        {letters.map((letter, index) => {
          const framed = framedLetters.has(letter);

          return (
            <motion.div
              key={letter}
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={
                framed
                  ? { opacity: 1, y: 0, scale: 1 }
                  : showLetters
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0.45, y: 0, scale: 1 }
              }
              transition={{
                duration: 0.45,
                delay: showLetters && !framed ? index * 0.1 : 0,
                ease: 'easeOut',
              }}
              className={framed ? 'relative' : ''}
            >
              {framed ? (
                <motion.div
                  animate={{ boxShadow: ['0 0 10px #e11a63', '0 0 24px #e11a63', '0 0 10px #e11a63'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-14 h-14 border-2 border-[#e11a63] flex items-center justify-center"
                >
                  <motion.span
                    initial={{ opacity: 1, filter: 'blur(0px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className={`text-2xl font-bold text-white uppercase ${montserrat.className}`}
                  >
                    {letter}
                  </motion.span>
                </motion.div>
              ) : (
                <motion.span
                  animate={{ textShadow: ['0 0 8px #fff', '0 0 16px #fff', '0 0 8px #fff'] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  className={`text-2xl font-bold text-white uppercase ${montserrat.className}`}
                >
                  {letter}
                </motion.span>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={
          showLetters
            ? { opacity: 0, y: -8 }
            : { opacity: [0.45, 1, 0.45], y: [0, -2, 0] }
        }
        transition={{ duration: 1.4, repeat: showLetters ? 0 : Infinity, ease: 'easeInOut' }}
        className="mt-8 z-10"
      >
        <p className={`text-white text-xs tracking-[0.12em] ${montserrat.className}`}>
          Нажмите, чтобы продолжить
        </p>
      </motion.div>
    </motion.div>
  );
}
export default function QuizApp() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizOption[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [quizQuestions] = useState<QuizQuestion[]>(() =>
    questions.map((question) => ({
      ...question,
      options: shuffleOptions(question.options),
    })),
  );
  const [selectedOptions, setSelectedOptions] = useState<QuizOption[][]>(
    Array.from({ length: questions.length }, () => []),
  );

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

  const handleOptionSelect = (option: QuizOption, questionIndex: number) => {
    setSelectedOptions((prev) => {
      const next = [...prev];

      if (questionIndex === 0) {
        const exists = next[questionIndex].some((selected) => selected.text === option.text);
        next[questionIndex] = exists
          ? next[questionIndex].filter((selected) => selected.text !== option.text)
          : [...next[questionIndex], option];
      } else {
        next[questionIndex] = [option];
      }

      return next;
    });
  };

  const handleNext = () => {
    const currentAnswers = selectedOptions[step];
    if (currentAnswers.length === 0) return;

    const newAnswers = [...answers, ...currentAnswers];
    setAnswers(newAnswers);

    if (step + 1 === quizQuestions.length) {
      const scores = getScores(newAnswers);
      const topTrack = getTopTrack(scores);
      setResult(topTrack);
      setTimeout(triggerConfetti, 500);
    } else {
      setStep(step + 1);
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
    setSelectedOptions(Array.from({ length: quizQuestions.length }, () => []));
  };

  const isMultiSelectStep = step === 0;
  const isNextEnabled = selectedOptions[step].length > 0;
  const resultTrack = result as Track | null;
  const resultQuote = resultTrack ? trackQuotes[resultTrack] : null;

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
              <h2 className="mb-3 text-2xl font-bold text-[#173E75] md:text-2xl">{quizQuestions[step].q}</h2>
              <p className="text-sm text-gray-500 mb-4">{isMultiSelectStep ? 'Можно выбрать несколько вариантов' : 'Выбери один вариант'}</p>
              <div className="grid gap-4">
                {quizQuestions[step].options.map((opt, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-xl p-[2px] shadow-xl transition-all duration-300 ${
                      selectedOptions[step].some((selected) => selected.text === opt.text)
                        ? uiAccent
                        : 'bg-gray-300 hover:bg-[linear-gradient(90deg,#173E75_0%,#DB3931_100%)]'
                    }`}
                  >
                    <button
                      onClick={() => handleOptionSelect(opt, step)}
                      className={`w-full whitespace-nowrap rounded-[10px] px-3 py-3 text-[11px] font-semibold tracking-[-0.01em] transition-all duration-300 sm:px-4 sm:text-sm md:px-6 md:py-4 md:text-lg ${
                        selectedOptions[step].some((selected) => selected.text === opt.text)
                          ? `${uiAccent} text-white shadow-lg`
                          : 'bg-white text-gray-900 hover:bg-[linear-gradient(90deg,#173E75_0%,#DB3931_100%)] hover:text-white'
                      }`}
                    >
                      {opt.text}
                    </button>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-center gap-2 mt-8">
                {quizQuestions.map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.5 }}
                    animate={{ 
                      scale: 1,
                      transition: { delay: index * 0.05 }
                    }}
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                      index < step 
                        ? 'bg-[#173E75] border-[#173E75] scale-110' 
                        : index === step 
                        ? 'bg-white border-[#DB3931] scale-125' 
                        : 'bg-white border-gray-400'
                    }`}
                  ></motion.div>
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleNext}
                  disabled={!isNextEnabled}
                  className={`${
                    isNextEnabled
                      ? uiButtonRed
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  } text-lg rounded-xl px-8 py-3 hover:shadow-lg transition-all duration-300 hover:scale-105 font-semibold`}
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
                <h2 className="text-2xl font-bold mb-3 text-gray-900">✨ Тебе подходит трек:</h2>
                <p className="mb-6 text-5xl font-extrabold text-[#173E75] md:text-6xl">
                  {result}
                </p>
                {resultQuote && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className={`relative mb-10 overflow-hidden rounded-[30px] border border-white/45 bg-white/20 p-8 text-left backdrop-blur-2xl ${resultQuote.glow}`}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.3),rgba(255,255,255,0.08))]" />
                    <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-white/25 blur-3xl" />
                    <div className="absolute -left-12 bottom-0 h-32 w-32 rounded-full bg-white/20 blur-3xl" />
                    <div className="relative">
                      <blockquote className="relative max-w-3xl pl-16 pt-3 text-lg font-medium leading-relaxed text-gray-900 md:pl-20 md:text-xl">
                        <span className="absolute left-0 top-[-14px] text-[6.5rem] font-semibold leading-none text-[#DB3931] opacity-90 md:top-[-20px] md:text-[8rem]">
                          &ldquo;
                        </span>
                        {resultQuote.quote}
                      </blockquote>
                      <p className="mt-7 text-right text-xl font-bold tracking-[0.04em] text-gray-700 md:text-2xl">
                        {resultQuote.author}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="space-y-4"
              >
                <button
                  onClick={restart}
                  className={`${uiButtonRed} text-lg rounded-xl px-8 py-3 hover:shadow-lg transition-all duration-300 hover:scale-105 font-semibold`}
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
