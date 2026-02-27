# 📁 `C:\Users\Admin\Documents\LexTutor_Ai\ORDERS`

```markdown
# LexTutor Multi-Agent Skill System

## 🎯 Overview

This is the **central intelligence framework** for the LexTutor platform. It orchestrates a team of specialized AI agents that work together to maintain brand consistency, mobile-first priorities, and enterprise-grade quality across all development, design, and content work.

**Think of this as your virtual team** — each agent brings deep specialization while adhering to unified standards.

---

## 📂 Folder Structure

```
.agent/skills/
│
├── README.md                           ← This file (System Documentation)
│
├── DESIGN_N_CONTENT/
│   ├── SKILL.md                        ← Main Orchestrator (Design & Content)
│   ├── UX_Designer.md                  ← UX Specialization
│   ├── UI_Designer.md                  ← UI Specialization
│   ├── Conversion_Copywriter.md        ← Copy Specialization
│   └── SEO_Specialist.md               ← SEO Specialization
│
├── TECHNICAL_EXECUTION/
│   ├── SKILL.md                        ← Main Orchestrator (Technical)
│   ├── Frontend_Developer.md           ← Frontend Specialization
│   ├── Backend_Developer.md            ← Backend Specialization
│   └── Solution_Architect.md           ← Architecture Specialization
│
└── QUALITY_N_OPTIMIZATION/
    ├── SKILL.md                        ← Main Orchestrator (Quality)
    ├── QA_Engineer.md                  ← QA Specialization
    └── DevOps_Engineer.md              ← DevOps Specialization
```

---

## 🚀 Quick Start

### For New AI Sessions

Paste this activation prompt at the start of every new session:

```
You are the LexTutor [ORCHESTRATOR NAME] Intelligence Agent.
Load and follow the guidelines in [PATH_TO_SKILL.md]

For this task, activate the appropriate mode:
- [MODE 1] → Read [FILE_1.md]
- [MODE 2] → Read [FILE_2.md]

Here is my request: [YOUR TASK]
```

### Example Activations

**Design Task:**
```
You are the LexTutor Design & Content Intelligence Agent.
Load and follow the guidelines in DESIGN_N_CONTENT/SKILL.md

For this task, activate the appropriate mode:
- UI / Visual → Read UI_Designer.md
- Copy / Content → Read Conversion_Copywriter.md

Here is my request: Redesign the mobile hero section to improve text readability.
```

**Technical Task:**
```
You are the LexTutor Technical Execution Intelligence Agent.
Load and follow the guidelines in TECHNICAL_EXECUTION/SKILL.md

For this task, activate the appropriate mode:
- Frontend / UI Engineering → Read Frontend_Developer.md

Here is my request: Fix the ID card scaling issue on mobile devices.
```

**Quality Task:**
```
You are the LexTutor Quality & Optimization Intelligence Agent.
Load and follow the guidelines in QUALITY_N_OPTIMIZATION/SKILL.md

For this task, activate the appropriate mode:
- QA / Testing → Read QA_Engineer.md

Here is my request: Create automated tests for the mobile navigation flow.
```

---

## 🧠 Agent Orchestrators

| Orchestrator | File | Use For |
|--------------|------|---------|
| **Design & Content** | `DESIGN_N_CONTENT/SKILL.md` | UX, UI, Copywriting, SEO, Visual Design |
| **Technical Execution** | `TECHNICAL_EXECUTION/SKILL.md` | Frontend, Backend, Architecture, APIs |
| **Quality & Optimization** | `QUALITY_N_OPTIMIZATION/SKILL.md` | Testing, CI/CD, DevOps, Performance |

---

## ⚡ How It Works

### 1. Orchestrator Pattern

Each **Orchestrator Agent** is a generalist that knows when to tap into specialist knowledge. Think of them as team leads who delegate to experts.

```
┌─────────────────────────────────────┐
│   ORCHESTRATOR AGENT                │
│   (e.g., Design & Content)          │
│                                     │
│   ┌───────────────────────────────┐ │
│   │  Evaluates Task               │ │
│   │  ↓                            │ │
│   │  Loads Appropriate Skill File │ │
│   │  ↓                            │ │
│   │  Executes with Specialization │ │
│   └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

### 2. Action Mode Switching

Agents switch between **specialized modes** based on task requirements:

| Task Type | Mode Activated | Skill File Loaded |
|-----------|---------------|-------------------|
| User flows, navigation | UX Mode | `UX_Designer.md` |
| Colors, spacing, components | UI Mode | `UI_Designer.md` |
| Headlines, CTAs, tone | Copy Mode | `Conversion_Copywriter.md` |
| Metadata, keywords | SEO Mode | `SEO_Specialist.md` |
| React, Tailwind, animations | Frontend Mode | `Frontend_Developer.md` |
| APIs, databases, auth | Backend Mode | `Backend_Developer.md` |
| System design, scalability | Architecture Mode | `Solution_Architect.md` |
| Testing, automation | QA Mode | `QA_Engineer.md` |
| Deployment, monitoring | DevOps Mode | `DevOps_Engineer.md` |

### 3. Core Protocol Inheritance

**All agents inherit the LexTutor Core Protocol:**

- ✅ **Mobile-First Mandate** — 80% of users are on mobile. Test 375px - 414px first.
- ✅ **Preservation Rule** — Don't refactor working code (Nav, Hero, ID Cards) without permission.
- ✅ **Performance Standard** — Zero layout shift, 60fps animations, <100ms input delay.
- ✅ **Security & Privacy** — Legal data requires enterprise-grade security.

---

## 📋 Usage Guidelines

### ✅ DO

- **Always activate the orchestrator** before starting work
- **Specify which mode(s)** to activate for your task
- **Test on mobile viewports** before marking tasks complete
- **Flag risky changes** using escalation protocols
- **Document decisions** in commit messages or comments
- **Update skill files** when you discover new patterns or requirements

### ❌ DON'T

- **Skip the orchestrator** for "quick tasks" (consistency matters)
- **Refactor core components** (Nav, Hero, ID Cards) without explicit permission
- **Assume desktop = mobile** (always test both)
- **Use `any` in TypeScript** (fix types properly)
- **Ignore sync conflicts** (force reload if changes don't reflect)
- **Bypass escalation protocols** (flag risky changes before proceeding)

---

## 🔧 Troubleshooting

### Issue: Changes Not Reflecting in Browser

**Cause:** Anti Gravity / VS Code sync conflict

**Fix:**
1. Check terminal: `npx next dev -H 0.0.0.0` is running
2. Close and reopen the file tab in your editor
3. Hard refresh browser: `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)
4. Add `console.log('TEST-OK')` to verify pipeline
5. If still broken, restart dev server

### Issue: Agent Ignoring Skill File Guidelines

**Cause:** Agent forgot context or task was ambiguous

**Fix:**
1. Remind agent: "Re-read [SKILL_FILE.md] and follow the guidelines"
2. Be more specific about which mode to activate
3. Restart the session with fresh activation prompt

### Issue: Mobile Layout Broken After Change

**Cause:** Desktop styles bleeding into mobile

**Fix:**
1. Revert the change immediately
2. Apply mobile-specific overrides with `md:` prefixes
3. Test on 375px viewport before marking complete
4. Document the fix in the skill file for future reference

### Issue: Flaky Tests Failing Intermittently

**Cause:** Race conditions or unstable selectors

**Fix:**
1. Use `data-testid` attributes for stable selectors
2. Add explicit waits (`cy.wait()`, `waitForNetworkIdle`)
3. Check for loading states or animations causing timing issues
4. Treat flaky tests as bugs — fix the root cause

---

## 📊 Quality Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| **Mobile Usability** | 100% pass rate | Test on 375px - 414px viewports |
| **Visual Consistency** | 0 design drift | Compare against design system |
| **Performance** | 90+ Lighthouse | Run Lighthouse audit |
| **Test Coverage** | 80%+ critical paths | Cypress/Playwright coverage reports |
| **Uptime** | 99.9% | Vercel/UptimeRobot monitoring |
| **Type Safety** | 0 `any` types | TypeScript strict mode |

---

## 🔄 Updating Skill Files

### When to Update

- ✅ After discovering a new pattern that should be standardized
- ✅ After fixing a recurring bug that should be prevented
- ✅ After brand/visual identity changes
- ✅ After technical stack changes (e.g., new framework)
- ✅ Quarterly review (scheduled maintenance)

### How to Update

1. **Open the relevant skill file** (e.g., `UI_Designer.md`)
2. **Add the new guideline** under the appropriate section
3. **Commit with clear message:** `feat(skills): Add mobile ID card scaling guideline`
4. **Test the new guideline** in the next session

---

## 🎓 Onboarding New AI Sessions

When starting a fresh AI session (new chat, new agent, new tool):

1. **Paste the activation prompt** for the relevant orchestrator
2. **Wait for confirmation** that skill files are loaded
3. **Provide context** about the current task
4. **Specify which mode(s)** to activate
5. **Review the output** against skill file guidelines

**Example:**
```
👤 You: You are the LexTutor Technical Execution Intelligence Agent.
       Load TECHNICAL_EXECUTION/SKILL.md
       Activate Frontend_Developer.md mode
       Task: Fix the mobile nav alignment issue

🤖 Agent: I am activating LexTutor Technical Execution mode.
          I have loaded Frontend_Developer.md guidelines.
          I will prioritize mobile-first implementation and preserve
          existing nav logic. Let me review the current implementation...
```

---

## 📞 Escalation Paths

| Issue Type | Escalate To | When |
|------------|-------------|------|
| Core Component Breakage | Human Team Lead | Nav, Hero, or ID Cards broken |
| Security Vulnerability | CTO / Legal Counsel | Data breach, XSS, CSRF detected |
| Data Integrity Risk | Solution Architect | Schema migration, data deletion |
| Brand Identity Change | Design Lead | Voice, visual identity, logo changes |
| Performance Regression | Technical Lead | Lighthouse score drops below 90 |
| Extended Downtime | DevOps Lead | Site down >30 minutes |

---

## 🏆 Success Criteria

This system is working when:

- ✅ All agents produce **consistent, on-brand output**
- ✅ Mobile layouts **never regress** after changes
- ✅ Core components (Nav, Hero, ID Cards) **remain stable**
- ✅ Tasks are completed **faster with fewer revisions**
- ✅ New AI sessions **onboard in <5 minutes**
- ✅ Quality metrics **meet or exceed targets**

---

## 📚 Additional Resources

- **LexTutor Core Protocol** — Inherited by all agents (Mobile-First, Preservation, Performance, Security)
- **Design System** — `tailwind.config.ts`, `globals.css`
- **Component Library** — `components/` folder
- **Test Suites** — `cypress/` or `__tests__/` folders
- **Deployment Config** — `.vercel/`, `.github/workflows/`

---

**Last Updated:** February 2026
**Maintained By:** LexTutor Development Team
**Version:** 1.0.0
```

---

## 🎯 This README Gives You:

| Benefit | Description |
|---------|-------------|
| **Onboarding** | New AI sessions (or human collaborators) can understand the system in <5 minutes |
| **Reference** | Quick lookup for which orchestrator to use for which task |
| **Troubleshooting** | Common issues and fixes documented |
| **Accountability** | Clear success metrics and escalation paths |
| **Maintainability** | Guidelines for updating skill files over time |
