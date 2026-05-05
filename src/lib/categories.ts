/**
 * 太田市くらしガイド — カテゴリ定数
 * 各市のテーマカラーもここで一元管理する
 */

export const CATEGORIES = [
  'life-events',
  'money',
  'health',
  'parenting',
  'business',
  'environment',
  'housing',
  'tax',
  'local-event',
  'safety',
  'foreigner',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_META: Record<Category, {
  icon: string;
  ja: string;
  en: string;
  pt: string;
  description_ja: string;
}> = {
  'life-events': {
    icon: '🏠',
    ja: '届出・証明書',
    en: 'Life Events',
    pt: 'Eventos da Vida',
    description_ja: '結婚・出産・引越し・死亡など人生の節目の手続き',
  },
  'money': {
    icon: '💰',
    ja: 'お金の支援',
    en: 'Financial Support',
    pt: 'Apoio Financeiro',
    description_ja: '補助金・給付金・手当など受け取れるお金の制度',
  },
  'health': {
    icon: '🏥',
    ja: '健康・保険・年金',
    en: 'Health & Insurance',
    pt: 'Saúde e Seguro',
    description_ja: '国民健康保険・年金・健康診断など健康に関する手続き',
  },
  'parenting': {
    icon: '👶',
    ja: '子育て・教育',
    en: 'Parenting & Education',
    pt: 'Filhos e Educação',
    description_ja: '保育園・学校・子育て支援に関する手続き',
  },
  'business': {
    icon: '🏢',
    ja: 'ビジネス・起業',
    en: 'Business & Startup',
    pt: 'Negócios e Startup',
    description_ja: '中小企業支援・創業・融資などビジネスに関する制度',
  },
  'environment': {
    icon: '🌿',
    ja: 'ごみ・環境・ペット',
    en: 'Environment & Pets',
    pt: 'Meio Ambiente e Animais',
    description_ja: 'ごみの分別・粗大ごみ・ペット登録など生活環境の手続き',
  },
  'housing': {
    icon: '🏡',
    ja: '住まい・まちづくり',
    en: 'Housing & Community',
    pt: 'Moradia e Comunidade',
    description_ja: '住宅・空き家・都市計画など住まいに関する手続き',
  },
  'tax': {
    icon: '🚗',
    ja: '税金・納付',
    en: 'Tax & Payments',
    pt: 'Impostos e Pagamentos',
    description_ja: '市県民税・固定資産税・軽自動車税などの納税案内',
  },
  'local-event': {
    icon: '🎪',
    ja: '地域イベント',
    en: 'Local Events',
    pt: 'Eventos Locais',
    description_ja: '太田市で開催されるイベント・催し情報',
  },
  'safety': {
    icon: '🛡️',
    ja: '安全・防災',
    en: 'Safety & Disaster',
    pt: 'Segurança e Desastres',
    description_ja: '避難場所・防災・交通事故・応急手当の情報',
  },
  'foreigner': {
    icon: '🌏',
    ja: '外国人の方・多文化共生',
    en: 'Foreign Residents',
    pt: 'Residentes Estrangeiros',
    description_ja: '多言語相談・在留資格・日本語教室・パートナーシップ制度',
  },
};

/**
 * 市区町村ごとのテーマカラー定義
 *
 * --city-h: Hue (色相)
 * --city-s: Saturation (彩度)
 * --city-l: Lightness (明度)
 *
 * 太田市  = ティールグリーン（マスコット「おおたん」の緑・大地・自然）
 * 前橋市  = レッド（群馬の県都・伝統）
 * 高崎市  = アンバー（だるまの街）
 * 桐生市  = パープル（絹織物の街）
 * 伊勢崎市 = ブルー（利根川・空）
 */
export const MUNICIPALITY_THEME: Record<string, {
  name_ja: string;
  name_en: string;
  h: number;   // Hue
  s: number;   // Saturation %
  l: number;   // Lightness %
  accent_h: number;  // アクセントカラーのHue
}> = {
  'ota-city': {
    name_ja: '群馬県 太田市',
    name_en: 'Ota City, Gunma',
    h: 158, s: 64, l: 38,       // ティールグリーン
    accent_h: 200,               // 水色（おおたんの水色）
  },
  'maebashi-city': {
    name_ja: '群馬県 前橋市',
    name_en: 'Maebashi City, Gunma',
    h: 350, s: 72, l: 44,
    accent_h: 25,
  },
  'takasaki-city': {
    name_ja: '群馬県 高崎市',
    name_en: 'Takasaki City, Gunma',
    h: 30, s: 85, l: 48,
    accent_h: 155,
  },
  'kiryu-city': {
    name_ja: '群馬県 桐生市',
    name_en: 'Kiryu City, Gunma',
    h: 270, s: 60, l: 48,
    accent_h: 310,
  },
  'isesaki-city': {
    name_ja: '群馬県 伊勢崎市',
    name_en: 'Isesaki City, Gunma',
    h: 210, s: 75, l: 45,
    accent_h: 180,
  },
};

/** 市スラッグからCSS変数文字列を生成するヘルパー */
export function getMunicipalityCSS(municipalitySlug: string): string {
  const theme = MUNICIPALITY_THEME[municipalitySlug];
  if (!theme) return '';
  const { h, s, l, accent_h } = theme;
  return [
    `--city-h:${h}`,
    `--city-s:${s}%`,
    `--city-l:${l}%`,
    `--city:hsl(${h},${s}%,${l}%)`,
    `--city-light:hsl(${h},55%,94%)`,
    `--city-mid:hsl(${h},45%,86%)`,
    `--city-text:hsl(${h},50%,26%)`,
    `--city-soft:hsl(${h},40%,97%)`,
    `--city-accent:hsl(${accent_h},75%,48%)`,
    `--city-accent-light:hsl(${accent_h},75%,95%)`,
  ].join(';');
}

// ─────────────────────────────────────────────────
// Phase E: 困りごとドメイン定義
// ─────────────────────────────────────────────────

export const DOMAINS = [
  'money',
  'work',
  'health',
  'family',
  'housing',
  'safety',
  'foreigner',
] as const;

export type Domain = (typeof DOMAINS)[number];

export const DOMAIN_META: Record<Domain, {
  icon: string;
  ja: string;
  en: string;
  pt: string;
}> = {
  money:     { icon: '💰', ja: 'お金の困りごと',           en: 'Money Troubles',       pt: 'Problemas de Dinheiro'    },
  work:      { icon: '💼', ja: '仕事の困りごと',           en: 'Work Troubles',        pt: 'Problemas de Trabalho'    },
  health:    { icon: '🏥', ja: '健康・医療の困りごと',     en: 'Health Troubles',      pt: 'Problemas de Saúde'       },
  family:    { icon: '👨‍👩‍👧', ja: '家族・人間関係の困りごと', en: 'Family Troubles',      pt: 'Problemas Familiares'     },
  housing:   { icon: '🏠', ja: '住まい・生活の困りごと',   en: 'Housing Troubles',     pt: 'Problemas de Moradia'     },
  safety:    { icon: '🛡️', ja: '安全・防災の困りごと',     en: 'Safety Troubles',      pt: 'Problemas de Segurança'   },
  foreigner: { icon: '🌏', ja: '外国人の方・マイノリティ', en: 'Foreign Residents',    pt: 'Residentes Estrangeiros'  },
};

export interface TroubleMaster {
  id: string;
  domain: Domain;
  label: { ja: string; en?: string; pt?: string };
  search_phrases: { ja: string[]; en?: string[]; pt?: string[] };
}
