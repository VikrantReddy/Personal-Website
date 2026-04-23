# Remove Unused Code Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove ~1500 lines of unused code (old portfolio components, unused UI libraries, and dead utilities) to clean up the codebase and focus on the LLM chat architecture.

**Architecture:** Systematic deletion of unused files in phases: old portfolio components → unused UI libraries → unused utilities → App.tsx cleanup. Each phase is independently testable (app should still build and deploy).

**Tech Stack:** React, TypeScript, Vite, shadcn/ui

---

## File Structure

**Files to Delete:**
- Old portfolio components: `src/components/Hero.tsx`, `src/components/Projects.tsx`, `src/components/Skills.tsx`, `src/components/Contact.tsx`
- Unused UI components (40 files): `src/components/ui/accordion.tsx`, `src/components/ui/alert-dialog.tsx`, ... (all except button, card, input, textarea, tooltip)
- Unused utilities: `src/utils/portfolioData.ts`, `src/utils/queryRouter.ts`, `src/utils/__tests__/queryRouter.test.ts`
- Redundant re-export: `src/components/ui/use-toast.ts`
- Unused toaster: `src/components/ui/sonner.tsx`

**Files to Modify:**
- `src/App.tsx` - Remove Sonner and TooltipProvider imports/usage

**Files to Keep:**
- `src/components/ChatInterface/` (all files)
- `src/components/ui/button.tsx`, `card.tsx`, `input.tsx`, `textarea.tsx`, `tooltip.tsx`
- `src/hooks/useChat.ts`, `use-toast.ts`, `use-mobile.tsx`
- `src/utils/backendClient.ts`

---

## Tasks

### Task 1: Delete Old Portfolio Components

**Files:**
- Delete: `src/components/Hero.tsx`
- Delete: `src/components/Projects.tsx`
- Delete: `src/components/Skills.tsx`
- Delete: `src/components/Contact.tsx`

- [ ] **Step 1: Verify these components aren't imported anywhere**

Run: `grep -r "import.*Hero\|import.*Projects\|import.*Skills\|import.*Contact" src --include="*.tsx" --include="*.ts" | grep -v "^src/components/ui\|^src/types"`

Expected output: No matches (except type imports in RichContent, which are fine)

- [ ] **Step 2: Delete Hero.tsx**

Run: `rm src/components/Hero.tsx`

- [ ] **Step 3: Delete Projects.tsx**

Run: `rm src/components/Projects.tsx`

- [ ] **Step 4: Delete Skills.tsx**

Run: `rm src/components/Skills.tsx`

- [ ] **Step 5: Delete Contact.tsx**

Run: `rm src/components/Contact.tsx`

- [ ] **Step 6: Build to verify no errors**

Run: `npm run build`

Expected: Build succeeds without errors

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "refactor: remove unused old portfolio components (Hero, Projects, Skills, Contact)"
```

---

### Task 2: Delete Unused UI Components (Part 1: accordion through form)

**Files:**
- Delete: `src/components/ui/accordion.tsx`
- Delete: `src/components/ui/alert-dialog.tsx`
- Delete: `src/components/ui/alert.tsx`
- Delete: `src/components/ui/aspect-ratio.tsx`
- Delete: `src/components/ui/avatar.tsx`
- Delete: `src/components/ui/badge.tsx`
- Delete: `src/components/ui/breadcrumb.tsx`
- Delete: `src/components/ui/carousel.tsx`
- Delete: `src/components/ui/chart.tsx`
- Delete: `src/components/ui/checkbox.tsx`
- Delete: `src/components/ui/collapsible.tsx`
- Delete: `src/components/ui/command.tsx`
- Delete: `src/components/ui/context-menu.tsx`
- Delete: `src/components/ui/dialog.tsx`
- Delete: `src/components/ui/drawer.tsx`
- Delete: `src/components/ui/dropdown-menu.tsx`
- Delete: `src/components/ui/form.tsx`

- [ ] **Step 1: Delete accordion through form**

```bash
rm src/components/ui/accordion.tsx \
   src/components/ui/alert-dialog.tsx \
   src/components/ui/alert.tsx \
   src/components/ui/aspect-ratio.tsx \
   src/components/ui/avatar.tsx \
   src/components/ui/badge.tsx \
   src/components/ui/breadcrumb.tsx \
   src/components/ui/carousel.tsx \
   src/components/ui/chart.tsx \
   src/components/ui/checkbox.tsx \
   src/components/ui/collapsible.tsx \
   src/components/ui/command.tsx \
   src/components/ui/context-menu.tsx \
   src/components/ui/dialog.tsx \
   src/components/ui/drawer.tsx \
   src/components/ui/dropdown-menu.tsx \
   src/components/ui/form.tsx
```

- [ ] **Step 2: Build to verify no errors**

Run: `npm run build`

Expected: Build succeeds without errors

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "refactor: remove unused UI components (accordion, alert, avatar, badge, breadcrumb, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form)"
```

---

### Task 3: Delete Unused UI Components (Part 2: hover-card through switch)

**Files:**
- Delete: `src/components/ui/hover-card.tsx`
- Delete: `src/components/ui/input-otp.tsx`
- Delete: `src/components/ui/label.tsx`
- Delete: `src/components/ui/menubar.tsx`
- Delete: `src/components/ui/navigation-menu.tsx`
- Delete: `src/components/ui/pagination.tsx`
- Delete: `src/components/ui/popover.tsx`
- Delete: `src/components/ui/progress.tsx`
- Delete: `src/components/ui/radio-group.tsx`
- Delete: `src/components/ui/resizable.tsx`
- Delete: `src/components/ui/scroll-area.tsx`
- Delete: `src/components/ui/select.tsx`
- Delete: `src/components/ui/separator.tsx`
- Delete: `src/components/ui/sheet.tsx`
- Delete: `src/components/ui/sidebar.tsx`
- Delete: `src/components/ui/skeleton.tsx`
- Delete: `src/components/ui/slider.tsx`
- Delete: `src/components/ui/switch.tsx`

- [ ] **Step 1: Delete hover-card through switch**

```bash
rm src/components/ui/hover-card.tsx \
   src/components/ui/input-otp.tsx \
   src/components/ui/label.tsx \
   src/components/ui/menubar.tsx \
   src/components/ui/navigation-menu.tsx \
   src/components/ui/pagination.tsx \
   src/components/ui/popover.tsx \
   src/components/ui/progress.tsx \
   src/components/ui/radio-group.tsx \
   src/components/ui/resizable.tsx \
   src/components/ui/scroll-area.tsx \
   src/components/ui/select.tsx \
   src/components/ui/separator.tsx \
   src/components/ui/sheet.tsx \
   src/components/ui/sidebar.tsx \
   src/components/ui/skeleton.tsx \
   src/components/ui/slider.tsx \
   src/components/ui/switch.tsx
```

- [ ] **Step 2: Build to verify no errors**

Run: `npm run build`

Expected: Build succeeds without errors

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "refactor: remove unused UI components (hover-card, input-otp, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, switch)"
```

---

### Task 4: Delete Unused UI Components (Part 3: table through toggle)

**Files:**
- Delete: `src/components/ui/table.tsx`
- Delete: `src/components/ui/tabs.tsx`
- Delete: `src/components/ui/toast.tsx`
- Delete: `src/components/ui/toggle-group.tsx`
- Delete: `src/components/ui/toggle.tsx`

- [ ] **Step 1: Delete table through toggle**

```bash
rm src/components/ui/table.tsx \
   src/components/ui/tabs.tsx \
   src/components/ui/toast.tsx \
   src/components/ui/toggle-group.tsx \
   src/components/ui/toggle.tsx
```

- [ ] **Step 2: Build to verify no errors**

Run: `npm run build`

Expected: Build succeeds without errors

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "refactor: remove unused UI components (table, tabs, toast, toggle-group, toggle)"
```

---

### Task 5: Delete Unused Utility Files

**Files:**
- Delete: `src/utils/portfolioData.ts`
- Delete: `src/utils/queryRouter.ts`
- Delete: `src/utils/__tests__/queryRouter.test.ts`

- [ ] **Step 1: Verify portfolioData is not imported**

Run: `grep -r "portfolioData" src --include="*.tsx" --include="*.ts" | grep -v "^src/utils/portfolioData.ts"`

Expected: No matches

- [ ] **Step 2: Verify queryRouter is not imported in app code**

Run: `grep -r "routeQuery\|queryRouter" src --include="*.tsx" --include="*.ts" | grep -v "^src/utils/__tests__\|^src/utils/queryRouter.ts"`

Expected: No matches

- [ ] **Step 3: Delete portfolioData.ts**

Run: `rm src/utils/portfolioData.ts`

- [ ] **Step 4: Delete queryRouter.ts**

Run: `rm src/utils/queryRouter.ts`

- [ ] **Step 5: Delete queryRouter test**

Run: `rm src/utils/__tests__/queryRouter.test.ts`

- [ ] **Step 6: Build to verify no errors**

Run: `npm run build`

Expected: Build succeeds without errors

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "refactor: remove unused utilities (portfolioData, queryRouter, queryRouter tests)"
```

---

### Task 6: Delete Unused Toast and Sonner Files

**Files:**
- Delete: `src/components/ui/use-toast.ts` (redundant re-export)
- Delete: `src/components/ui/sonner.tsx` (unused toaster)

- [ ] **Step 1: Verify use-toast.ts is not imported directly**

Run: `grep -r "from.*ui/use-toast" src --include="*.tsx" --include="*.ts"`

Expected: No matches (imports should be from `hooks/use-toast` instead)

- [ ] **Step 2: Verify sonner is not used in code**

Run: `grep -r "toast(" src --include="*.tsx" --include="*.ts" | grep -v "import\|export"`

Expected: All matches should be using the custom `toast()` from `hooks/use-toast`, not sonner's toast

- [ ] **Step 3: Delete use-toast.ts**

Run: `rm src/components/ui/use-toast.ts`

- [ ] **Step 4: Delete sonner.tsx**

Run: `rm src/components/ui/sonner.tsx`

- [ ] **Step 5: Build to verify no errors**

Run: `npm run build`

Expected: Build succeeds without errors

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "refactor: remove redundant toast re-export and unused sonner toaster"
```

---

### Task 7: Clean Up App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: View current App.tsx**

Run: `cat src/App.tsx`

- [ ] **Step 2: Update App.tsx to remove Sonner and TooltipProvider**

Replace the entire file with:

```typescript
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  console.log('App mounting, PROD:', import.meta.env.PROD, 'BASE_URL:', import.meta.env.BASE_URL);
  return (
  <QueryClientProvider client={queryClient}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  </QueryClientProvider>
  );
};

export default App;
```

- [ ] **Step 3: Build to verify no errors**

Run: `npm run build`

Expected: Build succeeds without errors

- [ ] **Step 4: Verify app still runs locally**

Run: `npm run dev` (let it start, then stop with Ctrl+C after 5 seconds)

Expected: Dev server starts without errors

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx && git commit -m "refactor: remove unused Sonner toaster and TooltipProvider from App.tsx"
```

---

### Task 8: Final Verification

**Files:**
- N/A (verification only)

- [ ] **Step 1: Verify build succeeds**

Run: `npm run build`

Expected: Build completes without errors or warnings

- [ ] **Step 2: Verify no orphaned imports remain**

Run: `npm run lint 2>&1 | grep -i "unused\|import" | head -20`

Expected: No unused import warnings related to deleted files

- [ ] **Step 3: Check file count reduction**

Run: `find src -name "*.tsx" -o -name "*.ts" | wc -l`

Expected: Significant reduction from original count (approximately 40-50 fewer files)

- [ ] **Step 4: Quick code review**

Skim `src/components/` and `src/components/ui/` to visually confirm only relevant files remain

Expected: See ChatInterface folder, button.tsx, card.tsx, input.tsx, textarea.tsx, tooltip.tsx, and no portfolio components

- [ ] **Step 5: Final commit message summary**

Run: `git log --oneline -8`

Expected: 8 cleanup commits visible, showing systematic removal

---

## Summary

This plan removes ~1500 lines of unused code across:
- 4 old portfolio components (549 lines)
- 40 unused UI component files (2500+ lines total)
- 3 unused utility files
- Cleanup of App.tsx

Result: Codebase is focused on the LLM chat architecture, with zero dead code and only actively-used dependencies imported.
