import { Component, lazy, Suspense, useEffect, useMemo, useState } from 'react'
import './App.css'
import { englishDictionary, moduleLessons, modules } from './data/docsData'
import ReactMarkdown from 'react-markdown'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { FiArrowLeft, FiArrowRight, FiArrowUp, FiBookOpen, FiCheck, FiChevronDown, FiChevronLeft, FiChevronRight, FiClipboard, FiCode, FiCoffee, FiCpu, FiDatabase, FiGitBranch, FiHelpCircle, FiHome, FiLayers, FiMap, FiMenu, FiMoon, FiMousePointer, FiSearch, FiShield, FiSun, FiTrendingUp, FiVolume2, FiVolumeX, FiX, FiZap } from 'react-icons/fi'
import 'react-circular-progressbar/dist/styles.css'
import { Howl } from 'howler'
import { motion } from 'motion/react'
import { Toaster, toast } from 'sonner'
import { Command } from 'cmdk'
import { Drawer } from 'vaul'
import { useHotkeys } from 'react-hotkeys-hook'
import { Joyride, STATUS } from 'react-joyride'

const uiSound = new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'], volume: 0.18, preload: true })
const InteractiveLab = lazy(() => import('./components/InteractiveLab'))
const lessonMarkdownFiles = import.meta.glob('./data/lessons/*.md', { eager: true, query: '?raw', import: 'default' })

const sectionData = [
  {
    id: 'fundamentals', number: '01', title: 'Java Fundamentals',
    lessons: [
      ['intellij-idea', 'Bài 0: Cách sử dụng IntelliJ IDEA'], ['what-is-java', 'Java là gì — JVM, JDK, JRE'], ['jdk-project', 'Cài đặt JDK và cấu trúc Java Project'], ['basic-syntax', 'Cú pháp Java cơ bản'], ['variables', 'Biến và kiểu dữ liệu'], ['type-casting', 'Type Casting'], ['operators', 'Toán tử'], ['input-output', 'Input / Output'], ['if-else', 'if / else'], ['switch', 'switch'], ['loops', 'for / while / do-while'], ['break-continue', 'break / continue'], ['array', 'Array'], ['string', 'String'], ['method', 'Method'], ['scope-keyword', 'Scope và Keyword'],
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

const specialLessons = {
  'intellij-idea': {
    description: 'Hướng dẫn sử dụng IntelliJ IDEA để tạo và chạy Java Project đầu tiên.',
    code: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, IntelliJ IDEA");
  }
}`,
    concept: 'IntelliJ IDEA là IDE giúp viết code, quản lý project, tự động hoàn thành, chạy và debug chương trình Java trong cùng một nơi.',
    useCases: 'Dùng IntelliJ IDEA để học Java, quản lý project Maven hoặc Gradle, chạy test và debug ứng dụng Spring Boot.',
    sections: [
      ['Mục tiêu bài học', 'Sau bài này, bạn có thể cài JDK, tạo Java Project, tạo class Main và chạy chương trình Java đầu tiên trong IntelliJ IDEA.'],
      ['Chuẩn bị JDK', 'Cài JDK 17 hoặc một phiên bản LTS mới hơn. Mở IntelliJ IDEA, chọn New Project và kiểm tra mục JDK đã trỏ đến đúng thư mục JDK trên máy.'],
      ['Tạo Java Project', 'Trong cửa sổ New Project, chọn Java ở thanh bên trái. Đặt tên project, chọn thư mục lưu và giữ build system là IntelliJ nếu bạn chỉ muốn học Java cơ bản. Nhấn Create để tạo project.'],
      ['Tạo class đầu tiên', 'Trong Project ở bên trái, mở thư mục src. Nhấp chuột phải vào src, chọn New > Java Class, đặt tên là Main rồi nhấn Enter. IntelliJ sẽ tạo file Main.java.'],
      ['Viết chương trình', 'Mở Main.java và thêm hàm main. Tên file và tên class phải trùng nhau để Java biên dịch đúng.'],
      ['Ví dụ code Java', `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, IntelliJ IDEA");
  }
}`],
      ['Chạy project', 'Nhấn nút tam giác màu xanh cạnh hàm main rồi chọn Run Main.main(). Bạn cũng có thể dùng phím tắt Shift + F10. Kết quả sẽ xuất hiện trong cửa sổ Run ở phía dưới.'],
      ['Debug chương trình', 'Đặt breakpoint bằng cách nhấp vào lề trái của dòng code. Nhấn Shift + F9 để chạy debug, sau đó dùng Step Over để chạy từng dòng và quan sát giá trị biến.'],
      ['Lỗi thường gặp', 'Nếu IntelliJ báo thiếu JDK, mở File > Project Structure và chọn lại SDK. Nếu không thấy nút Run, hãy kiểm tra class có đúng public static void main(String[] args) hay chưa.'],
      ['Tóm tắt', 'Quy trình cơ bản là: cài JDK, tạo Java Project, tạo class trong src, viết hàm main, chạy bằng Run và kiểm tra lỗi bằng Debug.'],
    ],
  },
  'what-is-java': {
    description: 'Hiểu Java là gì và phân biệt vai trò của JVM, JDK và JRE.',
    code: `public class HelloJava {
  public static void main(String[] args) {
    System.out.println("Hello, Java");
  }
}`,
    concept: 'Java biên dịch mã nguồn thành bytecode. JVM thực thi bytecode đó trên từng hệ điều hành, tạo nên khả năng viết một lần và chạy ở nhiều nơi.',
    useCases: 'Dùng khi cần nền tảng ngôn ngữ ổn định, hệ sinh thái lớn và khả năng chạy đa nền tảng.',
  },
  variables: {
    description: 'Nắm cách khai báo biến, kiểu nguyên thủy và kiểu tham chiếu trong Java.',
    code: `int age = 20;
double score = 9.5;
String name = "Mai";
final int MAX_RETRY = 3;`,
    concept: 'Biến là tên gắn với một vùng dữ liệu. Java kiểm tra kiểu tĩnh nên kiểu của biến được xác định khi biên dịch.',
    useCases: 'Chọn kiểu nguyên thủy cho giá trị đơn giản và kiểu tham chiếu khi làm việc với object hoặc dữ liệu có hành vi.',
  },
  'class-and-object': {
    description: 'Phân biệt class như bản thiết kế và object như một thực thể được tạo ra từ bản thiết kế đó.',
    code: `class Student {
  String name;

  void study() {
    System.out.println(name + " is studying");
  }
}

Student student = new Student();`,
    concept: 'Class mô tả state và behavior. Object giữ state cụ thể trong bộ nhớ và gọi được behavior của class.',
    useCases: 'Dùng class để gom dữ liệu và hành vi liên quan thành một abstraction rõ ràng.',
  },
  arraylist: {
    description: 'Làm việc với danh sách có kích thước linh hoạt bằng ArrayList.',
    code: `List<String> names = new ArrayList<>();
names.add("An");
names.add("Binh");

for (String name : names) {
  System.out.println(name);
}`,
    concept: 'ArrayList dùng một mảng bên trong và tự mở rộng khi cần. Truy cập theo index nhanh, nhưng chèn giữa danh sách có thể tốn chi phí dịch phần tử.',
    useCases: 'Chọn ArrayList khi cần đọc phần tử theo index thường xuyên và số lần chèn ở giữa không lớn.',
  },
  lambda: {
    description: 'Viết behavior ngắn gọn bằng Lambda Expression và truyền behavior như một giá trị.',
    code: `List<String> names = List.of("An", "Binh", "Chi");
names.forEach(name -> System.out.println(name));`,
    concept: 'Lambda là biểu thức đại diện cho một hàm không tên. Java dùng nó cùng functional interface để truyền logic vào method.',
    useCases: 'Dùng cho callback, xử lý collection và những behavior ngắn, không cần tạo class riêng.',
  },
  thread: {
    description: 'Hiểu Thread và cách một chương trình Java thực hiện nhiều luồng công việc.',
    code: `Thread worker = new Thread(() -> {
  System.out.println("Working...");
});

worker.start();`,
    concept: 'Thread là đơn vị thực thi độc lập trong một process. Gọi start() tạo luồng mới; gọi run() trực tiếp chỉ chạy như một method bình thường.',
    useCases: 'Dùng khi một tác vụ có thể chạy độc lập và cần tránh chặn luồng đang xử lý công việc chính.',
  },
}

const allLessons = sectionData.flatMap((section) => section.lessons.map(([slug, title]) => ({ slug, title, section })))

const difficultyLevels = {
  'intellij-idea': 'Beginner',
  'what-is-java': 'Beginner',
  'jdk-project': 'Beginner',
  'basic-syntax': 'Beginner',
  variables: 'Beginner',
  'class-and-object': 'Intermediate',
  arraylist: 'Intermediate',
  lambda: 'Advanced',
  thread: 'Advanced',
}

const quizData = {
  'intellij-idea': [
    { question: 'File nào chứa mã nguồn Java của project?', options: ['src', 'out', 'idea', 'resources'], answer: 0 },
    { question: 'Phím tắt nào chạy chương trình trong IntelliJ IDEA?', options: ['Shift + F10', 'Shift + F9', 'Ctrl + C', 'Alt + F4'], answer: 0 },
    { question: 'Muốn tạo class Java mới trong src, bạn chọn thao tác nào?', options: ['New > Java Class', 'File > Invalidate', 'Run > Attach', 'View > Tool Windows'], answer: 0 },
  ],
  'what-is-java': [
    { question: 'Thành phần nào thực thi Java bytecode?', options: ['JVM', 'JDK', 'IDE', 'Maven'], answer: 0 },
    { question: 'JDK dùng để làm gì?', options: ['Phát triển và chạy Java', 'Chỉ lưu file', 'Chỉ debug CSS', 'Quản lý database'], answer: 0 },
  ],
}

const roadmapNodes = [
  { id: 'java', label: 'Java Core', detail: 'Nền tảng ngôn ngữ', tone: 'teal' },
  { id: 'spring-boot', label: 'Spring Boot', detail: 'Xây dựng REST API', tone: 'green' },
  { id: 'mysql', label: 'MySQL', detail: 'Lưu trữ dữ liệu', tone: 'amber' },
  { id: 'react', label: 'React', detail: 'Xây dựng giao diện', tone: 'cyan' },
]

function parseLessonMarkdown(source, slug) {
  const titleMatch = source.match(/^# ([^\n]+)$/m)
  const body = source.replace(/^# [^\n]+\n?/, '')
  const title = titleMatch?.[1] || slug
  return [slug, { title: title.trim(), markdown: body.trim(), sections: (() => {
    const headingMatches = [...body.matchAll(/^## ([^\n]+)$/gm)]
    const sections = headingMatches.map((match, index) => {
      const contentStart = match.index + match[0].length
      const contentEnd = headingMatches[index + 1]?.index || body.length
      return [match[1].trim(), body.slice(contentStart, contentEnd).trim()]
    })
    return sections
  })() }]
}

const markdownLessons = Object.fromEntries(Object.entries(lessonMarkdownFiles).map(([path, source]) => parseLessonMarkdown(source, path.split('/').pop().replace('.md', ''))))

function ModuleIcon({ moduleId }) {
  if (moduleId === 'java') return <FiCoffee />
  if (moduleId === 'spring-boot') return <FiLayers />
  if (moduleId === 'mysql') return <FiDatabase />
  if (moduleId === 'react') return <FiCode />
  return <FiBookOpen />
}

const lessonVisuals = {
  'intellij-idea': ['IDE WORKSPACE', FiCode],
  'what-is-java': ['JVM RUNTIME', FiCpu],
  'jdk-project': ['PROJECT SETUP', FiLayers],
  'class-and-object': ['OBJECT MODEL', FiGitBranch],
  arraylist: ['COLLECTIONS', FiLayers],
  exception: ['ERROR FLOW', FiShield],
  thread: ['CONCURRENCY', FiZap],
}

const lessonDiagramAssets = {
  'intellij-idea': ['/illustrations/intellij-idea.svg', 'Sơ đồ thao tác IntelliJ IDEA'],
  'what-is-java': ['/illustrations/java-runtime.svg', 'Sơ đồ JDK, JRE và JVM'],
  'class-and-object': ['/illustrations/oop.svg', 'Sơ đồ lập trình hướng đối tượng'],
  inheritance: ['/illustrations/oop.svg', 'Sơ đồ kế thừa trong Java'],
  polymorphism: ['/illustrations/oop.svg', 'Sơ đồ polymorphism trong Java'],
  arraylist: ['/illustrations/collections.svg', 'Sơ đồ Java Collections'],
  'linkedlist': ['/illustrations/collections.svg', 'Sơ đồ LinkedList'],
  'hashmap-treemap': ['/illustrations/collections.svg', 'Sơ đồ HashMap'],
  'queue-deque': ['/illustrations/collections.svg', 'Sơ đồ Queue và Deque'],
}

function LessonVisual({ slug }) {
  const [label, Icon] = lessonVisuals[slug] || ['JAVA CONCEPT', FiCpu]
  return <div className="lesson-visual"><div className="lesson-visual-orbit" /><div className="lesson-visual-icon"><Icon /></div><span>{label}</span><small>JAVA / SYSTEM MAP</small></div>
}

function LessonDiagram({ slug }) {
  const asset = lessonDiagramAssets[slug]
  if (!asset) return null
  return <figure className="lesson-diagram"><img src={asset[0]} alt={asset[1]} /><figcaption>{asset[1]}</figcaption></figure>
}

function createLesson(lesson) {
  const detail = specialLessons[lesson.slug] || {}
  const markdownLesson = markdownLessons[lesson.slug]
  const syntax = `// ${lesson.title}\n// Xem API Java tương ứng và thử viết một ví dụ nhỏ.`
  const code = detail.code || `public class Example {
  public static void main(String[] args) {
    System.out.println("${lesson.title}");
  }
}`

  return {
    ...lesson,
    description: markdownLesson ? markdownLesson.sections[0]?.[1].replaceAll('**', '') : detail.description || `Tìm hiểu ${lesson.title} trong Java Core qua khái niệm, cú pháp và ví dụ thực hành ngắn.`,
    markdown: markdownLesson?.markdown,
    sections: markdownLesson?.sections || detail.sections || [
      ['Mục tiêu bài học', `Sau bài này, bạn có thể giải thích ${lesson.title}, nhận biết cách dùng và tự viết một ví dụ Java cơ bản.`],
      ['Khái niệm', detail.concept || `${lesson.title} là một phần của Java Core. Hãy tập trung vào vai trò, quy tắc hoạt động và mối quan hệ của nó với những API cùng nhóm.`],
      ['Cú pháp', syntax],
      ['Ví dụ code Java', code],
      ['Giải thích code', 'Đọc code từ trên xuống, xác định dữ liệu đầu vào, hành vi chính và kết quả. Sau đó thay đổi một giá trị để quan sát chương trình hoạt động khác đi như thế nào.'],
      ['Các trường hợp sử dụng', detail.useCases || `Dùng ${lesson.title} khi bài toán cần đúng abstraction này. Luôn cân nhắc độ rõ ràng, chi phí bộ nhớ và khả năng bảo trì trước khi chọn cách triển khai.`],
      ['Lỗi thường gặp', `Nhầm mục đích của ${lesson.title}, bỏ qua trường hợp biên hoặc chỉ học cú pháp mà không kiểm tra kết quả thực tế.`],
      ['Best Practice', 'Đặt tên rõ nghĩa, giữ mỗi đoạn code có một trách nhiệm và ưu tiên API chuẩn của Java trước khi tự viết lại logic tương tự.'],
      ['Bài tập thực hành', `Viết một chương trình nhỏ áp dụng ${lesson.title}. Thêm ít nhất một trường hợp hợp lệ, một trường hợp biên và in kết quả ra màn hình.`],
      ['Tóm tắt', `${lesson.title} là kiến thức nền cần được ghi nhớ bằng cách đọc, chạy thử và tự sửa một ví dụ Java ngắn.`],
    ],
  }
}

function routeFromPath(pathname) {
  if (pathname === '/' || pathname === '/docs' || pathname === '/docs/') {
    return { module: 'dashboard', slug: null, moduleLesson: null }
  }

  const javaMatch = pathname.match(/^\/docs\/java(?:\/([^/]+)\/([^/]+))?$/)
  if (javaMatch) return { module: 'java', slug: javaMatch[2] || null, moduleLesson: null }

  const moduleMatch = pathname.match(/^\/docs\/(spring-boot|english|japanese|react|mysql)(?:\/([^/]+))?$/)
  if (moduleMatch) return { module: moduleMatch[1], slug: null, moduleLesson: moduleMatch[2] || null }

  return { module: 'dashboard', slug: null, moduleLesson: null }
}

function highlightJava(code) {
  const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return escaped
    .replace(/(\/\/.*)$/gm, '<span class="token-comment">$1</span>')
    .replace(/(&quot;.*?&quot;|".*?")/g, '<span class="token-string">$1</span>')
    .replace(/\b(public|private|protected|class|static|void|new|return|final|extends|implements|interface|if|else|for|while|try|catch|throw|throws)\b/g, '<span class="token-keyword">$1</span>')
    .replace(/\b(int|double|boolean|char|long|float|byte|short|String|List|ArrayList|Thread)\b/g, '<span class="token-type">$1</span>')
}

class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) return <main className="error-screen"><img src="/illustrations/states.svg" alt="Minh họa trạng thái lỗi" /><FiShield /><h1>Có lỗi khi tải nội dung</h1><p>Hãy tải lại trang để tiếp tục học.</p><button type="button" onClick={() => window.location.reload()}>Tải lại trang</button></main>
    return this.props.children
  }
}

function App() {
  const initialRoute = routeFromPath(window.location.pathname)
  const [activeSlug, setActiveSlug] = useState(initialRoute.slug)
  const [openSections, setOpenSections] = useState(() => new Set(sectionData.map((section) => section.id)))
  const [completed, setCompleted] = useState(() => new Set(JSON.parse(localStorage.getItem('java-completed') || '[]')))
  const [query, setQuery] = useState('')
  const [isLight, setIsLight] = useState(false)
  const [activeModule, setActiveModule] = useState(initialRoute.module)
  const [activeModuleLesson, setActiveModuleLesson] = useState(initialRoute.moduleLesson)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [accessibilityOpen, setAccessibilityOpen] = useState(false)
  const [largeText, setLargeText] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [guideOpen, setGuideOpen] = useState(() => localStorage.getItem('docs-guide-seen') !== 'true')
  const [commandOpen, setCommandOpen] = useState(false)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [tourRun, setTourRun] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  const currentLesson = useMemo(() => {
    const lesson = allLessons.find((item) => item.slug === activeSlug)
    return lesson ? createLesson(lesson) : null
  }, [activeSlug])

  useEffect(() => {
    document.title = currentLesson ? `${currentLesson.title} | Java Documentation` : 'Java Documentation | Learning Workspace'
    document.documentElement.lang = 'vi'
    const description = document.querySelector('meta[name="description"]') || document.head.appendChild(Object.assign(document.createElement('meta'), { name: 'description' }))
    description.content = currentLesson ? `Học ${currentLesson.title} qua lý thuyết, ví dụ code và bài tập Java.` : 'Không gian học Java, Spring Boot và lập trình thực hành.'
  }, [currentLesson])

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 520)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const goTo = (slug) => {
    if (soundEnabled) uiSound.play()
    setActiveModule('java')
    setActiveModuleLesson(null)
    const target = slug ? `/docs/java/${allLessons.find((lesson) => lesson.slug === slug).section.id}/${slug}` : '/docs/java'
    window.history.pushState({}, '', target)
    setActiveSlug(slug)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const handlePopState = () => {
      const route = routeFromPath(window.location.pathname)
      setActiveModule(route.module)
      setActiveSlug(route.slug)
      setActiveModuleLesson(route.moduleLesson)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    localStorage.setItem('java-completed', JSON.stringify([...completed]))
  }, [completed])

  const toggleComplete = () => {
    if (!currentLesson) return
    setCompleted((current) => {
      const next = new Set(current)
      if (next.has(currentLesson.slug)) next.delete(currentLesson.slug)
      else next.add(currentLesson.slug)
      return next
    })
  }

  const closeGuide = () => {
    localStorage.setItem('docs-guide-seen', 'true')
    setGuideOpen(false)
  }

  const switchModule = (moduleId) => {
    if (soundEnabled) uiSound.play()
    setActiveModule(moduleId)
    setActiveSlug(null)
    setActiveModuleLesson(null)
    window.history.pushState({}, '', moduleId === 'dashboard' ? '/docs' : moduleId === 'java' ? '/docs/java' : `/docs/${moduleId}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const selectModuleLesson = (slug) => {
    setActiveModuleLesson(slug)
    window.history.pushState({}, '', `/docs/${activeModule}/${slug}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const filteredSections = sectionData.map((section) => ({
    ...section,
    lessons: section.lessons.filter(([, title]) => title.toLowerCase().includes(query.toLowerCase())),
  })).filter((section) => section.lessons.length > 0)

  const currentIndex = currentLesson ? allLessons.findIndex((lesson) => lesson.slug === currentLesson.slug) : -1
  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  useHotkeys('mod+k', (event) => { event.preventDefault(); setCommandOpen(true) }, { enableOnFormTags: true })
  useHotkeys('?', () => setGuideOpen(true), { enableOnFormTags: true })
  useHotkeys('j', () => nextLesson && goTo(nextLesson.slug), { enableOnFormTags: false })
  useHotkeys('k', () => previousLesson && goTo(previousLesson.slug), { enableOnFormTags: false })
  useHotkeys('m', () => { if (currentLesson) { toggleComplete(); toast.success('Đã cập nhật tiến độ bài học') } }, { enableOnFormTags: false })

  const tourSteps = [
    { target: '.tour-modules', content: 'Chọn module bạn muốn học tại đây.' },
    { target: '.tour-search', content: 'Tìm bài nhanh bằng ô tìm kiếm hoặc Ctrl/Cmd + K.' },
    { target: '.tour-lessons', content: 'Mở chương và chọn bài học trong cây nội dung.' },
    { target: '.docs-topbar', content: 'Bạn có thể mở trợ giúp, âm thanh và giao diện sáng/tối.' },
  ]
  return (
    <ErrorBoundary><a className="skip-link" href="#main-content">Bỏ qua đến nội dung</a><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${isLight ? 'docs-app light' : 'docs-app'}${currentLesson ? ' with-toc' : ''}${sidebarCollapsed ? ' sidebar-collapsed' : ''}${largeText ? ' large-text' : ''}${highContrast ? ' high-contrast' : ''}${reducedMotion ? ' reduced-motion' : ''}`}>
      <aside className="docs-sidebar">
        <div className="docs-brand"><div className="java-mark">J</div><div className="brand-copy"><strong>JAVA</strong><span>Documentation</span></div><button type="button" className="sidebar-toggle" onClick={() => setSidebarCollapsed((current) => !current)} aria-label={sidebarCollapsed ? 'Mở sidebar' : 'Thu gọn sidebar'} title={sidebarCollapsed ? 'Mở sidebar' : 'Thu gọn sidebar'}>{sidebarCollapsed ? <FiArrowRight /> : <FiArrowLeft />}</button></div>
        <nav className="module-tabs tour-modules" aria-label="Documentation modules">
          <button className={`module-tab dashboard${activeModule === 'dashboard' ? ' active' : ''}`} type="button" onClick={() => switchModule('dashboard')}><span><FiHome /></span>Tổng quan</button>
          {modules.map((module) => (
            <button className={`module-tab ${module.tone}${activeModule === module.id ? ' active' : ''}`} type="button" key={module.id} onClick={() => switchModule(module.id)}>
              <span><ModuleIcon moduleId={module.id} /></span>{module.label}
            </button>
          ))}
        </nav>
        <label className="search-box tour-search"><span><FiSearch /></span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Java docs · Ctrl K" /></label>
        {activeModule === 'java' ? <nav className="docs-tree tour-lessons" aria-label="Java documentation navigation">
          {filteredSections.map((section) => {
            const sectionCompleted = section.lessons.filter(([slug]) => completed.has(slug)).length
            const sectionProgress = Math.round((sectionCompleted / section.lessons.length) * 100)
            return <div className="tree-section" key={section.id}>
            <button className="tree-heading" type="button" onClick={() => setOpenSections((current) => {
              const next = new Set(current)
              if (next.has(section.id)) next.delete(section.id)
              else next.add(section.id)
              return next
            })}><span>{openSections.has(section.id) ? <FiChevronDown /> : <FiChevronRight />}</span><b>{section.number} {section.title}</b><div className="section-circular"><CircularProgressbar value={sectionProgress} text={`${sectionProgress}%`} styles={buildStyles({ pathColor: 'var(--accent)', textColor: 'var(--accent)', trailColor: 'color-mix(in srgb, var(--muted) 22%, transparent)' })} /></div></button>
            {openSections.has(section.id) && <div className="tree-lessons">{section.lessons.map(([slug, title], index) => <button className={activeSlug === slug ? 'tree-lesson active' : 'tree-lesson'} type="button" key={slug} onClick={() => goTo(slug)}><span>{section.id === 'fundamentals' && index === 0 ? '00' : String(index + 1).padStart(2, '0')}</span>{title}{completed.has(slug) && <em><FiCheck /></em>}</button>)}</div>}
          </div>
          })}
          {filteredSections.length === 0 && <div className="empty-search"><img src="/illustrations/states.svg" alt="Minh họa không tìm thấy bài học" /><p>Không tìm thấy bài học phù hợp.</p></div>}
        </nav> : activeModule !== 'dashboard' && <ModuleTree moduleId={activeModule} activeLesson={activeModuleLesson} onSelect={selectModuleLesson} />}
      </aside>

      <main className="docs-main" id="main-content">
                <header className="docs-topbar"><div className="breadcrumbs"><button className="crumb-button home-crumb" type="button" onClick={() => switchModule('dashboard')}><FiHome /> Tài liệu</button><span>/</span><button className="crumb-button" type="button" onClick={() => switchModule(activeModule)}>{activeModule === 'dashboard' ? 'Tổng quan' : activeModule === 'japanese' ? '日本語' : activeModule.charAt(0).toUpperCase() + activeModule.slice(1)}</button>{currentLesson && <><span>/</span><button className="crumb-button" type="button" onClick={() => goTo(currentLesson.section.lessons[0][0])}>{currentLesson.section.title.replace('Java ', '')}</button><span>/</span><b aria-current="page">{currentLesson.title}</b></>}</div><div className="topbar-actions"><button type="button" className="icon-button mobile-drawer-trigger" onClick={() => setMobileDrawerOpen(true)} title="Mở menu bài học" aria-label="Mở menu bài học"><FiMenu /></button><button type="button" className="icon-button" onClick={() => setGuideOpen(true)} title="Hướng dẫn sử dụng" aria-label="Mở hướng dẫn sử dụng"><FiHelpCircle /></button><button type="button" className="icon-button" onClick={() => setSoundEnabled((current) => !current)} title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'} aria-label={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}>{soundEnabled ? <FiVolume2 /> : <FiVolumeX />}</button><button type="button" className="icon-button" onClick={() => setIsLight((current) => !current)} title="Đổi giao diện">{isLight ? <FiMoon /> : <FiSun />}</button><span className="version-badge"><FiTrendingUp /> Learning workspace</span></div></header>
                <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} onSelect={goTo} />
                <Drawer.Root open={mobileDrawerOpen} onOpenChange={setMobileDrawerOpen} direction="left"><Drawer.Portal><Drawer.Overlay className="mobile-drawer-overlay" /><Drawer.Content className="mobile-drawer-content"><Drawer.Title>Danh sách bài học</Drawer.Title><button className="drawer-close" type="button" onClick={() => setMobileDrawerOpen(false)} aria-label="Đóng menu"><FiX /></button><div className="drawer-tree">{sectionData.map((section) => <div className="drawer-section" key={section.id}><b>{section.number} {section.title}</b>{section.lessons.map(([slug, title], index) => <button type="button" key={slug} onClick={() => { goTo(slug); setMobileDrawerOpen(false) }}><span>{String(index).padStart(2, '0')}</span>{title}</button>)}</div>)}</div></Drawer.Content></Drawer.Portal></Drawer.Root>
                {currentLesson && <aside className="toc-panel"><p>ON THIS PAGE</p><div>{currentLesson.sections.slice(0, 6).map(([heading]) => { const headingId = heading.replaceAll(' ', '-').toLowerCase(); return <a href={`#${headingId}`} key={heading}>{heading}</a> })}</div></aside>}
                {activeModule === 'dashboard' && <Dashboard onNavigate={switchModule} soundEnabled={soundEnabled} />}
                {!currentLesson && activeModule === 'java' && <Overview />}
                {!currentLesson && activeModule !== 'java' && activeModule !== 'dashboard' && <ModulePage moduleId={activeModule} activeLesson={activeModuleLesson} />}
                {currentLesson && <LessonView lesson={currentLesson} completed={completed.has(currentLesson.slug)} onComplete={toggleComplete} previous={previousLesson} next={nextLesson} onNavigate={goTo} />}
              </main>
              <div className="accessibility-widget">
                {accessibilityOpen && <section className="accessibility-panel" aria-label="Accessibility settings">
                  <div className="accessibility-panel-heading"><div><strong>Trợ năng</strong><span>Tùy chỉnh trải nghiệm đọc</span></div><button type="button" onClick={() => setAccessibilityOpen(false)} aria-label="Đóng bảng trợ năng"><FiX /></button></div>
                  <label className="accessibility-option"><span><b>Cỡ chữ lớn</b><small>Tăng kích thước văn bản</small></span><input type="checkbox" checked={largeText} onChange={(event) => setLargeText(event.target.checked)} /></label>
                  <label className="accessibility-option"><span><b>Tương phản cao</b><small>Làm nội dung nổi bật hơn</small></span><input type="checkbox" checked={highContrast} onChange={(event) => setHighContrast(event.target.checked)} /></label>
                  <label className="accessibility-option"><span><b>Giảm chuyển động</b><small>Tắt animation của giao diện</small></span><input type="checkbox" checked={reducedMotion} onChange={(event) => setReducedMotion(event.target.checked)} /></label>
                </section>}
                <button type="button" className="accessibility-button" onClick={() => setAccessibilityOpen((current) => !current)} aria-expanded={accessibilityOpen} aria-label="Mở tùy chọn trợ năng" title="Trợ năng"><FiTrendingUp /><b>Trợ năng</b></button>
              </div>
              <MobileBottomNav onNavigate={switchModule} hasLesson={Boolean(currentLesson)} />
              {showBackToTop && <button className="back-to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Về đầu trang" title="Về đầu trang"><FiArrowUp /></button>}
              {guideOpen && <UsageGuide onClose={closeGuide} onTour={() => { closeGuide(); setTourRun(true) }} />}
              <Joyride steps={tourSteps} run={tourRun} continuous showProgress showSkipButton callback={({ status }) => { if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) setTourRun(false) }} styles={{ options: { primaryColor: '#51d5c5', textColor: '#102030', zIndex: 100 } }} />
              <Toaster position="bottom-right" richColors closeButton />
            </motion.div></ErrorBoundary>
          )
        }

        function ModuleTree({ moduleId, activeLesson, onSelect }) {
          const module = modules.find((item) => item.id === moduleId)
          return <nav className="docs-tree module-tree" aria-label={`${module.label} documentation navigation`}>
            <div className="tree-section"><button className="tree-heading" type="button"><span><FiChevronDown /></span><b>{module.label} lessons</b></button><div className="tree-lessons">
              {moduleLessons[moduleId].map(([slug, title], index) => <button className={activeLesson === slug ? 'tree-lesson active' : 'tree-lesson'} type="button" key={slug} onClick={() => onSelect(slug)}><span>{moduleId === 'spring-boot' && index === 0 ? '00' : String(index + 1).padStart(2, '0')}</span>{title}</button>)}
            </div></div>
          </nav>
        }

        function ModulePage({ moduleId, activeLesson }) {
          const module = modules.find((item) => item.id === moduleId)
          const lessons = moduleLessons[moduleId]
          const lesson = lessons.find(([slug]) => slug === activeLesson)
          if (moduleId === 'english') return <EnglishDictionary />
          return <div className="module-page"><p className="overview-kicker">{module.label} / DOCUMENTATION</p><h1>{lesson ? lesson[1] : `Learn ${module.label}`}</h1><p className="overview-lead">{lesson ? `Thiết lập môi trường và học ${lesson[1].toLowerCase()} qua các bước thực hành ngắn.` : `Chọn một bài học ở sidebar để bắt đầu học ${module.label}.`}</p>{moduleId === 'spring-boot' && <figure className="module-diagram"><img src="/illustrations/spring-boot.svg" alt="Sơ đồ request flow của Spring Boot" /><figcaption>Request → Controller → Service → Repository → Database</figcaption></figure>}{activeLesson === 'intellij-idea' && <section className="module-guide"><h2>Bắt đầu với IntelliJ IDEA</h2><p>IntelliJ IDEA là IDE giúp tạo, chạy và debug dự án Spring Boot nhanh hơn. Hãy hoàn thành các bước sau để chuẩn bị project đầu tiên.</p><ol><li>Cài JDK 17 hoặc phiên bản LTS mới hơn, sau đó mở IntelliJ IDEA.</li><li>Chọn <strong>New Project</strong>, chọn <strong>Spring Boot</strong> hoặc mở Spring Initializr.</li><li>Đặt tên project, chọn Maven hoặc Gradle và kiểm tra đúng phiên bản Java.</li><li>Trong phần Dependencies, thêm <strong>Spring Web</strong>, rồi nhấn <strong>Create</strong>.</li><li>Mở class có annotation <strong>@SpringBootApplication</strong> và bấm nút Run màu xanh cạnh hàm main.</li></ol><p>Phím tắt hữu ích: <strong>Shift + F10</strong> để chạy, <strong>Shift + F9</strong> để debug và <strong>Double Shift</strong> để tìm nhanh mọi thứ trong IDE.</p></section>}<div className="module-lesson-grid">{lessons.map(([slug, title], index) => <article className={activeLesson === slug ? 'module-lesson active' : 'module-lesson'} key={slug}><span>{moduleId === 'spring-boot' && index === 0 ? '00' : String(index + 1).padStart(2, '0')}</span><h2>{title}</h2><p>{moduleId === 'spring-boot' ? 'Chuẩn bị IntelliJ IDEA và tạo project Spring Boot đầu tiên.' : 'Short, focused notes and practice for this topic.'}</p></article>)}</div></div>
        }

        function Dashboard({ onNavigate, soundEnabled }) {
          return <div className="workspace-dashboard">
            <div className="dashboard-hero">
              <div><p className="overview-kicker">LEARNING WORKSPACE</p><h1>Chào bạn,<br /><span>tiếp tục học nhé.</span></h1><p className="overview-lead">Một bảng điều khiển cho toàn bộ hành trình học code và ngôn ngữ. Chọn một module để bắt đầu hoặc tiếp tục bài đang học.</p><div className="dashboard-quick-actions"><button type="button" onClick={() => onNavigate('java')}>Mở Java Core <FiArrowRight /></button><button type="button" onClick={() => onNavigate('english')}>Tra từ English</button></div></div>
              <div className="dashboard-visual"><Suspense fallback={<div className="orbit-lab-loading" role="status"><img src="/illustrations/states.svg" alt="Đang tải mô hình 3D" /><span>Đang tải Interactive Lab...</span></div>}><InteractiveLab onInteract={() => soundEnabled && uiSound.play()} /></Suspense></div>
            </div>
            <div className="dashboard-summary"><div><b>05</b><span>module học tập</span></div><div><b>68</b><span>bài Java Core</span></div><div><b>01</b><span>từ điển cá nhân</span></div><div><b>∞</b><span>không gian ghi chú</span></div></div>
            <div className="dashboard-columns">
              <section className="dashboard-panel continue-panel"><div className="dashboard-panel-heading"><div><p className="eyebrow">CONTINUE LEARNING</p><h2>Học tiếp</h2></div><button type="button" onClick={() => onNavigate('java')}>Xem tất cả</button></div><button type="button" className="continue-card" onClick={() => { window.history.pushState({}, '', '/docs/java/fundamentals/intellij-idea'); window.dispatchEvent(new PopStateEvent('popstate')) }}><span className="continue-number">00</span><div><b>Bài 0: Cách sử dụng IntelliJ IDEA</b><small>Java Fundamentals · Bài đầu tiên</small><div className="mini-progress"><i style={{ width: '18%' }} /></div></div><FiArrowRight /></button></section>
              <section className="dashboard-panel activity-panel"><div className="dashboard-panel-heading"><div><p className="eyebrow">YOUR SPACE</p><h2>Tổng quan tiến độ</h2></div></div><div className="activity-row"><span className="activity-icon">J</span><div><b>Java Core</b><small>68 bài học có cấu trúc</small></div><strong>0%</strong></div><div className="activity-row"><span className="activity-icon english-icon">A</span><div><b>English</b><small>Từ điển cá nhân</small></div><strong>Ready</strong></div><div className="activity-row"><span className="activity-icon japanese-icon">あ</span><div><b>日本語</b><small>Hiragana và hội thoại</small></div><strong>Ready</strong></div></section>
            </div>
            <section className="dashboard-panel modules-panel"><div className="dashboard-panel-heading"><div><p className="eyebrow">ALL MODULES</p><h2>Không gian học tập</h2></div><span className="module-count">06 modules</span></div><div className="dashboard-grid">{modules.map((module) => <button type="button" className={`dashboard-module ${module.tone}`} key={module.id} onClick={() => onNavigate(module.id)}><span><ModuleIcon moduleId={module.id} /></span><div><b>{module.label}</b><small>{module.id === 'java' ? 'Documentation · 68 bài' : module.id === 'english' ? 'Từ điển & bài học' : 'Learning module'}</small></div><FiArrowRight /></button>)}</div></section>
            <section className="roadmap-panel"><div className="dashboard-panel-heading"><div><p className="eyebrow">LEARNING ROADMAP</p><h2>Lộ trình Java Web</h2></div><span className="module-count">4 chặng</span></div><div className="roadmap-timeline">{roadmapNodes.map((node, index) => <button type="button" className={`roadmap-node ${node.tone}`} key={node.id} onClick={() => onNavigate(node.id)}><span className="roadmap-number">0{index + 1}</span><div><b>{node.label}</b><small>{node.detail}</small></div>{index < roadmapNodes.length - 1 && <i className="roadmap-connector" />}</button>)}</div></section>
          </div>
        }

        function EnglishDictionary() {
          const [wordQuery, setWordQuery] = useState('')
          const words = englishDictionary.filter(([word, meaning]) => `${word} ${meaning}`.toLowerCase().includes(wordQuery.toLowerCase()))

          return <div className="module-page dictionary-page"><p className="overview-kicker">ENGLISH / PERSONAL DICTIONARY</p><h1>Từ điển English</h1><p className="overview-lead">Lưu những từ vựng cần nhớ và học chúng qua ví dụ ngắn mỗi ngày.</p><label className="dictionary-search"><span><FiSearch /></span><input value={wordQuery} onChange={(event) => setWordQuery(event.target.value)} placeholder="Tìm từ hoặc nghĩa tiếng Việt" /></label><div className="dictionary-grid">{words.map(([word, meaning, example]) => <article className="dictionary-card" key={word}><div><h2>{word}</h2><span>{meaning}</span></div><p>{example}</p></article>)}</div></div>
        }

        function Overview() {
          const openFirstLesson = () => {
            window.history.pushState({}, '', '/docs/java/fundamentals/intellij-idea')
            window.dispatchEvent(new PopStateEvent('popstate'))
          }

          return <div className="docs-overview"><div className="overview-hero"><div><div className="overview-kicker">TÀI LIỆU JAVA CORE</div><h1>Học Java<br /><span>từ nền tảng.</span></h1><p className="overview-lead">Một không gian học tập tập trung hoàn toàn vào ngôn ngữ Java: từ cú pháp cơ bản, lập trình hướng đối tượng đến Collections, Modern Java và Advanced Java.</p></div><div className="hero-visual-stack"><img className="hero-visual" src="/java-runtime.svg" alt="Minh họa JVM, JDK và Java API" /><img className="science-photo" src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=720&q=82" alt="Mạch điện tử đại diện cho tư duy máy tính" /></div></div><div className="overview-actions"><span className="course-stat"><b>68</b> bài học có cấu trúc</span><span className="course-stat"><b>06</b> phần kiến thức</span><span className="course-stat"><b>01</b> ngôn ngữ duy nhất</span></div><div className="overview-grid"><div className="overview-note"><span>01</span><h2>Nắm nền tảng</h2><p>Hiểu cách Java hoạt động trước khi học những API nâng cao.</p></div><div className="overview-note"><span>02</span><h2>Học qua code</h2><p>Mỗi bài đều đi cùng cú pháp, ví dụ và bài tập thực hành ngắn.</p></div><div className="overview-note"><span>03</span><h2>Ôn tập có hệ thống</h2><p>Mở rộng từng phần từ sidebar và đánh dấu bài đã hoàn thành.</p></div></div><div className="overview-start"><div><p className="eyebrow">BẮT ĐẦU TỪ ĐÂY</p><h2>Java là gì — JVM, JDK, JRE</h2><p>Tìm hiểu mô hình runtime làm nên khả năng chạy đa nền tảng của Java.</p></div><button type="button" onClick={openFirstLesson}>Mở bài đầu tiên <FiArrowRight /></button></div></div>
        }

        function LessonView({ lesson, completed, onComplete, previous, next, onNavigate }) {
          const difficulty = difficultyLevels[lesson.slug] || 'Intermediate'

          const markdownComponents = { code: ({ inline, children }) => inline ? <code>{children}</code> : <CodeBlock code={String(children).replace(/\n$/, '')} /> }
          return <article className="lesson-document"><div className="lesson-heading"><div><p className="section-label">{lesson.section.number} / {lesson.section.title}</p><div className="lesson-title-row"><h1>{lesson.title}</h1><span className={`difficulty-badge ${difficulty.toLowerCase()}`}>{difficulty}</span></div><p className="lesson-description">{lesson.description}</p></div><div className="lesson-heading-side"><LessonVisual slug={lesson.slug} /><button type="button" className={completed ? 'complete-button done' : 'complete-button'} onClick={onComplete}>{completed ? <><FiCheck /> Completed</> : 'Mark complete'}</button></div></div><LessonDiagram slug={lesson.slug} />{lesson.sections.map(([heading, content], index) => { const headingId = heading.replaceAll(' ', '-').toLowerCase(); return <section className="content-section" id={headingId} key={heading}><div className="content-section-meta"><span>{String(index + 1).padStart(2, '0')}</span><i /></div><h2>{heading}</h2><ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown></section> })}{quizData[lesson.slug] && <Quiz questions={quizData[lesson.slug]} />}<div className="lesson-nav"><button disabled={!previous} type="button" onClick={() => previous && onNavigate(previous.slug)}><FiChevronLeft /><span>Previous<br /><b>{previous?.title || 'Start'}</b></span></button><button disabled={!next} type="button" onClick={() => next && onNavigate(next.slug)}><span>Next<br /><b>{next?.title || 'End'}</b></span><FiChevronRight /></button></div></article>
        }

        function CodeBlock({ code }) {
          const [copied, setCopied] = useState(false)
          const copy = async () => {
            await navigator.clipboard?.writeText(code)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1600)
          }
          return <div className="code-block"><div className="code-toolbar"><span><i /> Java</span><button type="button" onClick={copy}>{copied ? <><FiCheck /> Copied</> : <><FiClipboard /> Copy</>}</button></div><pre><code>{code.split('\n').map((line, index) => <span className="code-line" key={`${index}-${line}`}><i>{String(index + 1).padStart(2, '0')}</i><span dangerouslySetInnerHTML={{ __html: highlightJava(line) || ' ' }} /></span>)}</code></pre></div>
        }

        function Quiz({ questions }) {
          const [current, setCurrent] = useState(0)
          const [answers, setAnswers] = useState([])
          const [submitted, setSubmitted] = useState(false)
          const question = questions[current]
          const score = answers.filter((answer, index) => answer === questions[index].answer).length

          const choose = (answer) => {
            if (submitted) return
            setAnswers((existing) => Object.assign([...existing], { [current]: answer }))
          }

          const next = () => {
            if (current < questions.length - 1) setCurrent((value) => value + 1)
            else setSubmitted(true)
          }

          return <section className="quiz-panel" id="quiz"><div className="quiz-heading"><div><p className="eyebrow">KNOWLEDGE CHECK</p><h2>Quiz nhanh</h2></div><span>Câu {Math.min(current + 1, questions.length)} / {questions.length}</span></div><div className="quiz-progress"><i style={{ width: `${((current + (submitted ? 1 : 0)) / questions.length) * 100}%` }} /></div>{submitted ? <div className="quiz-result"><strong>{score}/{questions.length}</strong><p>{score === questions.length ? 'Tuyệt vời! Bạn đã nắm được bài học.' : 'Hãy xem lại các phần chưa chắc và thử lại nhé.'}</p><button type="button" onClick={() => { setCurrent(0); setAnswers([]); setSubmitted(false) }}>Làm lại</button></div> : <div className="quiz-question"><h3>{question.question}</h3><div className="quiz-options">{question.options.map((option, index) => <button type="button" className={answers[current] === index ? 'selected' : ''} key={option} onClick={() => choose(index)}>{String.fromCharCode(65 + index)}. {option}</button>)}</div><button className="quiz-next" type="button" disabled={answers[current] === undefined} onClick={next}>{current === questions.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo'} <FiArrowRight /></button></div>}</section>
        }

        function MobileBottomNav({ onNavigate, hasLesson }) {
          const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return <nav className="mobile-bottom-nav" aria-label="Điều hướng nhanh"><button type="button" onClick={() => onNavigate('dashboard')}><FiMap />Lộ trình</button><button type="button" onClick={() => onNavigate('java')}><FiBookOpen />Bài học</button><button type="button" onClick={() => hasLesson && scrollTo('quiz')}><FiCheck />Quiz</button><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><FiTrendingUp />Tiến độ</button></nav>
        }

        function UsageGuide({ onClose, onTour }) {
          return <div className="guide-backdrop" role="dialog" aria-modal="true" aria-labelledby="guide-title"><section className="usage-guide"><button className="guide-close" type="button" onClick={onClose} aria-label="Đóng hướng dẫn"><FiX /></button><div className="guide-hand"><FiMousePointer /></div><p className="overview-kicker">QUICK START</p><h2 id="guide-title">Cách sử dụng web</h2><p className="guide-lead">Bắt đầu theo 3 bước nhỏ. Bạn có thể mở lại bảng hướng dẫn bằng biểu tượng dấu hỏi trên thanh trên cùng.</p><ol className="guide-steps"><li><span>01</span><div><b>Chọn module</b><small>Dùng sidebar để mở Java, Spring Boot hoặc các chủ đề khác.</small></div></li><li><span>02</span><div><b>Mở bài học</b><small>Chọn bài trong chương, đọc Markdown và chạy thử code mẫu.</small></div></li><li><span>03</span><div><b>Lưu tiến độ</b><small>Đánh dấu hoàn thành, làm quiz và theo dõi vòng tiến độ của chương.</small></div></li></ol><div className="guide-actions"><button className="guide-start secondary" type="button" onClick={onTour}>Xem tour có chỉ dẫn <FiMousePointer /></button><button className="guide-start" type="button" onClick={onClose}>Bắt đầu học <FiArrowRight /></button></div></section></div>
        }

        function CommandPalette({ open, onOpenChange, onSelect }) {
          return <Command.Dialog open={open} onOpenChange={onOpenChange} label="Tìm kiếm bài học"><div className="command-backdrop"><div className="command-panel"><Command.Input autoFocus placeholder="Tìm bài học, ví dụ: ArrayList..." /><Command.List>{allLessons.length === 0 && <Command.Empty>Không tìm thấy bài học.</Command.Empty>}{allLessons.map((lesson) => <Command.Item key={lesson.slug} value={`${lesson.title} ${lesson.section.title}`} onSelect={() => { onSelect(lesson.slug); onOpenChange(false) }}><FiBookOpen /><span>{lesson.title}<small>{lesson.section.title}</small></span><kbd>Enter</kbd></Command.Item>)}</Command.List></div></div></Command.Dialog>
        }

        export default App
