/**
 * All public-facing content is centralized here.
 * About, vision, mission, six goals, phone, license and address were reviewed
 * against the association's published website on 2026-11-05.
 * Placeholder areas are deliberately labeled as such in the website.
 */
export const OFFICIAL_SITE = 'https://ealamna.minasatech.com';

export const association = {
  name: 'جمعية إعلامنا',
  eyebrow: 'EALAMNA ASSOCIATION',
  license: '1000758100',
  phone: '+966506463443',
  phoneDisplay: '050 646 3443',
  address: 'طريق المدينة المنورة، جدة، المملكة العربية السعودية',
  hours: '5 أيام في الأسبوع · 10:00 صباحاً – 5:00 مساءً',
  description: 'جمعية رائدة تهدف إلى تطوير وتأهيل الإعلاميين والمواهب الشابة في مجال الإعلام، بما يعكس دور الإعلام في تحقيق التنمية المستدامة ودعم الخطاب الإيجابي.',
  longDescription: 'نلتقي عند مسارين متكاملين: صناعة جيل سعودي واعد ومحترف من الإعلاميين، وتمكين القطاع غير الربحي إعلامياً باستثمار طاقات الشباب وخبرات المتخصصين، لنكون شريكاً فاعلاً في صياغة المشهد الإعلامي وتنمية المجتمع.',
  vision: 'أن تكون «إعلامنا» منصة متميزة لتطوير الإعلاميين الشباب، والمساهمة في رفع مستوى الكفاءة الإعلامية وفق المعايير العالمية.',
  mission: 'تعزيز المهارات الإعلامية للشباب من خلال برامج تدريبية مكثفة وشراكات استراتيجية مع المؤسسات الإعلامية، لإعداد كوادر قادرة على مواكبة التطورات في مجال الإعلام الرقمي والتقليدي.',
};

export const goals = [
  { id: '01', title: 'الارتقاء بالفكر الإعلامي', description: 'المساهمة بالارتقاء بالفكر الإعلامي في المجتمع.', icon: 'spark' },
  { id: '02', title: 'المسؤولية الاجتماعية', description: 'نشر ثقافة المسؤولية الاجتماعية الإعلامية.', icon: 'heart' },
  { id: '03', title: 'تأهيل الكوادر', description: 'تأهيل كوادر مختصة في مجال الإعلام الرقمي.', icon: 'users' },
  { id: '04', title: 'دعم العلاقات العامة', description: 'دعم برامج العلاقات العامة والحملات التسويقية الإعلامية.', icon: 'megaphone' },
  { id: '05', title: 'البحوث والدراسات', description: 'دعم البحوث والدراسات الاستراتيجية والإعلامية الرقمية.', icon: 'book' },
  { id: '06', title: 'مظلة إعلامية مرخصة', description: 'إيجاد مظلة مرخصة تجمع المهتمين بوسائل التواصل الاجتماعي.', icon: 'network' },
] as const;

/** General areas of work for a proposed program layout; not a published program list. */
export const tracks = [
  { id: '01', title: 'التدريب والتأهيل', en: 'LEARN & GROW', description: 'تطوير المهارات والأدوات الإعلامية لدى الشباب والمهتمين بالمجال.', icon: 'graduation', tone: 'blue' },
  { id: '02', title: 'صناعة المحتوى', en: 'CREATE & INSPIRE', description: 'تسليط الضوء على الإبداع وصناعة المحتوى الإعلامي الهادف.', icon: 'video', tone: 'teal' },
  { id: '03', title: 'التواصل والشراكات', en: 'CONNECT & IMPACT', description: 'فتح مسارات للتكامل الإعلامي والشراكات ذات الأثر المجتمعي.', icon: 'network', tone: 'dark' },
] as const;

export const governance = [
  { id: '01', title: 'ترخيص الجمعية', subtitle: 'شهادة التسجيل', href: `${OFFICIAL_SITE}/registration-image/`, icon: 'badge' },
  { id: '02', title: 'مجلس الإدارة', subtitle: 'أعضاء المجلس', href: `${OFFICIAL_SITE}/member_categories/عضو-مجلس-الإدارة/`, icon: 'users' },
  { id: '03', title: 'الجمعية العمومية', subtitle: 'أعضاء الجمعية العمومية', href: `${OFFICIAL_SITE}/member_categories/عضو-الجمعية-العمومية/`, icon: 'network' },
  { id: '04', title: 'اللائحة الأساسية', subtitle: 'بوابة اللوائح والسياسات', href: `${OFFICIAL_SITE}/file_category/لوائح/`, icon: 'file' },
] as const;

/** Enablers specified by the association; use text identities until logo permissions/assets are supplied. */
export const enablers = [
  { name: 'المركز الوطني لتنمية القطاع غير الربحي', number: '01', abbr: 'NCNP' },
  { name: 'وزارة الإعلام', number: '02', abbr: 'MEDIA' },
  { name: 'هيئة تنظيم الإعلام', number: '03', abbr: 'GAMR' },
  { name: 'وزارة الموارد البشرية والتنمية الاجتماعية', number: '04', abbr: 'HRSD' },
  { name: 'مجلس الجمعيات', number: '05', abbr: 'COUNCIL' },
] as const;

export const sectors = [
  { id: 'private', number: '01', name: 'القطاع الخاص', en: 'PRIVATE SECTOR', description: 'مساحة للشركات والمؤسسات التي تجمعنا بها شراكات نوعية ومستدامة.' },
  { id: 'nonprofit', number: '02', name: 'القطاع غير الربحي', en: 'NONPROFIT SECTOR', description: 'مساحة للجهات غير الربحية التي نعمل معها لصناعة أثر يصل إلى المجتمع.' },
] as const;

export const mediaFilters = [
  { id: 'all', label: 'الكل', href: `${OFFICIAL_SITE}/` },
  { id: 'news', label: 'الأخبار', href: `${OFFICIAL_SITE}/news/` },
  { id: 'photos', label: 'الصور', href: `${OFFICIAL_SITE}/gallery/` },
  { id: 'videos', label: 'الفيديوهات', href: `${OFFICIAL_SITE}/videos/` },
] as const;

export const nav = [
  { href: '#about', label: 'عن الجمعية' },
  { href: '#goals', label: 'أهدافنا' },
  { href: '#vision', label: 'الرؤية والرسالة' },
  { href: '#programs', label: 'البرامج' },
  { href: '#initiatives', label: 'المبادرات' },
  { href: '#governance', label: 'الحوكمة' },
  { href: '#enablers', label: 'الممكّنون' },
  { href: '#partners', label: 'الشركاء' },
  { href: '#media', label: 'المركز الإعلامي' },
] as const;
