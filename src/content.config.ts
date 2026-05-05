import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';
import { CATEGORIES } from './lib/categories';

// ───────────────────────────────────────────────
// チェックリストアイテム
// ───────────────────────────────────────────────
const ChecklistItemSchema = z.object({
  item: z.string(),                          // 持ち物・必要書類の名称
  note: z.string().optional(),              // 補足（「コピーでも可」等）
  required: z.boolean().default(true),      // 必須 or 任意
});

// ───────────────────────────────────────────────
// 5W1H
// ───────────────────────────────────────────────
const FiveW1HSchema = z.object({
  who:   z.string().optional(),
  what:  z.string().optional(),
  when:  z.string().optional(),
  where: z.string().optional(),
  why:   z.string().optional(),
  how:   z.string().optional(),
}).nullable().optional();

// ───────────────────────────────────────────────
// 申請書の書き方ガイド
// ───────────────────────────────────────────────
const FormFieldSchema = z.object({
  field_name: z.string(),          // 欄の名前（「届出人の氏名」等）
  how_to_fill: z.string(),         // 書き方の説明
  example: z.string().optional(),  // 記入例
  note: z.string().optional(),     // 注意点
});

const FormGuideSchema = z.object({
  form_name: z.string(),
  download_url: z.string().url().optional(),
  fields: z.array(FormFieldSchema).default([]),
  tips: z.array(z.string()).default([]),
}).nullable().optional();

// ───────────────────────────────────────────────
// 多言語ロケールスキーマ
// ───────────────────────────────────────────────
const LocaleSchema = z.object({
  title: z.string().min(1),
  easy_explanation: z.string().min(1),
  bottom_line: z.string().min(1),
  amount_info: z.string().nullable().optional(),
  target_audience: z.array(z.string()).default([]),
  term_explanations: z.array(z.object({
    term: z.string(),
    explanation: z.string(),
  })).default([]),
  // ── 新規追加フィールド ──
  five_w1h: FiveW1HSchema,
  checklist: z.array(ChecklistItemSchema).default([]),
  form_guide: FormGuideSchema,
  // ── Phase D: 追加フィールド ──
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).default([]),
  estimated_time: z.string().nullable().optional(),
  related_articles: z.array(z.string()).default([]),
});

// ───────────────────────────────────────────────
// マスタースキーマ
// ───────────────────────────────────────────────
export const SubsidyMasterSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  municipality: z.string(),
  category: z.enum(CATEGORIES),              // ← 11分類 enum に変更
  status: z.enum(['active', 'upcoming', 'expired']),
  original_url: z.string().url(),
  original_text: z.string().optional(),
  deadline: z.string().nullable().optional(),
  situations: z.array(z.string()).default([]),  // Phase E 追加
  locales: z.object({
    ja: LocaleSchema,
    en: LocaleSchema.optional(),
    pt: LocaleSchema.optional(),
  }),
});

const subsidies = defineCollection({
  loader: file('src/data/subsidy_master.json'),
  schema: SubsidyMasterSchema,
});

export const collections = { subsidies };
