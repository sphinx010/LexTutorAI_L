# ORDER: URGENT - Fix Desktop Regression Issues

## 1. Agent Activation
**FOUNDATION:** Load and inherit `.agent/skill/CORE_PROTOCOL.md`
**ORCHESTRATORS:** 
- Load `.agent/skill/SKILL_DESIGN AND CONTENT.md`
- Load `.agent/skill/SKILL_TECHNICAL EXECUTION.md`

**SPECIALIST MODES:**
- UI / Visual → Read `.agent/skill/DESIGN_N_CONTENT/UI_Designer.md`
- Frontend / UI Engineering → Read `.agent/skill/TECHNICAL_EXECUTION/Frontend_Developer.md`
- QA / Testing → Read `.agent/skill/QUALITY_N_OPTIMIZATION/QA_Engineer.md`

## 2. Critical Issues Detected

### Issue 1: Nav Bar Missing/Cut Off (Desktop)
- **Symptom:** Nav disappears or is cut off at top of viewport
- **Likely Cause:** Z-index conflict, overflow-hidden on parent, or position fixed issue
- **Fix:** Ensure nav has `z-50`, `sticky top-0` or `fixed w-full`, and parent containers don't have `overflow-hidden`

### Issue 2: Nav Demarcation Line
- **Symptom:** Line not spanning full width or misaligned
- **Likely Cause:** Container max-width affecting the line
- **Fix:** Line should be outside the content container, or use `w-screen` with `left-1/2 -translate-x-1/2`

### Issue 3: Hero Text Cut Off (Desktop)
- **Symptom:** "Master Legal" headline is partially hidden
- **Likely Cause:** Hero section positioned too high, or container has insufficient padding-top
- **Fix:** Add `pt-32` or `pt-40` to hero section on desktop

### Issue 4: Section Overflow/Malformation
- **Symptom:** Elements breaking out of containers on desktop
- **Likely Cause:** Max-width conflicts, flex/grid misconfiguration
- **Fix:** Audit all section containers for `overflow-hidden`, `max-w-7xl`, and proper padding

### Issue 5: Dotted Arrow Gradient Missing (Structure Section)
- **Symptom:** Arrow buttons show as plain icons, no gradient
- **Likely Cause:** Gradient classes only applied to mobile variant, or CSS specificity issue
- **Fix:** Ensure `DottedArrow.tsx` component has gradient styling for ALL viewports, not just mobile

## 3. Requirements

### QA Mode (Priority 1):
1. Test on desktop viewports: 1920px, 1440px, 1280px, 1024px
2. Test on mobile viewports: 375px, 393px, 414px
3. Document ALL regressions with screenshots
4. Check console for errors

### UI Mode (Priority 2):
1. Restore nav visibility and alignment
2. Restore nav line full-width span
3. Restore hero text visibility (no cutoff)
4. Restore dotted arrow gradient on desktop

### Frontend Mode (Priority 3):
1. Fix z-index stacking (nav should be highest)
2. Fix container overflow issues
3. Fix DottedArrow component gradient application
4. Ensure all sections have consistent padding (`py-20` or `py-24` on desktop)

## 4. Constraints (CORE_PROTOCOL)
- ✅ Mobile layout MUST remain intact (375px - 414px)
- ✅ Nav smart contrast logic MUST work
- ✅ Hero mobile absolute positioning MUST be preserved
- ✅ ID card mobile vertical layout MUST be preserved
- ✅ All animations (line ignition, etc.) MUST work

## 5. Deliverable
1. List of all files modified
2. Before/after screenshots (desktop + mobile)
3. Confirmation that all 5 issues are resolved
4. Lighthouse score check (should be 90+)

## 6. Success Criteria
- ✅ Nav visible and aligned on all desktop viewports
- ✅ Nav line spans full width
- ✅ Hero text fully visible (no cutoff)
- ✅ No overflow or malformation on any section
- ✅ Dotted arrow gradient visible on desktop AND mobile
- ✅ Mobile layout 100% intact