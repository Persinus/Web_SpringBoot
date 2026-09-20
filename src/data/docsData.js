export const sectionData = [
  {
    id: 'fundamentals', number: '01', title: 'Java Fundamentals',
    lessons: [
      ['what-is-java', 'Java là gì — JVM, JDK, JRE'], ['jdk-project', 'Cài đặt JDK và cấu trúc Java Project'], ['basic-syntax', 'Cú pháp Java cơ bản'], ['variables', 'Biến và kiểu dữ liệu'], ['type-casting', 'Type Casting'], ['operators', 'Toán tử'], ['input-output', 'Input / Output'], ['if-else', 'if / else'], ['switch', 'switch'], ['loops', 'for / while / do-while'], ['break-continue', 'break / continue'], ['array', 'Array'], ['string', 'String'], ['method', 'Method'], ['scope-keyword', 'Scope và Keyword'],
    ],
  },
  {
    id: 'oop', number: '02', title: 'Object-Oriented Programming',
    lessons: [
      ['class-and-object', 'Class và Object'], ['constructor', 'Constructor'], ['this', 'this'], ['access-modifier', 'Access Modifier'], ['encapsulation', 'Encapsulation'], ['static', 'Static'], ['inheritance', 'Inheritance'], ['super', 'super'], ['polymorphism', 'Polymorphism'], ['overloading', 'Method Overloading'], ['overriding', 'Method Overriding'], ['abstract-class', 'Abstract Class'], ['interface', 'Interface'], ['composition', 'Composition'], ['enum', 'Enum'],
    ],
  },
  {
    id: 'collections', number: '03', title: 'Collections & Generics',
    lessons: [
      ['arraylist', 'ArrayList'], ['linkedlist', 'LinkedList'], ['hashset-treeset', 'HashSet và TreeSet'], ['hashmap-treemap', 'HashMap và TreeMap'], ['queue-deque', 'Queue và Deque'], ['iterator', 'Iterator'], ['comparable', 'Comparable'], ['comparator', 'Comparator'], ['generics', 'Generics'],
    ],
  },
  {
    id: 'exception-api', number: '04', title: 'Exception & Java API',
    lessons: [
      ['exception', 'Exception'], ['try-catch-finally', 'try / catch / finally'], ['throw-throws', 'throw / throws'], ['custom-exception', 'Custom Exception'], ['wrapper-class', 'Wrapper Class'], ['date-time', 'Date / Time API'], ['math-utility', 'Math và Utility API'], ['regular-expression', 'Regular Expression'],
    ],
  },
  {
    id: 'modern', number: '05', title: 'Modern Java',
    lessons: [
      ['lambda', 'Lambda Expression'], ['functional-interface', 'Functional Interface'], ['method-reference', 'Method Reference'], ['optional', 'Optional'], ['stream-api', 'Stream API'], ['stream-operations', 'Stream Operations'], ['parallel-stream', 'Parallel Stream'],
    ],
  },
  {
    id: 'advanced', number: '06', title: 'Advanced Java',
    lessons: [
      ['file-io', 'File I/O'], ['byte-character-stream', 'Byte Stream và Character Stream'], ['serialization', 'Serialization'], ['thread', 'Thread'], ['runnable-callable', 'Runnable và Callable'], ['thread-synchronization', 'Thread Synchronization'], ['executor-service', 'ExecutorService'], ['future-completable-future', 'Future và CompletableFuture'], ['concurrent-collections', 'Concurrent Collections'], ['jvm-memory', 'JVM Memory'], ['garbage-collection', 'Garbage Collection'], ['reflection', 'Reflection'], ['annotation', 'Annotation'], ['module-system', 'Java Module System'],
    ],
  },
]

export const modules = [
  { id: 'java', label: 'Java', tone: 'teal' },
  { id: 'english', label: 'English', tone: 'blue' },
  { id: 'japanese', label: '日本語', tone: 'rose' },
  { id: 'react', label: 'React', tone: 'cyan' },
  { id: 'mysql', label: 'MySQL', tone: 'amber' },
]

export const moduleLessons = {
  english: [['basics', 'English Basics'], ['vocabulary', 'Everyday Vocabulary'], ['grammar', 'Basic Grammar'], ['conversation', 'Conversation Practice']],
  japanese: [['hiragana', 'Hiragana'], ['katakana', 'Katakana'], ['basic-grammar', 'Basic Grammar'], ['conversation', '会話練習']],
  react: [['jsx', 'JSX & Components'], ['props-state', 'Props & State'], ['hooks', 'React Hooks'], ['api-ui', 'Build a UI']],
  mysql: [['intro', 'MySQL Basics'], ['tables', 'Tables & Relationships'], ['queries', 'Query Fundamentals'], ['practice', 'Query Practice']],
}

export const englishDictionary = [
  ['learn', 'học', 'I learn Java every day.'], ['practice', 'luyện tập', 'Practice makes progress.'], ['understand', 'hiểu', 'I understand this lesson.'], ['build', 'xây dựng', 'We build useful projects.'], ['improve', 'cải thiện', 'I want to improve my English.'], ['review', 'ôn tập', 'Review the notes before sleeping.'], ['knowledge', 'kiến thức', 'Knowledge grows with practice.'], ['skill', 'kỹ năng', 'Reading is an important skill.'],
]
