import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { association, enablers, goals, governance, mediaFilters, nav, OFFICIAL_SITE, sectors, tracks } from './data/content';
import { setupMagneticButtons } from './utils/magnetic.js';

type IconProps = { name: string; size?: number; strokeWidth?: number; className?: string };
function Icon({ name, size = 23, strokeWidth = 1.7, className = '' }: IconProps) {
  const common = { width: size, height: size, fill: 'none', stroke: 'currentColor', strokeWidth, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, viewBox: '0 0 24 24', className, 'aria-hidden': true as const };
  const p = (() => {
    switch (name) {
      case 'arrow': return <><path d="M4 12h16M12 4l8 8-8 8" /></>;
      case 'arrow-up': return <><path d="M6 18 18 6M8 6h10v10" /></>;
      case 'menu': return <><path d="M4 7h16M4 12h16M4 17h16" /></>;
      case 'close': return <><path d="m5 5 14 14M19 5 5 19" /></>;
      case 'spark': return <><path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z" /><path d="m20 2 .5 1.5L22 4l-1.5.5L20 6l-.5-1.5L18 4l1.5-.5L20 2Z" /></>;
      case 'heart': return <><path d="M20.8 4.6c-2-2-5.1-2-7.1 0L12 6.3l-1.7-1.7a5 5 0 0 0-7.1 7.1 7.1 0 0 0 0 10L12 23l8.8-8.4a7.1 7.1 0 0 0 0-10Z" transform="translate(0 -1) scale(.98)" /></>;
      case 'users': return <><circle cx="9" cy="8" r="3" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M17 5.3a3 3 0 0 1 0 5.6M17 14a5 5 0 0 1 4 5v1" /></>;
      case 'megaphone': return <><path d="M3 10h4l12-6v16L7 14H3zM7 14l2 6h4l-2-5" /><path d="M22 9v6" /></>;
      case 'book': return <><path d="M12 6C9 4 5 4 2 5v14c3-1 7-1 10 1 3-2 7-2 10-1V5c-3-1-7-1-10 1ZM12 6v14" /></>;
      case 'network': return <><circle cx="12" cy="4" r="2" /><circle cx="5" cy="18" r="2" /><circle cx="19" cy="18" r="2" /><path d="m11 6-5 10m7-10 5 10M7 18h10" /></>;
      case 'graduation': return <><path d="m2 9 10-5 10 5-10 5L2 9Zm4 3v6c3.5 3 8.5 3 12 0v-6M22 9v7" /></>;
      case 'video': return <><rect x="2" y="4" width="16" height="16" rx="3" /><path d="m18 10 4-3v10l-4-3M8 9v6l5-3-5-3Z" /></>;
      case 'badge': return <><path d="M12 2 4 5v7c0 5 3 8 8 10 5-2 8-5 8-10V5l-8-3Z" /><path d="m8 12 3 3 5-6" /></>;
      case 'file': return <><path d="M7 2h7l5 5v15H5V2h2Zm7 0v5h5M8 12h8M8 16h8" /></>;
      case 'phone': return <><path d="m7 3 3 4-2 3c1 3 3 5 6 6l3-2 4 3-2 4C11 22 2 13 3 5l4-2Z" /></>;
      case 'pin': return <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>;
      case 'clock': return <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l4 3" /></>;
      case 'play': return <><circle cx="12" cy="12" r="10" /><path d="m10 8 6 4-6 4V8Z" /></>;
      case 'chevron': return <><path d="m6 9 6 6 6-6" /></>;
      case 'external': return <><path d="M13 4h7v7M20 4l-9 9" /><path d="M20 14v6H4V4h6" /></>;
      case 'camera': return <><path d="M3 7h4l2-3h6l2 3h4v13H3V7Z" /><circle cx="12" cy="13" r="4" /></>;
      case 'refresh': return <><path d="M20 7v5h-5M4 17v-5h5" /><path d="M6 9a7 7 0 0 1 12-2l2 5M4 12l2 5a7 7 0 0 0 12-2" /></>;
      default: return <><circle cx="12" cy="12" r="9" /><path d="M8 12h8" /></>;
    }
  })();
  return <svg {...common}>{p}</svg>;
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <span className={`eyebrow ${light ? 'eyebrow-light' : ''}`}><span className="eyebrow-diamond" />{children}</span>;
}
function Heading({ eyebrow, title, highlight, description, light = false }: { eyebrow: string; title: string; highlight?: string; description?: string; light?: boolean }) {
  return <div className={`section-heading reveal ${light ? 'section-heading-light' : ''}`}>
    <Eyebrow light={light}>{eyebrow}</Eyebrow>
    <h2>{title} {highlight && <span className="heading-accent">{highlight}</span>}</h2>
    {description && <p>{description}</p>}
  </div>;
}
function Brand({ variant = 'color' }: { variant?: 'color' | 'white' }) {
  return <a className="brand" href="#home" aria-label="جمعية إعلامنا - إلى الرئيسية">
    <img src={variant === 'white' ? './assets/ealamna-logo-white.png' : './assets/ealamna-logo.png'} alt="إعلامنا Ealamna" />
  </a>;
}

/** Typing is character-by-character, not a width-reveal: Arabic stays readable as it forms. */
function useTyping(text: string, startDelay: number, intervalMs: number): number {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    const length = Array.from(text).length;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(length);
      return;
    }
    setVisible(0);
    let tick: ReturnType<typeof setInterval> | undefined;
    const start = window.setTimeout(() => {
      let next = 0;
      tick = window.setInterval(() => {
        next += 1;
        setVisible(next);
        if (next >= length && tick) window.clearInterval(tick);
      }, intervalMs);
    }, startDelay);
    return () => { window.clearTimeout(start); if (tick) window.clearInterval(tick); };
  }, [text, startDelay, intervalMs]);
  return visible;
}

function TypingLine({ prefix, accent, second = false, delay }: { prefix: string; accent: string; second?: boolean; delay: number }) {
  const text = prefix + accent;
  const visible = useTyping(text, delay, 94);
  const chars = Array.from(text);
  const leadCount = Array.from(prefix).length;
  return <span className={`hero-line typed-line ${second ? 'second-line' : ''}`} data-typewriter="line" data-prefix={prefix} data-accent={accent} data-delay={delay} data-speed="94" aria-label={text}>
    <span aria-hidden="true" className="typed-line-content"><span data-type-prefix>{chars.slice(0, Math.min(visible, leadCount)).join('')}</span><span data-type-accent className={second ? 'hero-gradient-text' : 'hero-accent'}>{chars.slice(leadCount, visible).join('')}</span><span aria-hidden="true" className={`typing-caret ${visible >= chars.length ? 'typing-done' : ''}`} /></span>
  </span>;
}

function TypingDescription({ text }: { text: string }) {
  const visible = useTyping(text, 3520, 23);
  return <p className="hero-description typed-description" aria-label={text} data-typewriter="paragraph" data-text={text} data-delay="3520" data-speed="23"><span aria-hidden="true" data-type-body>{Array.from(text).slice(0, visible).join('')}</span><span aria-hidden="true" className={`typing-caret typing-caret-small ${visible >= Array.from(text).length ? 'typing-done' : ''}`} /></p>;
}

const SIDE_NAV = [{ href: '#home', label: 'الرئيسية' }, ...nav, { href: '#contact', label: 'تواصل معنا' }];

const MINISTRY_SVG = 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Ministry_of_Media_2020_logo.svg';

function MinistryIdentity({ compact = false }: { compact?: boolean }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return <a className={`ministry-identity ${compact ? 'ministry-compact' : ''}`} href="https://www.media.gov.sa/" target="_blank" rel="noreferrer" title="وزارة الإعلام السعودية — يُرجى التأكد من اعتماد أحدث نسخة للشعار قبل النشر">
    <div className="ministry-fallback"><span className="ministry-emblem">✦</span><span>وزارة الإعلام <small>Ministry of Media</small></span></div>
    {!failed && <img src={MINISTRY_SVG} className={loaded ? 'ministry-img-loaded' : 'ministry-img-loading'} alt="شعار وزارة الإعلام السعودية" onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />}
  </a>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [railVisible, setRailVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [partnerSector, setPartnerSector] = useState(0);
  const [mediaFilter, setMediaFilter] = useState<(typeof mediaFilters)[number]['id']>('all');
  const [activeTrack, setActiveTrack] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
    const onScroll = () => {
      const cutoff = window.innerHeight * .38;
      let current = 'home';
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= cutoff) current = section.id;
      }
      setActiveSection((previous) => previous === current ? previous : current);
      setIsScrolled(window.scrollY > 30);
      setRailVisible(window.scrollY > 420);
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollableHeight > 0 ? Math.min(100, Math.max(0, window.scrollY / scrollableHeight * 100)) : 0);
      setShowTop(window.scrollY > 950);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -35px 0px' });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [partnerSector, mediaFilter, activeTrack]);

  useEffect(() => {
    const teardown = setupMagneticButtons();
    return teardown;
  }, []);

  useEffect(() => {
    document.body.classList.toggle('mobile-menu-open', menuOpen);
    return () => document.body.classList.remove('mobile-menu-open');
  }, [menuOpen]);

  // A soft spotlight and depth-following layers, without React re-rendering on pointer movement.
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.hero');
    const art = document.querySelector<HTMLElement>('.hero-art');
    if (!hero || !art || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) return;
    const onPointerMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const artRect = art.getBoundingClientRect();
      hero.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
      hero.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
      const x = Math.max(-1, Math.min(1, (event.clientX - (artRect.left + artRect.width / 2)) / (artRect.width / 2)));
      const y = Math.max(-1, Math.min(1, (event.clientY - (artRect.top + artRect.height / 2)) / (artRect.height / 2)));
      art.style.setProperty('--parallax-x', `${(x * 8).toFixed(2)}px`);
      art.style.setProperty('--parallax-y', `${(y * 8).toFixed(2)}px`);
      art.style.setProperty('--mark-x', `${(x * -15).toFixed(2)}px`);
      art.style.setProperty('--mark-y', `${(y * -15).toFixed(2)}px`);
    };
    const reset = () => {
      art.style.setProperty('--parallax-x', '0px');
      art.style.setProperty('--parallax-y', '0px');
      art.style.setProperty('--mark-x', '0px');
      art.style.setProperty('--mark-y', '0px');
    };
    hero.addEventListener('pointermove', onPointerMove);
    hero.addEventListener('pointerleave', reset);
    return () => { hero.removeEventListener('pointermove', onPointerMove); hero.removeEventListener('pointerleave', reset); };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  return <>
    <div className="utility-bar"><div className="container utility-inner"><span>جمعية إعلامنا | جدة، المملكة العربية السعودية</span><span>جمعية مرخصة برقم <b dir="ltr">{association.license}</b></span></div></div>
    <header className={`site-header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-inner">
        <div className="header-brand-pair"><Brand /><span className="brand-separator" /><MinistryIdentity compact /></div>
        <nav className="desktop-nav" aria-label="التنقل الرئيسي">
          {nav.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        </nav>
        <div className="header-actions">
          <a className="header-contact" href="#contact" data-magnetic><span>تواصل معنا</span><Icon name="arrow-up" size={17} /></a>
          <button className="mobile-menu-button" onClick={() => setMenuOpen((v) => !v)} aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'} aria-expanded={menuOpen}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
        </div>
      </div>
    </header>
    <div className={`mobile-drawer ${menuOpen ? 'mobile-drawer-open' : ''}`} aria-hidden={!menuOpen}>
      <div className="mobile-drawer-label">استكشف إعلامنا / EXPLORE</div>
      {nav.map((item, index) => <a href={item.href} onClick={closeMenu} key={item.href}><span>{String(index + 1).padStart(2, '0')}</span>{item.label}<Icon name="arrow-up" size={19} /></a>)}
      <a href="#contact" onClick={closeMenu}><span>10</span>تواصل معنا<Icon name="arrow-up" size={19} /></a>
      <div className="mobile-drawer-footer">هنا يبدأ الأثر.</div>
    </div>

    <nav className={`floating-section-rail cinematic-rail ${railVisible ? 'rail-visible' : ''}`} aria-label="تنقل إعلامنا التفاعلي" aria-hidden={!railVisible} style={{ '--rail-progress': `${scrollProgress}%` } as CSSProperties}>
      <span className="cinematic-rail-top" aria-hidden="true"><span className="rail-kicker">E/</span><span className="rail-count">{String(SIDE_NAV.findIndex((item) => item.href === `#${activeSection}`) + 1).padStart(2, '0')}<em>/{String(SIDE_NAV.length).padStart(2, '0')}</em></span></span>
      <span className="cinematic-rail-track" aria-hidden="true"><span className="cinematic-rail-fill" /></span>
      <div className="cinematic-rail-stops">
        {SIDE_NAV.map((item, index) => <a href={item.href} key={item.href} className={`cinematic-stop ${activeSection === item.href.substring(1) ? 'cinematic-stop-current' : ''}`} aria-label={`اذهب إلى ${item.label}`} aria-current={activeSection === item.href.substring(1) ? 'location' : undefined} tabIndex={railVisible ? 0 : -1}>
          <span className="cinematic-notch" /><span className="cinematic-hover-label"><b>{String(index + 1).padStart(2, '0')}</b>{item.label}</span>
        </a>)}
      </div>
      <div className="cinematic-traveler" style={{ top: `calc(73px + (100% - 100px) * ${scrollProgress / 100})` }} aria-hidden="true">
        <span className="cinematic-traveler-aura" /><img src="./assets/ealamna-mark.png" alt="" />
        <span className="cinematic-current-label" key={activeSection}>{SIDE_NAV.find((item) => item.href === `#${activeSection}`)?.label ?? 'الرئيسية'}</span>
      </div>
      <span className="cinematic-rail-bottom" aria-hidden="true">SCROLL <span>↓</span></span>
    </nav>

    <main>
      <section className="hero" id="home">
        <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="container hero-content">
          <div className="hero-copy">
            <div className="hero-chip fade-in"><span className="live-dot" /> إعلامٌ يواكب الطموح، ويصنع التأثير</div>
            <h1 className="hero-title" aria-label="للإعلام صوت. وللأثر حكاية."><TypingLine prefix="للإعلام " accent="صوت." delay={350} /><TypingLine prefix="وللأثر " accent="حكاية." second delay={1850} /></h1>
            <TypingDescription text="جمعية متخصصة ترسم المستقبل الإعلامي بروح الشباب، وتمكّن رسالة القطاع غير الربحي لنصنع معاً أثراً يمتد." />
            <div className="hero-buttons"><a className="btn btn-primary" data-magnetic href="#about">اكتشف إعلامنا <Icon name="arrow-up" size={18} /></a><a href="#programs" className="btn btn-outline" data-magnetic>استكشف مساراتنا <Icon name="arrow" size={18} /></a></div>
            <div className="hero-bottom"><span className="hero-bottom-line" /><span>نُمكّن الشباب · نعزز الأثر · نصنع المستقبل</span></div>
          </div>
          <div className="hero-art cinematic-hero-art" aria-label="مشاهد من التصميم الإعلامي وهوية إعلامنا">
            <div className="cinematic-photo-main"><img src="./assets/media-studio.webp" alt="مشهد إنتاج صوتي من دليل الهوية البصرية" /><span className="cinematic-photo-tint" /><span className="cinematic-photo-index">01 — MEDIA STORY</span></div>
            <div className="cinematic-photo-side"><img src="./assets/building-brand.webp" alt="تطبيق هوية إعلامنا على مبنى" /><span>قصص تصنع الأثر</span></div>
            <div className="cinematic-slice cinematic-slice-one" /><div className="cinematic-slice cinematic-slice-two" />
            <div className="cinematic-logo-assembly" role="img" aria-label="رمز شعار إعلامنا، يتجمع من نصفين عند فتح الصفحة"><span className="cinematic-logo-glow" /><img src="./assets/ealamna-mark.png" className="cinematic-mark-half cinematic-mark-left" alt="" /><img src="./assets/ealamna-mark.png" className="cinematic-mark-half cinematic-mark-right" alt="" /></div>
            <div className="cinematic-media-line" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
            <div className="cinematic-tag"><span className="cinematic-tag-dot" /> نبض الإعلام <span>✦</span> أثر يتجدد</div>
            <span className="cinematic-photo-vertical">EALAMNA / STORIES THAT MATTER</span>
          </div>
        </div>
        <a className="scroll-cue" href="#about"><span className="scroll-cue-line" /><span>مرّر لاكتشاف المزيد</span></a>
        <span className="hero-index">01 — 11</span>
      </section>

      <div className="impact-ribbon" role="img" aria-label="إعلامنا: فكرة، إبداع، تأثير، أثر">
        <div className="impact-ribbon-track" aria-hidden="true">
          {Array.from({ length: 4 }, (_, index) => <span className="impact-ribbon-group" key={index}><span>فكرة</span><b>✦</b><span>إبداع</span><b>✦</b><span>تأثير</span><b>✦</b><span>أثر</span><b>✦</b><span lang="en">EALAMNA</span><b>✦</b></span>)}
        </div>
      </div>

      <section className="about section-pad" id="about">
        <div className="container about-grid">
          <div className="about-visual reveal">
            <div className="about-image"><img src="./assets/building-brand.webp" alt="تطبيق هوية جمعية إعلامنا على واجهة معمارية" /></div>
            <div className="about-outline">E</div>
            <div className="about-sticker"><img src="./assets/ealamna-mark.png" alt="" /><span>هوية تتجدد<br />وأثر يستمر</span></div>
            <div className="about-corner">ABOUT US <span>2026</span></div>
          </div>
          <div className="about-copy reveal">
            <Eyebrow>من نحن / ABOUT US</Eyebrow>
            <h2>لسنا مجرد<br />حكاية إعلامية،<br /><span>نحن صُنّاع الأثر.</span></h2>
            <p className="about-lead">{association.description}</p>
            <p>{association.longDescription}</p>
            <div className="about-lines"><div><span>01</span><strong>صناعة جيل إعلامي محترف</strong></div><div><span>02</span><strong>تمكين القطاع غير الربحي إعلامياً</strong></div></div>
            <a className="text-link" href="#goals">تعرّف على أهدافنا <Icon name="arrow-up" size={19} /></a>
          </div>
        </div>
      </section>

      <section className="goals section-pad" id="goals">
        <div className="container">
          <div className="goals-header"><Heading eyebrow="اتجاهاتنا / OUR GOALS" title="ستة أهداف." highlight="رؤية واحدة." description="مرتكزات نبني بها مستقبلاً إعلامياً أكثر وعياً وتأثيراً." /><div className="goals-count reveal"><span>06</span><small>أهداف استراتيجية</small></div></div>
          <div className="goals-grid">{goals.map((goal, index) => <article className="goal-card reveal" key={goal.id} style={{ transitionDelay: `${(index % 3) * 75}ms` }}><span className="goal-no">/ {goal.id}</span><span className="goal-icon"><Icon name={goal.icon} size={29} /></span><h3>{goal.title}</h3><p>{goal.description}</p><span className="goal-card-bottom"><span>استكشف رؤيتنا</span><Icon name="arrow-up" size={17} /></span></article>)}</div>
        </div>
      </section>

      <section className="vision section-pad" id="vision">
        <div className="vision-backdrop-text">EALAMNA</div>
        <div className="container vision-content">
          <div className="vision-heading reveal"><Eyebrow light>بوصلة المستقبل / OUR DIRECTION</Eyebrow><h2>طموحنا <span>عنان السماء.</span></h2><p>من فكرةٍ ملهمة إلى أثرٍ مستدام.</p></div>
          <div className="vision-cards">
            <article className="vision-card reveal"><div className="vision-card-top"><span>01 / VISION</span><Icon name="spark" size={33} /></div><h3>رؤيتنا</h3><p>{association.vision}</p><span className="vision-card-flourish">↗</span></article>
            <article className="vision-card reveal"><div className="vision-card-top"><span>02 / MISSION</span><Icon name="network" size={33} /></div><h3>رسالتنا</h3><p>{association.mission}</p><span className="vision-card-flourish">↗</span></article>
          </div>
        </div>
      </section>

      <section className="programs section-pad" id="programs">
        <div className="container">
          <div className="programs-top"><Heading eyebrow="مجالات عملنا / WHAT WE DO" title="نستثمر في الإنسان،" highlight="لنصنع الفرق." description="مسارات تصميمية تمثّل مجالات العمل الإعلامي، قابلة لاستبدالها بأسماء برامج الجمعية المعتمدة." /><a className="text-link reveal" href={`${OFFICIAL_SITE}/projects/`} target="_blank" rel="noreferrer">عرض المشاريع المنشورة <Icon name="arrow-up" size={19} /></a></div>
          <div className="programs-grid">{tracks.map((track, idx) => <button className={`program-card reveal program-${track.tone} ${activeTrack === idx ? 'program-active' : ''}`} key={track.id} onClick={() => setActiveTrack(idx)} aria-pressed={activeTrack === idx}>
            <span className="program-topline"><span>/{track.id}</span><Icon name="arrow-up" size={23} /></span>
            <div className="program-decoration"><Icon name={track.icon} size={64} strokeWidth={0.8} /><div className="program-deco-ring" /></div>
            <div className="program-card-text"><span>{track.en}</span><h3>{track.title}</h3><p>{track.description}</p></div>
          </button>)}</div>
          <div className="program-info reveal"><span className="program-info-label">المسار المختار / {tracks[activeTrack].id}</span><p><strong>{tracks[activeTrack].title}</strong> — {tracks[activeTrack].description}</p><span className="program-info-stamp">تصوّر للمحتوى · قابل للتحديث</span></div>
        </div>
      </section>

      <section className="initiatives section-pad" id="initiatives">
        <div className="container initiatives-layout">
          <div className="initiatives-copy reveal"><Eyebrow light>المبادرات / INITIATIVES</Eyebrow><h2>كل فكرة<br />يمكن أن تكون<br /><span>بداية أثر.</span></h2><p>نؤمن بأن الأفكار المبدعة تصنع فارقاً حقيقياً. خصصنا هذه المساحة لعرض المبادرات وقصص الأثر فور اعتماد محتواها.</p><a className="btn btn-white" href="#contact">شاركنا صناعة الأثر <Icon name="arrow-up" size={18} /></a></div>
          <div className="initiatives-art reveal"><div className="initiative-grid" /><div className="initiative-big-word">IDEA<span>→</span></div><div className="initiative-circle"><div className="initiative-circle-inside"><span>من الفكرة</span><strong>إلى الأثر</strong><Icon name="spark" size={30} /></div></div><div className="initiative-corner">YOUR IDEA MATTERS <span>✦</span></div></div>
        </div>
      </section>

      <section className="governance section-pad" id="governance">
        <div className="container">
          <div className="governance-top"><Heading eyebrow="الشفافية والحوكمة / GOVERNANCE" title="الثقة تبدأ" highlight="بالوضوح." description="اطّلع على أهم مستندات الجمعية وهياكلها التنظيمية عبر صفحاتها المنشورة." /><span className="governance-number reveal">01 / 04</span></div>
          <div className="governance-grid">{governance.map((item) => <a className="governance-card reveal" href={item.href} key={item.id} target="_blank" rel="noopener noreferrer"><span className="gov-no">{item.id}.</span><span className="gov-icon"><Icon name={item.icon} size={30} /></span><h3>{item.title}</h3><p>{item.subtitle}</p><span className="gov-bottom">استعراض المصدر الرسمي <Icon name="arrow-up" size={17} /></span></a>)}</div>
          <div className="license-band reveal"><div><Icon name="badge" size={23} /><span>ترخيص المركز الوطني لتنمية القطاع غير الربحي</span></div><strong dir="ltr">{association.license}</strong></div>
        </div>
      </section>

      <section className="enablers section-pad" id="enablers">
        <div className="container">
          <div className="enablers-heading"><Heading eyebrow="جهات التمكين / ENABLERS" title="أثرنا ينمو" highlight="بالتمكين." description="جهات التمكين التي حددتها الجمعية، مع أماكن مخصصة لإضافة شعاراتها المعتمدة." /><span className="enablers-marker reveal">05 <small>جهات تمكين</small></span></div>
          <div className="enablers-list">{enablers.map((item, index) => <div className="enabler-tile reveal" key={item.number} style={{ transitionDelay: `${(index % 3) * 85}ms` }}><span className="enabler-number">{item.number} /</span><div className="enabler-symbol"><span>✦</span></div><h3>{item.name}</h3><span className="enabler-code">{item.abbr}</span></div>)}</div>
          <p className="enablers-footnote">تُضاف الشعارات الرسمية للجهات بعد اعتماد ملفات الهوية الخاصة بها.</p>
        </div>
      </section>

      <section className="partners section-pad" id="partners">
        <div className="container"><Heading eyebrow="شركاء النجاح / PARTNERS" title="أثرنا أكبر" highlight="معاً." description="شراكات القطاع الخاص والقطاع غير الربحي في مسارين واضحين لعرض الجهات والمشاريع المشتركة." />
          <div className="partners-panel reveal">
            <div className="partner-tabs" role="tablist" aria-label="قطاعات الشراكات">{sectors.map((sector, idx) => <button role="tab" aria-selected={partnerSector === idx} onClick={() => setPartnerSector(idx)} key={sector.id} className={partnerSector === idx ? 'partner-tab partner-tab-active' : 'partner-tab'}><span>{sector.number}</span>{sector.name}<Icon name="arrow" size={18} /></button>)}</div>
            <div className="partner-detail" role="tabpanel" key={sectors[partnerSector].id}>
              <div className="partner-detail-top"><span>{sectors[partnerSector].en}</span><Icon name="network" size={38} /></div>
              <h3>{sectors[partnerSector].name}</h3><p>{sectors[partnerSector].description}</p>
              <div className="partner-logo-slots"><div>مساحة الشعار <span>01</span></div><div>مساحة الشعار <span>02</span></div><div>مساحة الشعار <span>03</span></div></div>
              <small className="content-placeholder-note">تُضاف شعارات الشركاء بعد توفير الملفات المعتمدة.</small>
            </div>
          </div>
        </div>
      </section>

      <section className="media section-pad" id="media">
        <div className="container"><div className="media-header"><Heading eyebrow="المركز الإعلامي / MEDIA CENTER" title="هنا تُروى" highlight="حكايات الأثر." description="نافذة على أخبار الجمعية وصورها ومحتواها المرئي." /><div className="media-filter" role="group" aria-label="تصفية المركز الإعلامي">{mediaFilters.map((filter) => <button key={filter.id} className={mediaFilter === filter.id ? 'media-filter-active' : ''} onClick={() => setMediaFilter(filter.id)}>{filter.label}</button>)}</div></div>
          <div className="media-showcase reveal" key={mediaFilter}>
            <div className="media-feature"><img src="./assets/media-studio.webp" alt="صورة توضيحية من الدليل البصري لإعلامنا لإنتاج المحتوى الإعلامي" /><span className="media-feature-tag"><Icon name="camera" size={15} /> من الهوية البصرية للجمعية</span><div className="media-feature-caption"><span>01 / VISUAL IDENTITY</span><h3>صناعة الحكاية تبدأ من هنا.</h3></div></div>
            <div className="media-side"><span className="media-current-filter">{mediaFilters.find((filter) => filter.id === mediaFilter)?.label} / MEDIA LIBRARY</span><div className="media-side-icon"><Icon name={mediaFilter === 'videos' ? 'play' : mediaFilter === 'photos' ? 'camera' : 'spark'} size={46} /></div><h3>{mediaFilter === 'news' ? 'أخبار الجمعية' : mediaFilter === 'photos' ? 'معرض الصور' : mediaFilter === 'videos' ? 'المكتبة المرئية' : 'إعلامنا في الصورة'}</h3><p>يُستعرض المحتوى المعتمد من الجمعية في هذا القسم. يمكنك الانتقال إلى المصدر الحالي للاطلاع على المنشورات المتاحة.</p><a href={mediaFilters.find((filter) => filter.id === mediaFilter)?.href ?? OFFICIAL_SITE} target="_blank" rel="noreferrer" className="media-external">زيارة الأرشيف الرسمي <Icon name="arrow-up" size={18} /></a></div>
          </div>
        </div>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="container contact-grid"><div className="contact-heading reveal"><Eyebrow light>تواصل معنا / GET IN TOUCH</Eyebrow><h2>لديك فكرة؟<br /><span>لنصنع الأثر</span> معاً.</h2><p>يسعدنا سماع أفكاركم وفتح آفاق جديدة للتعاون والشراكات الإعلامية.</p><a className="btn btn-primary" href={`${OFFICIAL_SITE}/contact-us/`} target="_blank" rel="noreferrer" data-magnetic>صفحة التواصل الرسمية <Icon name="arrow-up" size={18} /></a></div>
          <div className="contact-details reveal"><a className="contact-detail" href={`tel:${association.phone}`}><span className="contact-icon"><Icon name="phone" /></span><span><small>اتصل بنا</small><strong dir="ltr">{association.phoneDisplay}</strong></span><Icon name="arrow-up" size={20} /></a><div className="contact-detail"><span className="contact-icon"><Icon name="pin" /></span><span><small>موقعنا</small><strong>{association.address}</strong></span></div><div className="contact-detail"><span className="contact-icon"><Icon name="clock" /></span><span><small>أوقات العمل</small><strong>{association.hours}</strong></span></div><a className="contact-social" href="https://x.com/ealamna1" target="_blank" rel="noreferrer">تابع أخبارنا على منصة X <Icon name="arrow-up" size={18} /></a></div></div>
        <div className="contact-marquee" aria-hidden="true"><div>نصنع الأثر ✦ WE CREATE IMPACT ✦ نصنع الأثر ✦ WE CREATE IMPACT ✦</div></div>
      </section>
    </main>

    <footer className="footer"><div className="container"><div className="footer-upper"><div className="footer-about"><Brand variant="white" /><p>إعلامنا.. مساحة للإبداع الإعلامي، وتمكين الشباب، وصناعة أثر مستدام في المجتمع.</p></div><div className="footer-links"><h4>روابط سريعة</h4><a href="#about">عن الجمعية</a><a href="#goals">أهدافنا</a><a href="#programs">البرامج</a><a href="#initiatives">المبادرات</a></div><div className="footer-links"><h4>اكتشف أكثر</h4><a href="#governance">الحوكمة والشفافية</a><a href="#enablers">الممكّنون</a><a href="#partners">الشركاء</a><a href="#media">المركز الإعلامي</a><a href="#contact">تواصل معنا</a></div><div className="footer-ministry"><h4>الجهة الإشرافية</h4><MinistryIdentity /><p>الجمعية مرخصة من المركز الوطني لتنمية القطاع غير الربحي.</p></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} جمعية إعلامنا. جميع الحقوق محفوظة.</span><span>تصميم مستوحى من الهوية البصرية الرسمية للجمعية <b>✦</b></span><a href="#home">العودة للأعلى ↑</a></div></div></footer>
    {showTop && <button className="back-to-top" aria-label="العودة إلى الأعلى" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><Icon name="arrow-up" size={21} /></button>}
  </>;
}

export default App;
