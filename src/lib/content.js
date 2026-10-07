// All site copy in one place. Brand rule: never use em-dashes.

export const EMAIL = 'Operations@hydris.ai';

export const NAV = [
  { key: 'home', label: 'Index', href: '/' },
  { key: 'about', label: 'About', href: '/about/' },
  { key: 'contact', label: 'Contact', href: '/contact/' },
];

export const SERVICES = [
  {
    tag: 'Workflow automation',
    title: 'Automate repetitive tasks',
    text: 'We automate repetitive plant tasks with guided workflows that save time and reduce errors, keeping every shift running smoothly.',
    tags: ['Internal task bots', '100+ automations'],
    widget: 'tasks',
  },
  {
    tag: 'AI assistant',
    title: 'Delegate daily tasks',
    text: 'Clear guidance and structured, real time workflows give operators step by step tasks aligned to plant conditions and priorities.',
    tags: ['Summaries', 'Scheduling', 'Many more'],
    widget: 'assist',
  },
  {
    tag: 'Operations',
    title: 'Accelerate operational growth',
    text: 'Better decisions, less downtime, and teams that work smarter for faster growth.',
    tags: ['Operations', 'Support', 'Tribal data'],
    widget: 'ticket',
  },
  {
    tag: 'Custom projects',
    title: 'Build smarter systems',
    text: 'Starting from scratch or enhancing an existing system, we offer strategic consulting and custom AI projects aligned with your goals.',
    tags: ['Strategy', 'Custom AI', 'Consulting'],
    widget: 'sched',
  },
];

export const STEPS = [
  { title: 'Smart analyzing', text: 'We assess your needs and identify AI solutions to streamline workflows and improve efficiency.', widget: 'radar' },
  { title: 'AI development', text: 'Our team builds intelligent automation systems tailored to your treatment processes.', widget: 'code' },
  { title: 'Seamless integration', text: 'We integrate AI solutions into your existing infrastructure with no disruption.', widget: 'int' },
  { title: 'Continuous optimization', text: 'We refine performance, analyze insights, and enhance automation for long-term growth.', widget: 'opt' },
];

export const STACK = ['SCADA', 'LIMS', 'CMMS', 'Historian', 'GIS', 'Excel', 'Shift logs', 'Lab sheets', 'SOPs'];

export const BENEFITS = [
  { icon: 'bolt', title: 'Increased productivity', text: 'Actionable insights from AI-driven analytics improve decisions and strategy.' },
  { icon: 'users', title: 'Greater team efficiency', text: 'Personalized guidance improves response times and day to day teamwork.' },
  { icon: 'clock', title: '24/7 availability', text: 'Support that runs around the clock, without downtime.' },
  { icon: 'coins', title: 'Cost reduction', text: 'Less manual work, lower operating costs, better use of resources.' },
  { icon: 'book', title: 'Tribal knowledge insights', text: 'Decades of operator experience turned into guidance for every shift.' },
  { icon: 'chart', title: 'Operational advancement', text: 'Smarter decisions and less manual effort across the plant.' },
];

export const HOME_FAQ = [
  ['How can Hydris AI improve my plant operations?',
    'Hydris captures how your most experienced operators solve problems and turns it into step by step guidance. Teams resolve issues faster, automate repetitive tasks, and keep every shift consistent.'],
  ['Is Hydris AI difficult to implement in my facility?',
    'No. Hydris is designed for simple adoption. It requires minimal setup and works alongside your existing workflows. Our team ensures smooth onboarding so your operators can start using it quickly.'],
  ['Which types of water facilities benefit from Hydris AI?',
    'Wastewater and drinking water treatment plants, water reuse facilities, and industrial water operations. Any team that relies on experienced operators can benefit.'],
  ['Do operators need technical expertise to use Hydris AI?',
    'Not at all. Our platform is user-friendly and built for all skill levels. We provide onboarding, tutorials, and customer support to ensure you can easily navigate and use the system.'],
  ['What kind of support does Hydris provide after onboarding?',
    'Ongoing support. We monitor performance, refine guidance as your plant changes, and keep improving automations so the system grows with your team.'],
];

export const WHO = [
  { title: 'Knowledge capture', text: 'Preserve expert tribal knowledge and deliver it to every operator instantly.' },
  { title: 'Custom intelligence', text: 'Hydris adapts to each facility, creating guidance tailored to your exact processes.' },
  { title: 'Rapid guidance', text: 'Resolve plant issues up to 95 percent faster with guided, real time insights.' },
];

export const VALUES = [
  { title: 'Driving innovation forward', text: 'We use advanced AI to strengthen water operations and make complex processes simple and efficient.' },
  { title: 'Integrity and trust', text: 'Trust and clarity guide everything we build, so operators feel supported, not replaced.' },
  { title: 'Empowering growth', text: 'Plants scale performance with faster decisions, less manual work, and smarter daily operations.' },
  { title: 'Operators first', text: 'Your operational success is our priority. We build for real impact on the ground.' },
];

export const MANUAL = ['Guesswork', 'Limited by work hours', 'High labor costs and overhead', 'Slow and time-consuming tasks', 'Disconnected and repetitive work', 'Inconsistent and dependent on workforce'];
export const AUTO = ['Smart, AI-driven decisions', '24/7 automated workflows', 'Scalable and cost-effective', 'Instant data processing', 'Seamless system integration', 'Consistent and reliable output'];

export const TEAM = [
  { title: 'Industry experts', text: 'People who know how water plants really run, shift after shift.' },
  { title: 'Engineers', text: 'Builders of reliable, secure AI systems that fit existing infrastructure.' },
  { title: 'Designers', text: 'Craftspeople who make complex tools feel simple for every operator.' },
];

export const ABOUT_FAQ = [
  ['Why is the knowledge gap bigger for WWTP operators?',
    'Much of what keeps a wastewater plant stable is learned on the job and lives with experienced operators. As they retire, that knowledge leaves with them, and new operators often have to learn under pressure.'],
  ['What does Hydris AI do?',
    'Hydris AI captures expert operator knowledge and delivers it as real time, step by step guidance, while automating repetitive plant tasks.'],
  ['Who is Hydris for?',
    'Operators, supervisors, and managers at water and wastewater facilities, from new hires to senior staff.'],
  ['What makes Hydris different?',
    'It is built specifically for water operations. Hydris learns from your own team and adapts to your exact processes, so guidance fits your plant instead of a generic template.'],
  ['How does Hydris help new operators?',
    'New operators get instant access to the knowledge of experienced colleagues, with clear guidance for each task, so they build confidence faster and make fewer mistakes.'],
];

export const FACILITIES = ['Wastewater treatment', 'Drinking water treatment', 'Water reuse', 'Industrial water', 'Collection and distribution', 'Other'];
