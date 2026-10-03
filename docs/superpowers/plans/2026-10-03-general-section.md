# general セクション Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** 種別横断の受け皿として `general`（ナビ: 一般）を既存三柱と同型で先頭に追加する。

**Architecture:** Jekyll collections に `general` を足し、`_data/navigation.yml` とトップの features-grid、一覧ページを既存 `visual` と同型で複製する。記事本文は今回作らない。

**Tech Stack:** Jekyll, Liquid, YAML

**Spec:** `docs/superpowers/specs/2026-10-03-general-section-design.md`

---

### Task 1: コレクションとナビ

**Files:**
- Modify: `_config.yml`
- Modify: `_data/navigation.yml`
- Create: `_general/.gitkeep`

- [x] **Step 1:** `_config.yml` の `collections` に `general` を他と同じ permalink で追加する
- [x] **Step 2:** `_data/navigation.yml` の先頭に `key: general` / `label: 一般` / `url: /general/` を追加する
- [x] **Step 3:** `_general/.gitkeep` を作成する

### Task 2: 一覧ページとトップカード

**Files:**
- Create: `general/index.html`
- Modify: `index.html`

- [x] **Step 1:** `visual/index.html` を基に `general/index.html` を作り、`title: 一般アクセシビリティ記事一覧`、`site.general` ループにする
- [x] **Step 2:** `index.html` の features-grid 先頭に General Accessibility カードを追加する（説明: かかわり方と、種別をまたぐ話 / アイコン: 🧭）

### Task 3: ビルド検証

- [x] **Step 1:** `bundle exec jekyll build` を実行する
- [x] **Step 2:** 生成物に `/general/` があり、ナビ順が一般→視覚→聴覚→身体であることを確認する
