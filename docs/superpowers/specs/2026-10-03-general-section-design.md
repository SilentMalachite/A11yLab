# 一般セクション（general）設計

日付: 2026-10-03  
対象: A11yLab（Jekyll）  
範囲: セクション設計＋サイト実装（記事本文は含まない）

## 背景

既存の柱は障害種別ベースの3コレクションである。

- `visual`（ナビ: 視覚）
- `hearing`（ナビ: 聴覚）
- `physical`（ナビ: 身体）

種別をまたぐトピック（合理的配慮、用語など）と、役割のメンタルモデル（支援者・医療者・実装者）を置く受け皿がない。四つ目の柱として `general`（ナビ: 一般）を追加する。

## 決定事項

| 項目 | 決定 |
|------|------|
| コレクション名 | `general` |
| ナビラベル | `一般`（短い発話向け） |
| 一覧の正式名称 | `一般アクセシビリティ記事一覧`（`general/index.html` の `title:` が唯一の出どころ） |
| 並び | 先頭（一般 → 視覚 → 聴覚 → 身体） |
| 中身の範囲 | 役割記事と横断トピックの両方を同じ枠に入れる |
| 一覧の見せ方 | 既存三柱と同型のフラット一覧（役割／横断の二段分けはしない） |
| 今回の記事 | 置かない（空の `_general/`。Git用に `.gitkeep` のみ） |
| トップカード英語 | `General Accessibility`（`lang="en"`） |
| トップカード日本語 | `かかわり方と、種別をまたぐ話` |
| トップカードアイコン | `🧭`（`aria-hidden="true"`） |

## アーキテクチャ

既存パターンを踏襲する。新規のルーティングやテンプレートは作らない。

```
_config.yml          → collections.general を追加
_data/navigation.yml → 先頭に general を追加
general/index.html   → site.general を列挙
_general/            → 記事コレクションの入力ディレクトリ
index.html           → features-grid の先頭カード
```

記事レイアウトの戻りリンクは、既存どおり `page.collection` と `site.data.navigation` の `key` 一致で解決する。`general` をナビに足せば追加ロジックは不要。

## 変更ファイル

1. `_config.yml` — `general` コレクション（`output: true`、`permalink: /:collection/:name/`）
2. `_data/navigation.yml` — 先頭に `key: general` / `label: 一般` / `url: /general/`
3. `general/index.html` — 新規（`visual/index.html` と同型。`site.general` をループ）
4. `index.html` — トップカードを先頭に追加
5. `_general/.gitkeep` — 空ディレクトリをリポジトリに残す
6. `_config.yml` の `exclude` に `docs` を追加（設計・計画メモを公開サイトに出さない）

## 「一般」記事の共通項目（今後の執筆用）

種別記事と違い、機器説明ではなく前提のずれとかかわり方を軸にする。各記事は次の型に揃える。

1. よくある見方
2. 実際に起きていること
3. 見落としやすい負荷
4. 先にできること
5. 専門家／他役割に渡すタイミング
6. おわりに

## 初期の記事候補（未実装）

役割:

- 支援者のメンタルモデル
- 医療者のメンタルモデル
- 実装者のメンタルモデル

横断:

- 合理的配慮とは何か（周囲の方へ）
- 「配慮」と「特別扱い」の混同
- アクセシビリティの言葉の使い分け

## 非スコープ

- 上記候補の本文執筆
- 一覧の二段分け（`kind:` など）
- 既存三セクションのURL・文言変更
- デザインシステムの新規コンポーネント

## 受け入れ条件

- ナビ順が 一般 → 視覚 → 聴覚 → 身体
- `/general/` が空一覧として開ける（`title` と空のリスト）
- トップに General Accessibility カードが先頭で出る
- トップの features-grid が4枚でもレイアウト崩れがない
- 既存の視覚／聴覚／身体のURLと表示が変わらない
- `bundle exec jekyll build` が成功する
