// Landing copy, kept apart from layout so words change in one place.
// Product lines are the app's own copy; counts come from the app's data (topic-frequency API,
// Draft Lab process library, /api/courses) as of 2026-10-27. Law is quoted from the local
// High Court of Lagos State (Civil Procedure) Rules 2019 text.

export const CONTACT_EMAIL = "paul@lextutor.online";
export const ACCESS_HREF = `mailto:${CONTACT_EMAIL}?subject=LexTutor%20early%20access`;

export const nav = [
  { label: "Workspaces", href: "#workspaces" },
  { label: "Engine", href: "#engine" },
  { label: "Courses", href: "#courses" },
  { label: "Founder", href: "#founder" },
];

export const hero = {
  label: "Legal evaluation engine",
  lines: ["Legal work,", "checked against", "the law it answers to."],
  lede: "LexTutor audits legal drafts and procedural matters against the rules and authorities that govern them.",
  proof: "Demonstrated across the Nigerian Bar Finals, 2010 to 2025.",
  primary: "Request access",
  secondary: "See the workspaces",
};

export const premise = {
  label: "Premise",
  statement:
    "Law is structural and interpretive. LexTutor checks the structure with fixed rules, reads the interpretation with a model held to the record, and ties each finding to the rule or authority behind it.",
};

export type Workspace = {
  id: "answer" | "trace" | "build" | "review";
  n: string;
  verb: string;
  name: string;
  line: string;
  fact: string;
};

export const workspaces: Workspace[] = [
  {
    id: "answer",
    n: "01",
    verb: "Answer",
    name: "Paper Practice",
    line: "Every Bar Finals question, 2010 to 2025. Lexa reads your answer, names the fatal omission, and places you from Not quite to Exam-ready.",
    fact: "Court and procedure · Omission and consequence · Authority and pinpoint",
  },
  {
    id: "trace",
    n: "02",
    verb: "Trace",
    name: "Topic Drilldown",
    line: "Trace one legal point through the authority, the variation that changes the answer, and every sitting that put it under pressure.",
    fact: "Interlocutory Applications: set in 15 of 18 sittings, compulsory in 8",
  },
  {
    id: "build",
    n: "03",
    verb: "Build",
    name: "Draft Lab",
    line: "Draft any court process. Every component is checked against the drafting rules that govern it, whatever the matter.",
    fact: "10 categories · 43 court processes",
  },
  {
    id: "review",
    n: "04",
    verb: "Review",
    name: "Lexa Points",
    line: "Lexa places recognition, correction and the next point to develop beside the exact sentence that prompted each finding.",
    fact: "Every note tied to the rule behind it",
  },
];

// Draft Lab specimen: the app's own Lagos motion; the note quotes Order 43 r 1(1).
export const specimen = {
  court: ["In the High Court of Lagos State", "In the Lagos Judicial Division", "Holden at Lagos"],
  suit: "Suit No: LD/4192GCM/2025",
  title: "Motion on notice",
  struck: "pursuant to the inherent jurisdiction of this Court only",
  inserted:
    "PURSUANT TO ORDER 43 RULE 1 OF THE HIGH COURT OF LAGOS STATE (CIVIL PROCEDURE) RULES 2019 AND UNDER THE INHERENT JURISDICTION OF THIS HONOURABLE COURT",
  takeNotice:
    "that this Honourable Court will be moved on Tuesday the 14th day of October 2025 at the hour of 9 o’clock in the forenoon or so soon thereafter as Counsel may be heard praying the Court for an Order of interlocutory injunction.",
  note: {
    cite: "Order 43 Rule 1(1), Lagos 2019",
    body: "A motion must state the Rule of Court or Law under which it is brought.",
  },
};

// Lexa Points specimen on 2025 Question 3 (a Lagos claim). Lagos 2019 has no undefended list;
// Order 13 Rule 1 lets the claimant file for summary judgment with the originating process.
export const lexaSpecimen = {
  question: "2025 Question 3(a) · Recover the balance without full trial",
  before: "I will commence the action under the ",
  flagged: "undefended list procedure",
  after: ", since the debtor has no defence to the claim.",
  note: {
    kind: "Correction",
    cite: "Order 13 Rule 1, Lagos 2019",
    body: "Lagos has no undefended list. The claimant files for summary judgment with the originating process.",
  },
};

export const engine = {
  label: "Engine",
  heading: ["Fixed rules where the law is fixed.", "Judgment where it is not."],
  tiers: [
    {
      n: "I",
      name: "Rules",
      body: "Fixed checks for what the law fixes: the court, the originating process, the form and the time.",
      status: "Running",
    },
    {
      n: "II",
      name: "Decisions",
      body: "Typed checks that answer each requirement yes or no, before a word of feedback is written.",
      status: "Running",
    },
    {
      n: "III",
      name: "Synthesis",
      body: "A model writes the correction from those findings, on the learner’s own document, citing the rule behind it.",
      status: "Running",
    },
  ],
  stats: [
    { value: 18, suffix: "", label: "Civil sittings traced, 2010 to 2025" },
    { value: 15, suffix: "", label: "Civil topics mapped question by question" },
    { value: 43, suffix: "", label: "Court processes checked in Draft Lab" },
  ],
};

export const courses = {
  label: "Courses",
  heading: "Proven first on the Bar Finals.",
  rows: [
    { name: "Civil Litigation", status: "Live", tags: [] },
    { name: "Criminal Litigation", status: "Live", tags: [] },
    { name: "Corporate Law Practice", status: "Next", tags: [] },
    { name: "Property Law Practice", status: "Next", tags: [] },
    { name: "Professional Ethics", status: "Next", tags: [] },
  ],
};

export const founder = {
  label: "Founder",
  name: "Ayooluwa Paul Obembe, Esq.",
  role: "Founder, LexTutor",
  body: "LexTutor is an AI legal evaluation system that audits legal work against the rules, authorities and procedural requirements that govern it. Its architecture is domain-agnostic; its first implementation is legal drafting and procedural fidelity, proven on Nigerian Bar examination work.",
  close: "See it audit your draft.",
};
