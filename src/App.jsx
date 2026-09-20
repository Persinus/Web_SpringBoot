import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { englishDictionary, moduleLessons, modules } from './data/docsData'

const sectionData = [
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

const specialLessons = {
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

function createLesson(lesson) {
  const detail = specialLessons[lesson.slug] || {}
  const syntax = `// ${lesson.title}\n// Xem API Java tương ứng và thử viết một ví dụ nhỏ.`
  const code = detail.code || `public class Example {
  public static void main(String[] args) {
    System.out.println("${lesson.title}");
  }
}`

  return {
    ...lesson,
    description: detail.description || `Tìm hiểu ${lesson.title} trong Java Core qua khái niệm, cú pháp và ví dụ thực hành ngắn.`,
    sections: [
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

  const moduleMatch = pathname.match(/^\/docs\/(english|japanese|react|mysql)(?:\/([^/]+))?$/)
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

  const currentLesson = useMemo(() => {
    const lesson = allLessons.find((item) => item.slug === activeSlug)
    return lesson ? createLesson(lesson) : null
  }, [activeSlug])

  const goTo = (slug) => {
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

  const switchModule = (moduleId) => {
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
  return (
    <div className={`${isLight ? 'docs-app light' : 'docs-app'}${currentLesson ? ' with-toc' : ''}${sidebarCollapsed ? ' sidebar-collapsed' : ''}${largeText ? ' large-text' : ''}${highContrast ? ' high-contrast' : ''}${reducedMotion ? ' reduced-motion' : ''}`}>
      <aside className="docs-sidebar">
        <div className="docs-brand"><div className="java-mark">J</div><div className="brand-copy"><strong>JAVA</strong><span>Documentation</span></div><button type="button" className="sidebar-toggle" onClick={() => setSidebarCollapsed((current) => !current)} aria-label={sidebarCollapsed ? 'Mở sidebar' : 'Thu gọn sidebar'} title={sidebarCollapsed ? 'Mở sidebar' : 'Thu gọn sidebar'}>{sidebarCollapsed ? '→' : '←'}</button></div>
        <nav className="module-tabs" aria-label="Documentation modules">
          <button className={`module-tab dashboard${activeModule === 'dashboard' ? ' active' : ''}`} type="button" onClick={() => switchModule('dashboard')}><span>⌂</span>Tổng quan</button>
          {modules.map((module) => (
            <button className={`module-tab ${module.tone}${activeModule === module.id ? ' active' : ''}`} type="button" key={module.id} onClick={() => switchModule(module.id)}>
              <span>{module.id === 'japanese' ? 'あ' : module.label.charAt(0)}</span>{module.label}
            </button>
          ))}
        </nav>
        <label className="search-box"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Java docs" /></label>
        {activeModule === 'java' ? <nav className="docs-tree" aria-label="Java documentation navigation">
          {filteredSections.map((section) => {
            const sectionCompleted = section.lessons.filter(([slug]) => completed.has(slug)).length
            const sectionProgress = Math.round((sectionCompleted / section.lessons.length) * 100)
            return <div className="tree-section" key={section.id}>
            <button className="tree-heading" type="button" onClick={() => setOpenSections((current) => {
              const next = new Set(current)
              if (next.has(section.id)) next.delete(section.id)
              else next.add(section.id)
              return next
            })}><span>{openSections.has(section.id) ? '⌄' : '›'}</span><b>{section.number} {section.title}</b><em>{sectionProgress}%</em></button>
            {openSections.has(section.id) && <div className="tree-lessons">{section.lessons.map(([slug, title], index) => <button className={activeSlug === slug ? 'tree-lesson active' : 'tree-lesson'} type="button" key={slug} onClick={() => goTo(slug)}><span>{String(index + 1).padStart(2, '0')}</span>{title}{completed.has(slug) && <em>✓</em>}</button>)}</div>}
          </div>
          })}
        </nav> : activeModule !== 'dashboard' && <ModuleTree moduleId={activeModule} activeLesson={activeModuleLesson} onSelect={selectModuleLesson} />}
      </aside>

      <main className="docs-main">
                <header className="docs-topbar"><div className="breadcrumbs"><button type="button" onClick={() => switchModule('dashboard')}>Tài liệu</button><span>/</span><b>{activeModule === 'dashboard' ? 'Tổng quan' : activeModule === 'japanese' ? '日本語' : activeModule.charAt(0).toUpperCase() + activeModule.slice(1)}</b>{currentLesson && <><span>/</span><b>{currentLesson.section.title}</b><span>/</span><b>{currentLesson.title}</b></>}</div><div className="topbar-actions"><button type="button" className="icon-button" onClick={() => setIsLight((current) => !current)} title="Đổi giao diện">{isLight ? '☾' : '☀'}</button><span className="version-badge">Learning workspace</span></div></header>
                {activeModule === 'dashboard' && <Dashboard onNavigate={switchModule} />}
                {!currentLesson && activeModule === 'java' && <Overview />}
                {!currentLesson && activeModule !== 'java' && activeModule !== 'dashboard' && <ModulePage moduleId={activeModule} activeLesson={activeModuleLesson} />}
                {currentLesson && <LessonView lesson={currentLesson} completed={completed.has(currentLesson.slug)} onComplete={toggleComplete} previous={previousLesson} next={nextLesson} onNavigate={goTo} />}
              </main>
              {currentLesson && <aside className="toc-panel"><p>ON THIS PAGE</p>{currentLesson.sections.slice(0, 6).map(([heading]) => <a href={`#${heading.replaceAll(' ', '-').toLowerCase()}`} key={heading}>{heading}</a>)}</aside>}
              <div className="accessibility-widget">
                {accessibilityOpen && <section className="accessibility-panel" aria-label="Accessibility settings">
                  <div className="accessibility-panel-heading"><div><strong>Trợ năng</strong><span>Tùy chỉnh trải nghiệm đọc</span></div><button type="button" onClick={() => setAccessibilityOpen(false)} aria-label="Đóng bảng trợ năng">×</button></div>
                  <label className="accessibility-option"><span><b>Cỡ chữ lớn</b><small>Tăng kích thước văn bản</small></span><input type="checkbox" checked={largeText} onChange={(event) => setLargeText(event.target.checked)} /></label>
                  <label className="accessibility-option"><span><b>Tương phản cao</b><small>Làm nội dung nổi bật hơn</small></span><input type="checkbox" checked={highContrast} onChange={(event) => setHighContrast(event.target.checked)} /></label>
                  <label className="accessibility-option"><span><b>Giảm chuyển động</b><small>Tắt animation của giao diện</small></span><input type="checkbox" checked={reducedMotion} onChange={(event) => setReducedMotion(event.target.checked)} /></label>
                </section>}
                <button type="button" className="accessibility-button" onClick={() => setAccessibilityOpen((current) => !current)} aria-expanded={accessibilityOpen} aria-label="Mở tùy chọn trợ năng" title="Trợ năng"><span aria-hidden="true">◉</span><b>Trợ năng</b></button>
              </div>
            </div>
          )
        }

        function ModuleTree({ moduleId, activeLesson, onSelect }) {
          const module = modules.find((item) => item.id === moduleId)
          return <nav className="docs-tree module-tree" aria-label={`${module.label} documentation navigation`}>
            <div className="tree-section"><button className="tree-heading" type="button"><span>⌄</span><b>{module.label} lessons</b></button><div className="tree-lessons">
              {moduleLessons[moduleId].map(([slug, title], index) => <button className={activeLesson === slug ? 'tree-lesson active' : 'tree-lesson'} type="button" key={slug} onClick={() => onSelect(slug)}><span>{String(index + 1).padStart(2, '0')}</span>{title}</button>)}
            </div></div>
          </nav>
        }

        function ModulePage({ moduleId, activeLesson }) {
          const module = modules.find((item) => item.id === moduleId)
          const lessons = moduleLessons[moduleId]
          const lesson = lessons.find(([slug]) => slug === activeLesson)
          if (moduleId === 'english') return <EnglishDictionary />
          return <div className="module-page"><p className="overview-kicker">{module.label} / DOCUMENTATION</p><h1>{lesson ? lesson[1] : `Learn ${module.label}`}</h1><p className="overview-lead">{lesson ? `Study notes for ${lesson[1]}, organized into short lessons and practical examples.` : `Choose a sub-lesson from the sidebar to start learning ${module.label}.`}</p><div className="module-lesson-grid">{lessons.map(([slug, title], index) => <article className={activeLesson === slug ? 'module-lesson active' : 'module-lesson'} key={slug}><span>0{index + 1}</span><h2>{title}</h2><p>Short, focused notes and practice for this topic.</p></article>)}</div></div>
        }

        function Dashboard({ onNavigate }) {
          return <div className="workspace-dashboard">
            <div className="dashboard-hero">
              <div><p className="overview-kicker">LEARNING WORKSPACE</p><h1>Chào bạn,<br /><span>tiếp tục học nhé.</span></h1><p className="overview-lead">Một bảng điều khiển cho toàn bộ hành trình học code và ngôn ngữ. Chọn một module để bắt đầu hoặc tiếp tục bài đang học.</p><div className="dashboard-quick-actions"><button type="button" onClick={() => onNavigate('java')}>Mở Java Core →</button><button type="button" onClick={() => onNavigate('english')}>Tra từ English</button></div></div>
              <div className="dashboard-orbit"><div className="orbit-core">LEARN</div><span>CODE</span><span>LANGUAGE</span><span>PRACTICE</span></div>
            </div>
            <div className="dashboard-summary"><div><b>05</b><span>module học tập</span></div><div><b>68</b><span>bài Java Core</span></div><div><b>01</b><span>từ điển cá nhân</span></div><div><b>∞</b><span>không gian ghi chú</span></div></div>
            <div className="dashboard-columns">
              <section className="dashboard-panel continue-panel"><div className="dashboard-panel-heading"><div><p className="eyebrow">CONTINUE LEARNING</p><h2>Học tiếp</h2></div><button type="button" onClick={() => onNavigate('java')}>Xem tất cả</button></div><button type="button" className="continue-card" onClick={() => { window.history.pushState({}, '', '/docs/java/fundamentals/what-is-java'); window.dispatchEvent(new PopStateEvent('popstate')) }}><span className="continue-number">01</span><div><b>Java là gì — JVM, JDK, JRE</b><small>Java Fundamentals · Bài đầu tiên</small><div className="mini-progress"><i style={{ width: '18%' }} /></div></div><strong>→</strong></button></section>
              <section className="dashboard-panel activity-panel"><div className="dashboard-panel-heading"><div><p className="eyebrow">YOUR SPACE</p><h2>Tổng quan tiến độ</h2></div></div><div className="activity-row"><span className="activity-icon">J</span><div><b>Java Core</b><small>68 bài học có cấu trúc</small></div><strong>0%</strong></div><div className="activity-row"><span className="activity-icon english-icon">A</span><div><b>English</b><small>Từ điển cá nhân</small></div><strong>Ready</strong></div><div className="activity-row"><span className="activity-icon japanese-icon">あ</span><div><b>日本語</b><small>Hiragana và hội thoại</small></div><strong>Ready</strong></div></section>
            </div>
            <section className="dashboard-panel modules-panel"><div className="dashboard-panel-heading"><div><p className="eyebrow">ALL MODULES</p><h2>Không gian học tập</h2></div><span className="module-count">5 modules</span></div><div className="dashboard-grid">{modules.map((module) => <button type="button" className={`dashboard-module ${module.tone}`} key={module.id} onClick={() => onNavigate(module.id)}><span>{module.id === 'japanese' ? 'あ' : module.label.charAt(0)}</span><div><b>{module.label}</b><small>{module.id === 'java' ? 'Documentation · 68 bài' : module.id === 'english' ? 'Từ điển & bài học' : 'Learning module'}</small></div><strong>→</strong></button>)}</div></section>
          </div>
        }

        function EnglishDictionary() {
          const [wordQuery, setWordQuery] = useState('')
          const words = englishDictionary.filter(([word, meaning]) => `${word} ${meaning}`.toLowerCase().includes(wordQuery.toLowerCase()))

          return <div className="module-page dictionary-page"><p className="overview-kicker">ENGLISH / PERSONAL DICTIONARY</p><h1>Từ điển English</h1><p className="overview-lead">Lưu những từ vựng cần nhớ và học chúng qua ví dụ ngắn mỗi ngày.</p><label className="dictionary-search"><span>⌕</span><input value={wordQuery} onChange={(event) => setWordQuery(event.target.value)} placeholder="Tìm từ hoặc nghĩa tiếng Việt" /></label><div className="dictionary-grid">{words.map(([word, meaning, example]) => <article className="dictionary-card" key={word}><div><h2>{word}</h2><span>{meaning}</span></div><p>{example}</p></article>)}</div></div>
        }

        function Overview() {
          const openFirstLesson = () => {
            window.history.pushState({}, '', '/docs/java/fundamentals/what-is-java')
            window.dispatchEvent(new PopStateEvent('popstate'))
          }

          return <div className="docs-overview"><div className="overview-hero"><div><div className="overview-kicker">TÀI LIỆU JAVA CORE</div><h1>Học Java<br /><span>từ nền tảng.</span></h1><p className="overview-lead">Một không gian học tập tập trung hoàn toàn vào ngôn ngữ Java: từ cú pháp cơ bản, lập trình hướng đối tượng đến Collections, Modern Java và Advanced Java.</p></div><img className="hero-visual" src="/java-runtime.svg" alt="Minh họa JVM, JDK và Java API" /></div><div className="overview-actions"><span className="course-stat"><b>68</b> bài học có cấu trúc</span><span className="course-stat"><b>06</b> phần kiến thức</span><span className="course-stat"><b>01</b> ngôn ngữ duy nhất</span></div><div className="overview-grid"><div className="overview-note"><span>01</span><h2>Nắm nền tảng</h2><p>Hiểu cách Java hoạt động trước khi học những API nâng cao.</p></div><div className="overview-note"><span>02</span><h2>Học qua code</h2><p>Mỗi bài đều đi cùng cú pháp, ví dụ và bài tập thực hành ngắn.</p></div><div className="overview-note"><span>03</span><h2>Ôn tập có hệ thống</h2><p>Mở rộng từng phần từ sidebar và đánh dấu bài đã hoàn thành.</p></div></div><div className="overview-start"><div><p className="eyebrow">BẮT ĐẦU TỪ ĐÂY</p><h2>Java là gì — JVM, JDK, JRE</h2><p>Tìm hiểu mô hình runtime làm nên khả năng chạy đa nền tảng của Java.</p></div><button type="button" onClick={openFirstLesson}>Mở bài đầu tiên →</button></div></div>
        }

        function LessonView({ lesson, completed, onComplete, previous, next, onNavigate }) {
          return <article className="lesson-document"><div className="lesson-heading"><div><p className="section-label">{lesson.section.number} / {lesson.section.title}</p><h1>{lesson.title}</h1><p className="lesson-description">{lesson.description}</p></div><div className="lesson-heading-side"><img src="/java-runtime.svg" alt="Java documentation illustration" /><button type="button" className={completed ? 'complete-button done' : 'complete-button'} onClick={onComplete}>{completed ? '✓ Completed' : 'Mark complete'}</button></div></div>{lesson.sections.map(([heading, content]) => <section className="content-section" id={heading.replaceAll(' ', '-').toLowerCase()} key={heading}><h2>{heading}</h2>{heading === 'Cú pháp' || heading === 'Ví dụ code Java' ? <CodeBlock code={content} /> : <p>{content}</p>}</section>)}<div className="lesson-nav"><button disabled={!previous} type="button" onClick={() => previous && onNavigate(previous.slug)}>← <span>Previous<br /><b>{previous?.title || 'Start'}</b></span></button><button disabled={!next} type="button" onClick={() => next && onNavigate(next.slug)}><span>Next<br /><b>{next?.title || 'End'}</b></span> →</button></div></article>
        }

        function CodeBlock({ code }) {
          const copy = () => navigator.clipboard?.writeText(code)
          return <div className="code-block"><div className="code-toolbar"><span><i /> Java</span><button type="button" onClick={copy}>Copy</button></div><pre><code dangerouslySetInnerHTML={{ __html: highlightJava(code) }} /></pre></div>
        }

        export default App
