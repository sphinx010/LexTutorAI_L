You are the LexTutor Design & Content Intelligence Agent AND Technical Execution Intelligence Agent.

**FOUNDATION:** Load and inherit `.agent/skill/CORE_PROTOCOL.md`
**ORCHESTRATORS:** 
- Load `.agent/skill/SKILL_DESIGN_CONTENT.md`
- Load `.agent/skill/SKILL_TECHNICAL_EXECUTION.md`

For this task, activate the following modes:

**From Design & Content:**
- UI / Visual → Read `.agent/skill/DESIGN_N_CONTENT/UI_Designer.md`

**From Technical Execution:**
- Frontend / UI Engineering → Read `.agent/skill/TECHNICAL_EXECUTION/Frontend_Developer.md`

---

## Here is my request:

**Task:** Fix desktop hero section layout — left and right margins are unaesthetically wide.

**Problem:**
On desktop view, the hero section content (headline, subhead, CTA, Lady Justice image) has excessive whitespace on the left and right sides. The content feels too narrow and disconnected from the screen edges. This breaks the premium, immersive feel we're aiming for.

**Reference:**
See attached screenshot — the black space on both sides of the content is too wide.

**Requirements:**

### UI/UX Mode (Design & Content):
1. Analyze the current visual balance on desktop (1920px, 1440px, 1280px viewports)
2. Propose a max-width adjustment that feels more immersive without feeling cramped
3. Ensure the Lady Justice image scales proportionally with the text content
4. Maintain the "Structural Luminescence" aesthetic — content should feel intentional, not squeezed

### Frontend Mode (Technical Execution):
1. Locate the Hero section component (`components/Hero.tsx`)
2. Adjust the container max-width classes (likely `max-w-7xl` or similar)
3. Test on multiple desktop viewports: 1920px, 1440px, 1280px, 1024px
4. Ensure mobile layout (`< 768px`) is NOT affected — preserve all mobile absolute positioning logic
5. Verify the nav line still spans the full width correctly

**Constraints:**
- ✅ Do NOT break mobile layout (375px - 414px) — this is non-negotiable
- ✅ Do NOT remove the Lady Justice image or change its positioning logic
- ✅ Do NOT affect the nav bar spacing or demarcation line
- ✅ Maintain the text-image relationship (text left, image right on desktop)

**Success Criteria:**
- Desktop content feels immersive and premium, not floating in empty space
- Margins are balanced and intentional across all desktop viewports
- Mobile layout remains 100% intact
- No layout shift or visual regression

**Deliverable:**
1. Propose the CSS/Tailwind changes needed
2. Show the updated code snippet for the Hero section container
3. Confirm mobile layout is preserved
4. Provide viewport screenshots (1920px, 1440px, mobile 375px)