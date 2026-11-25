/**
 * Portfolio content aligned to Pooja P V's November 2026 Python Django Developer resume.
 * DSA and SDLC are retained as additional skills previously confirmed by Pooja.
 * Edit this file to change content; components only read from it.
 */

export const EMAIL = 'poojapv525@gmail.com'
export const PHONE = '+91 6235073825'
/** Flip to true to show the phone number in the contact section. */
export const SHOW_PHONE = false

export const LINKS = {
  github: 'https://github.com/Pooja-pv',
  linkedin: 'https://www.linkedin.com/in/poojapv/',
  resume: '/Pooja-PV-Junior-Django-Developer.pdf'
} as const

export type ProjectId = 'helpdesk' | 'trackora' | 'hireflow'

export type Project = {
  id: ProjectId
  number: string
  name: string
  kind: string
  stack: string[]
  bullets: string[]
  live: string
  liveLabel: string
  repo: string
}

export const projects: Project[] = [
  {
    id: 'helpdesk',
    number: '01',
    name: 'HelpDesk Pro',
    kind: 'IT Service Desk · Django REST API',
    stack: ['Python', 'Django REST Framework', 'PostgreSQL', 'JWT', 'Docker', 'Docker Compose', 'pytest', 'GitHub Actions'],
    bullets: [
      'Modelled the IT ticket lifecycle in Django REST Framework, covering creation, assignment, resolution and closure across employee, agent and administrator roles.',
      'Secured endpoints with JWT authentication and role- and object-level permissions; added audit logs, comments, attachments, search and pagination.',
      'Reduced ORM query overhead with select_related and prefetch_related; containerized the stack with Docker Compose and automated pytest checks through GitHub Actions.'
    ],
    live: 'https://helpdesk-pro-l0ra.onrender.com',
    liveLabel: 'helpdesk-pro-l0ra.onrender.com',
    repo: 'https://github.com/Pooja-pv/HelpDesk-Pro'
  },
  {
    id: 'trackora',
    number: '02',
    name: 'Trackora',
    kind: 'Full-stack Job Application Tracker',
    stack: ['Python', 'Django REST Framework', 'PostgreSQL', 'React', 'TypeScript', 'Vite'],
    bullets: [
      'Connected a React and TypeScript application to Django REST endpoints to track job opportunities and application progress.',
      'Implemented session authentication, CSRF protection and user-scoped data access.',
      'Built a job-posting extraction endpoint that parses HTML and JSON-LD, with URL validation before processing.'
    ],
    live: 'https://trackora-nhvz.onrender.com',
    liveLabel: 'trackora-nhvz.onrender.com',
    repo: 'https://github.com/Pooja-pv/Trackora'
  },
  {
    id: 'hireflow',
    number: '03',
    name: 'HireFlow',
    kind: 'Recruitment & Applicant Workflow',
    stack: ['Python', 'Django REST Framework', 'MySQL', 'JavaScript', 'HTML', 'CSS', 'Bootstrap'],
    bullets: [
      'Implemented applicant and recruiter workflows for filtered job discovery, resume uploads and application status tracking.',
      'Designed the MySQL schema and exposed Job and Application resources through REST endpoints consumed with the Fetch API, including validation and role-based access.'
    ],
    live: 'https://hireflow-dlqi.onrender.com',
    liveLabel: 'hireflow-dlqi.onrender.com',
    repo: 'https://github.com/Pooja-pv/hireflow'
  }
]

/* ---------- Capability matrix ---------- */

export type ColumnId = ProjectId | 'inmakes' | 'aai'

export const columns: { id: ColumnId; label: string; short: string; kind: string }[] = [
  { id: 'helpdesk', label: 'HelpDesk Pro', short: 'HD', kind: 'Project' },
  { id: 'trackora', label: 'Trackora', short: 'TK', kind: 'Project' },
  { id: 'hireflow', label: 'HireFlow', short: 'HF', kind: 'Project' },
  { id: 'inmakes', label: 'Inmakes Infotech', short: 'IN', kind: 'Internship' },
  { id: 'aai', label: 'Airports Authority', short: 'AAI', kind: 'Apprenticeship' }
]

export type Capability = {
  id: string
  label: string
  evidence: Partial<Record<ColumnId, string>>
}

export const capabilities: Capability[] = [
  {
    id: 'api',
    label: 'Django REST API development',
    evidence: {
      helpdesk: 'Designed ticket lifecycle endpoints for creation, assignment, resolution and closure.',
      trackora: 'Integrated a React/TypeScript client with Django REST APIs and built a validated job-posting extraction endpoint.',
      hireflow: 'Developed Job and Application endpoints for applicant and recruiter workflows.'
    }
  },
  {
    id: 'auth',
    label: 'Authentication & authorization',
    evidence: {
      helpdesk: 'Implemented JWT authentication with role- and object-level permissions for employees, agents and administrators.',
      trackora: 'Implemented session authentication, CSRF protection and user-scoped data access.',
      hireflow: 'Applied role-based access to recruiter and applicant workflows.'
    }
  },
  {
    id: 'data',
    label: 'Relational modelling & SQL',
    evidence: {
      helpdesk: 'Designed relational ticket models and optimized ORM access with select_related and prefetch_related.',
      trackora: 'Used PostgreSQL-backed, user-scoped application data.',
      hireflow: 'Designed the MySQL schema for Job and Application resources.',
      inmakes: 'Wrote SQL joins, aggregations and date functions to retrieve and summarize data.'
    }
  },
  {
    id: 'testing',
    label: 'Automated testing & CI',
    evidence: {
      helpdesk: 'Added pytest coverage and GitHub Actions checks that run on pushes.'
    }
  },
  {
    id: 'delivery',
    label: 'Containerization & deployment',
    evidence: {
      helpdesk: 'Containerized the application with Docker Compose and configured deployment to Render.',
      trackora: 'Built and deployed the full-stack application on Render.',
      hireflow: 'Built and deployed the recruitment platform on Render.'
    }
  },
  {
    id: 'frontend',
    label: 'Frontend implementation',
    evidence: {
      trackora: 'Built the client with React, TypeScript and Vite.',
      hireflow: 'Implemented applicant and recruiter interfaces with job filters, resume uploads and status tracking.',
      inmakes: 'Built responsive pages with HTML, CSS, Bootstrap, JavaScript and jQuery, including validated forms and interactive elements.'
    }
  },
  {
    id: 'python',
    label: 'Python, OOP & data structures',
    evidence: {
      helpdesk: 'Implemented the backend using Python and Django REST Framework.',
      trackora: 'Implemented the backend using Python and Django REST Framework.',
      hireflow: 'Implemented the backend using Python and Django REST Framework.',
      inmakes: 'Developed Python programs using object-oriented programming and data structures.'
    }
  },
  {
    id: 'support',
    label: 'Technical troubleshooting',
    evidence: {
      aai: 'Resolved system and software issues by following cases through to resolution with colleagues.'
    }
  },
  {
    id: 'automation',
    label: 'Reporting automation & documentation',
    evidence: {
      aai: 'Automated recurring reports with Excel macros and prepared technical documentation.'
    }
  }
]

/* ---------- Toolbox (resume skills + DSA and SDLC) ---------- */

export const toolbox: { label: string; items: string[] }[] = [
  { label: 'Languages', items: ['Python', 'SQL', 'JavaScript', 'TypeScript'] },
  { label: 'Django & backend', items: ['Django', 'Django REST Framework', 'MTV Architecture', 'Django ORM', 'REST API Development', 'JWT Authentication', 'Session Authentication', 'Role-Based Access Control'] },
  { label: 'Databases', items: ['PostgreSQL', 'MySQL', 'Relational Schema Design', 'SQL Joins & Aggregations', 'Query Optimization'] },
  { label: 'Frontend', items: ['React', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'jQuery', 'Responsive UI Development'] },
  { label: 'Testing & delivery', items: ['pytest', 'Unit & API Testing', 'Postman', 'Docker', 'Docker Compose', 'Git', 'GitHub', 'GitHub Actions (CI/CD)', 'Render'] },
  { label: 'Engineering practice', items: ['Object-Oriented Programming', 'Data Structures & Algorithms', 'SDLC', 'Input Validation', 'Technical Documentation'] }
]

/* ---------- Experience & education ---------- */

export const experience = [
  {
    role: 'Python Full Stack Intern',
    org: 'Inmakes Infotech Pvt Ltd',
    dates: 'Jul 2026 – Present',
    current: true,
    bullets: [
      'Built responsive web pages using HTML, CSS, Bootstrap, JavaScript and jQuery, including forms and interactive elements.',
      'Developed Python programs using object-oriented programming and data structures; wrote SQL queries with joins, aggregations, sorting and date functions to retrieve and summarize data.'
    ]
  },
  {
    role: 'Apprentice Trainee',
    org: 'Airports Authority of India',
    dates: 'Jun 2025 – Jun 2026',
    current: false,
    bullets: [
      'Troubleshot day-to-day system and software issues; communicated updates and followed up with colleagues through resolution.',
      'Automated recurring reports using Excel macros and prepared technical documentation.'
    ]
  }
]

export const education = {
  degree: 'B.Sc. Computer Science',
  school: 'SES College, Kannur University',
  dates: 'Jun 2022 – May 2025'
}

/* ---------- Lab (local simulations, never call a real backend) ---------- */

export const apiDemos = [
  { label: 'List tickets', method: 'GET', endpoint: '/api/tickets/', body: null as null | Record<string, string>, status: '200 OK', response: [{ id: 104, title: 'VPN access request', status: 'in_progress', priority: 'high' }, { id: 105, title: 'Email sync issue', status: 'open', priority: 'medium' }] as unknown },
  { label: 'Create ticket', method: 'POST', endpoint: '/api/tickets/', body: { title: 'Unable to access dashboard', priority: 'high' }, status: '201 CREATED', response: { id: 106, title: 'Unable to access dashboard', status: 'open', priority: 'high' } as unknown },
  { label: 'Read another employee’s ticket', method: 'GET', endpoint: '/api/tickets/104/', body: null, status: '403 FORBIDDEN', response: { detail: 'You do not have permission to perform this action.' } as unknown }
]

export const rolePermissions: Record<string, { allowed: string[]; blocked: string[] }> = {
  Employee: { allowed: ['Create a ticket', 'View own tickets', 'Comment on own tickets'], blocked: ['Assign tickets', 'Manage users', 'View other employees’ tickets'] },
  'Support Agent': { allowed: ['View assigned tickets', 'Update ticket status', 'Add comments and resolution notes'], blocked: ['Manage user accounts', 'Change global settings'] },
  Administrator: { allowed: ['Manage users', 'Assign and oversee tickets', 'Review audit logs'], blocked: [] }
}

export const architectureLayers = [
  { name: 'React + TypeScript', kind: 'Client', detail: 'Collects input, holds page state and renders data from the API.', code: 'const res = await api.get("/applications/")' },
  { name: 'REST API', kind: 'HTTP contract', detail: 'Resources, methods and status codes carry JSON between client and server.', code: 'GET /api/applications/ · Accept: application/json' },
  { name: 'Django REST Framework', kind: 'Application', detail: 'Serializers validate the request and permissions decide who may proceed.', code: 'serializer.is_valid(raise_exception=True)' },
  { name: 'PostgreSQL', kind: 'Persistence', detail: 'Relational records, queried through the Django ORM and scoped to the signed-in user.', code: 'Application.objects.filter(owner=request.user)' }
]

export const dbTables = [
  { name: 'users', fields: ['id · PK', 'email', 'password_hash'], relation: 'One user owns many applications.' },
  { name: 'applications', fields: ['id · PK', 'user_id · FK', 'company', 'role', 'status'], relation: 'Each application belongs to exactly one user, so every query is scoped by owner.' },
  { name: 'activity', fields: ['id · PK', 'application_id · FK', 'event', 'created_at'], relation: 'An application can have many activity records.' }
]
