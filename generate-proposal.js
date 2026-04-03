const PptxGenJS = require("pptxgenjs");

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE"; // 16:9

// ─── カラーパレット ───────────────────────────────────────
const C = {
  navy:    "1E3A8A",
  blue:    "3B82F6",
  amber:   "FBBF24",
  amberBg: "FEF3C7",
  text:    "1F2937",
  gray:    "F9FAFB",
  mid:     "6B7280",
  white:   "FFFFFF",
  orange:  "F97316",
};

// ─── ヘルパー：セクションタイトルバー ─────────────────────
function addSectionBar(slide, title) {
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: "100%", h: 0.7,
    fill: { color: C.navy },
  });
  slide.addText(title, {
    x: 0.3, y: 0.05, w: 9, h: 0.6,
    fontSize: 18, bold: true, color: C.white,
  });
}

// ─── ヘルパー：戦略メモ付箋 ───────────────────────────────
function addStrategyNote(slide, text, y) {
  slide.addShape(pptx.ShapeType.rect, {
    x: 8.8, y: y, w: 4.2, h: 1.2,
    fill: { color: C.amberBg },
    line: { color: C.amber, width: 2 },
  });
  slide.addText("💡 戦略メモ", {
    x: 8.85, y: y + 0.05, w: 4.1, h: 0.3,
    fontSize: 9, bold: true, color: "92400E",
  });
  slide.addText(text, {
    x: 8.85, y: y + 0.35, w: 4.1, h: 0.85,
    fontSize: 9, color: "78350F", wrap: true,
  });
}

// ═══════════════════════════════════════════════════════════
// スライド 1：表紙
// ═══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.addShape(pptx.ShapeType.rect, { x:0, y:0, w:"100%", h:"100%", fill:{color:C.navy} });
  // アクセント線
  s.addShape(pptx.ShapeType.rect, { x:0, y:3.5, w:0.15, h:2.5, fill:{color:C.amber} });

  s.addText("LP制作 企画提案書", {
    x:0.5, y:1.2, w:12, h:1.2,
    fontSize:40, bold:true, color:C.white,
  });
  s.addText("Remo Eats | デリバリー一括導入サービス", {
    x:0.5, y:2.5, w:12, h:0.7,
    fontSize:22, color: C.amber,
  });
  s.addText("株式会社Ayumu 様", {
    x:0.5, y:3.6, w:8, h:0.6,
    fontSize:18, color:C.white,
  });
  s.addShape(pptx.ShapeType.rect, { x:0.5, y:4.3, w:5, h:0.04, fill:{color:C.blue} });
  s.addText("提案日：2026年4月3日", {
    x:0.5, y:4.5, w:6, h:0.4,
    fontSize:13, color:"93C5FD",
  });
}

// ═══════════════════════════════════════════════════════════
// スライド 2：目次
// ═══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.addShape(pptx.ShapeType.rect, { x:0, y:0, w:"100%", h:"100%", fill:{color:C.gray} });
  addSectionBar(s, "目次");

  const chapters = [
    ["01", "市場環境", "フードデリバリー市場の規模・成長率・トレンド"],
    ["02", "競合LP分析", "主要5社のFV訴求・価格・差別化ポイント比較"],
    ["03", "差別化戦略", "競合の「穴」と Remo Eats のポジショニング"],
    ["04", "LP設計", "ペルソナ・構成案・キャッチコピー・CTA設計"],
    ["05", "スケジュール・お見積もり", "納期プラン（松竹梅）と料金目安"],
  ];

  chapters.forEach(([num, title, desc], i) => {
    const y = 0.9 + i * 1.1;
    s.addShape(pptx.ShapeType.rect, { x:0.4, y, w:0.9, h:0.8, fill:{color:C.navy}, radius:4 });
    s.addText(num, { x:0.4, y, w:0.9, h:0.8, fontSize:22, bold:true, color:C.white, align:"center", valign:"middle" });
    s.addText(title, { x:1.5, y: y+0.0, w:4, h:0.45, fontSize:16, bold:true, color:C.text });
    s.addText(desc,  { x:1.5, y: y+0.42, w:11, h:0.38, fontSize:11, color:C.mid });
  });
}

// ═══════════════════════════════════════════════════════════
// スライド 3：市場環境
// ═══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.addShape(pptx.ShapeType.rect, { x:0, y:0, w:"100%", h:"100%", fill:{color:C.gray} });
  addSectionBar(s, "01 ｜ 市場環境");

  // 市場規模カード
  const cards = [
    { val:"8,240億円", sub:"2025年 国内デリバリー市場規模", note:"前年比 +2.0%" },
    { val:"約6%",      sub:"年平均成長率（〜2033年予測）",   note:"生活インフラとして定着" },
    { val:"80万店舗",  sub:"全国飲食店数",                   note:"デリバリー導入率はまだ低い" },
  ];
  cards.forEach((c, i) => {
    const x = 0.4 + i * 4.2;
    s.addShape(pptx.ShapeType.rect, { x, y:0.9, w:3.9, h:2, fill:{color:C.white}, shadow:{type:"outer",blur:4,offset:2,angle:45,color:"00000020"} });
    s.addText(c.val,  { x, y:1.0, w:3.9, h:0.8, fontSize:28, bold:true, color:C.navy, align:"center" });
    s.addText(c.sub,  { x, y:1.75, w:3.9, h:0.5, fontSize:10, color:C.mid, align:"center", wrap:true });
    s.addShape(pptx.ShapeType.rect, { x: x+0.5, y:2.2, w:2.9, h:0.04, fill:{color:C.blue} });
    s.addText(c.note, { x, y:2.3, w:3.9, h:0.4, fontSize:10, color:C.blue, align:"center", italic:true });
  });

  // トレンド
  s.addText("業界トレンド", { x:0.4, y:3.1, w:6, h:0.45, fontSize:15, bold:true, color:C.text });
  const trends = [
    "📈  プラットフォーム乱立期 → 飲食店の「複数登録」が標準化しつつある",
    "⏱️  個人経営店は設定・管理の工数不足が最大障壁（導入率の伸び悩み原因）",
    "💰  各社が手数料競争へ移行 → 差別化は「導入しやすさ」にシフト",
  ];
  trends.forEach((t, i) => {
    s.addText(t, { x:0.4, y:3.6 + i*0.65, w:13, h:0.55, fontSize:12, color:C.text,
      bullet:false, paraSpaceAfter:4 });
  });

  addStrategyNote(s, "全国80万店舗のうちデリバリー未導入店が大多数。「導入ハードル」を下げる訴求がブルーオーシャン。", 0.85);
}

// ═══════════════════════════════════════════════════════════
// スライド 4：競合LP分析
// ═══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.addShape(pptx.ShapeType.rect, { x:0, y:0, w:"100%", h:"100%", fill:{color:C.gray} });
  addSectionBar(s, "02 ｜ 競合LP分析");

  // 表ヘッダー
  const headers = ["サービス名","FV訴求","ターゲット","価格","差別化","CTA"];
  const colW = [2.0, 2.8, 1.9, 1.8, 3.0, 1.8];
  const rows = [
    ["Camel（キャメル）","「複数デリバリーを1台で管理」シェア訴求","中小〜大手チェーン","要問い合わせ","9,000店・継続率99%・全APIと連携","問い合わせ"],
    ["GATE","「外食特化で一気通貫」エコシステム訴求","中小〜中規模チェーン","要問い合わせ","予約台帳＋デリバリー管理を1アプリに","無料デモ"],
    ["スタートデリバリー","「デリバリー参入を丸ごと支援」課題解決型","デリバリー未参入店","最小限投資（詳細非公開）","商品開発〜配送まで一気通貫","問い合わせ"],
    ["Ordee","「注文を1台にまとめる」シンプル訴求","中小飲食店〜チェーン","要問い合わせ","POS連携・外部システム連携に強み","無料トライアル"],
    ["各プラットフォーム個別（Uber Eats等）","「出店して売上UP」ブランド訴求","全飲食店","売上の30〜35%手数料","ブランド力・配達員ネットワーク","出店申し込み"],
  ];

  let xCur = 0.3;
  headers.forEach((h, i) => {
    s.addShape(pptx.ShapeType.rect, { x:xCur, y:0.85, w:colW[i], h:0.45, fill:{color:C.navy} });
    s.addText(h, { x:xCur, y:0.85, w:colW[i], h:0.45, fontSize:9, bold:true, color:C.white, align:"center", valign:"middle" });
    xCur += colW[i];
  });

  rows.forEach((row, ri) => {
    xCur = 0.3;
    const fillColor = ri % 2 === 0 ? C.white : "EFF6FF";
    row.forEach((cell, ci) => {
      s.addShape(pptx.ShapeType.rect, { x:xCur, y:1.3 + ri*0.95, w:colW[ci], h:0.95, fill:{color:fillColor}, line:{color:"D1D5DB",width:1} });
      s.addText(cell, { x:xCur+0.05, y:1.3 + ri*0.95, w:colW[ci]-0.1, h:0.95, fontSize:8, color:C.text, valign:"middle", wrap:true });
      xCur += colW[ci];
    });
  });

  addStrategyNote(s, "競合5社すべてが「管理ツール」か「個別プラットフォーム」。\n導入代行パッケージは空白地帯。", 0.85);
}

// ═══════════════════════════════════════════════════════════
// スライド 5：差別化戦略
// ═══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.addShape(pptx.ShapeType.rect, { x:0, y:0, w:"100%", h:"100%", fill:{color:C.gray} });
  addSectionBar(s, "03 ｜ 差別化戦略");

  s.addText("競合の「穴」── 攻めどころ4点", { x:0.4, y:0.85, w:8, h:0.45, fontSize:15, bold:true, color:C.text });

  const holes = [
    ["❶ 導入代行が存在しない", "競合はすべて「管理ツール」。初期設定・アカウント開設・メニュー登録まで丸ごとやるサービスが市場にない。"],
    ["❷ 個人経営店への感情訴求ゼロ", "競合LPはチェーン店目線の機能説明ばかり。個人オーナーの「不安・忙しさ・わからない」に寄り添うコピーがない。"],
    ["❸ CTAが「問い合わせ」だけで重い", "軽い入口（無料診断・資料DL）を設けているプレイヤーがほぼゼロ。ハードルの低いCTAが差別化になる。"],
    ["❹ 料金が不透明で比較困難", "競合ほぼ全社が「要問い合わせ」。透明な料金提示が信頼獲得につながる。"],
  ];
  holes.forEach(([title, body], i) => {
    const y = 1.4 + i * 1.05;
    s.addShape(pptx.ShapeType.rect, { x:0.4, y, w:7.8, h:0.95, fill:{color:C.white}, line:{color:"E5E7EB",width:1} });
    s.addText(title, { x:0.6, y: y+0.05, w:7.5, h:0.35, fontSize:12, bold:true, color:C.navy });
    s.addText(body,  { x:0.6, y: y+0.42, w:7.5, h:0.45, fontSize:10, color:C.mid, wrap:true });
  });

  // 戦略ポジション
  s.addShape(pptx.ShapeType.rect, { x:8.7, y:1.3, w:4.4, h:4.6, fill:{color:C.amberBg}, line:{color:C.amber,width:2} });
  s.addText("Remo Eats の戦略ポジション", { x:8.8, y:1.35, w:4.2, h:0.4, fontSize:11, bold:true, color:"92400E" });
  const pos = [
    "✅ 「導入代行」という\n  空白ポジションを独占",
    "✅ 個人経営オーナーに\n  特化した感情訴求LP",
    "✅ 無料診断CTAで\n  軽い入口を設計",
  ];
  pos.forEach((p, i) => {
    s.addText(p, { x:8.85, y:1.85+i*1.3, w:4.1, h:1.1, fontSize:11, color:"78350F", wrap:true });
  });
}

// ═══════════════════════════════════════════════════════════
// スライド 6：ペルソナ設計
// ═══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.addShape(pptx.ShapeType.rect, { x:0, y:0, w:"100%", h:"100%", fill:{color:C.gray} });
  addSectionBar(s, "04 ｜ ペルソナ設計");

  const personas = [
    {
      label:"ペルソナ A",
      name:"ラーメン店オーナー（40代男性）",
      scale:"個人経営・スタッフ3名",
      pain:"デリバリーに興味あるが「何から始めればいいかわからない」。設定が複雑そうで手が出ない",
      hook:"\"全部まかせる\"安心感とスピード",
      copy:"「登録から設定まで、全部まかせて。」",
      color: C.navy,
    },
    {
      label:"ペルソナ B",
      name:"カフェ経営者（30代女性）",
      scale:"1人経営",
      pain:"Uber Eatsは登録済。出前館・menuも使いたいが1つ設定するだけで精一杯",
      hook:"複数プラットフォームへの一括対応・時間節約",
      copy:"「Uber Eatsだけじゃもったいない。まとめて出店、まとめて売上UP。」",
      color: C.blue,
    },
    {
      label:"ペルソナ C",
      name:"居酒屋オーナー（50代男性）",
      scale:"個人経営・スタッフ5名",
      pain:"複数サービスをバラバラに管理して煩雑。もっと効率化して売上最大化したい",
      hook:"効率化・売上最大化",
      copy:"「バラバラのデリバリー、まとめて収益に変える。」",
      color: C.orange,
    },
  ];

  personas.forEach((p, i) => {
    const x = 0.3 + i * 4.4;
    s.addShape(pptx.ShapeType.rect, { x, y:0.85, w:4.1, h:5.6, fill:{color:C.white}, line:{color:"E5E7EB",width:1} });
    s.addShape(pptx.ShapeType.rect, { x, y:0.85, w:4.1, h:0.5, fill:{color:p.color} });
    s.addText(p.label, { x, y:0.85, w:4.1, h:0.5, fontSize:13, bold:true, color:C.white, align:"center", valign:"middle" });

    const rows2 = [
      ["👤 対象", p.name + "\n" + p.scale],
      ["😓 最大の課題", p.pain],
      ["🎯 刺さる訴求軸", p.hook],
      ["💬 コピー方向性", p.copy],
    ];
    let yy = 1.4;
    rows2.forEach(([label, val]) => {
      s.addText(label, { x:x+0.1, y:yy, w:3.9, h:0.3, fontSize:9, bold:true, color:p.color });
      s.addText(val,   { x:x+0.1, y:yy+0.28, w:3.9, h:0.85, fontSize:9, color:C.text, wrap:true });
      yy += 1.15;
    });
  });
}

// ═══════════════════════════════════════════════════════════
// スライド 7：LP構成案（戦略意図付き）
// ═══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.addShape(pptx.ShapeType.rect, { x:0, y:0, w:"100%", h:"100%", fill:{color:C.gray} });
  addSectionBar(s, "04 ｜ LP構成案（全9セクション）");

  const sections = [
    ["01", "ファーストビュー（FV）",    "オーナーの感情に寄り添う課題起点。診断テストCTAが競合との差別化。"],
    ["02", "課題提起",                  "ペルソナ3者全員に刺さる「3つの悩み」を言語化。"],
    ["03", "解決策・サービス概要",      "一括導入パッケージという唯一解を提示。競合にないポジション。"],
    ["04", "パッケージ内容",            "導入代行の工程を可視化し「本当にやってくれる」を証明。"],
    ["05", "競合比較表",                "個別導入vs Remo Eatsを定量比較。時間コスト・費用の差を数字で。"],
    ["06", "導入事例",                  "個人経営オーナーのリアルな声。感情訴求が競合LPに存在しない。"],
    ["07", "料金",                      "業界初の透明価格提示。「要問い合わせ」で離脱する層を獲得。"],
    ["08", "FAQ",                       "実際の相談現場の疑問を選定。心理障壁を先手で除去。"],
    ["09", "クロージングCTA",           "重い相談＋軽い診断の2段構えで取りこぼしゼロ。"],
  ];

  sections.forEach(([num, title, note], i) => {
    const y = 0.85 + i * 0.62;
    s.addShape(pptx.ShapeType.rect, { x:0.3, y, w:0.7, h:0.52, fill:{color:C.navy}, radius:3 });
    s.addText(num, { x:0.3, y, w:0.7, h:0.52, fontSize:11, bold:true, color:C.white, align:"center", valign:"middle" });
    s.addShape(pptx.ShapeType.rect, { x:1.1, y, w:3.5, h:0.52, fill:{color:C.white}, line:{color:"E5E7EB",width:1} });
    s.addText(title, { x:1.15, y, w:3.4, h:0.52, fontSize:11, bold:true, color:C.text, valign:"middle" });
    s.addShape(pptx.ShapeType.rect, { x:4.7, y, w:8.4, h:0.52, fill:{color:C.amberBg}, line:{color:C.amber,width:1} });
    s.addText(note, { x:4.8, y, w:8.3, h:0.52, fontSize:9, color:"78350F", valign:"middle", wrap:true });
  });
}

// ═══════════════════════════════════════════════════════════
// スライド 8：FVデザインイメージ
// ═══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.addShape(pptx.ShapeType.rect, { x:0, y:0, w:"100%", h:"100%", fill:{color:C.gray} });
  addSectionBar(s, "04 ｜ FVデザインイメージ（ワイヤーフレーム）");

  // FVモックアップ枠
  s.addShape(pptx.ShapeType.rect, { x:0.3, y:0.85, w:13.5, h:5.4, fill:{color:C.white}, line:{color:"D1D5DB",width:2} });

  // ナビバー
  s.addShape(pptx.ShapeType.rect, { x:0.3, y:0.85, w:13.5, h:0.5, fill:{color:C.navy} });
  s.addText("Remo Eats", { x:0.5, y:0.88, w:3, h:0.44, fontSize:12, bold:true, color:C.white });
  s.addText("サービス概要 ｜ 料金 ｜ 事例 ｜ お問い合わせ", { x:7.5, y:0.88, w:6, h:0.44, fontSize:9, color:C.white, align:"right" });

  // 左カラム（コピー）
  s.addText("メインキャッチコピー（採用案）", { x:0.5, y:1.55, w:7.5, h:0.3, fontSize:9, color:C.blue, bold:true });
  s.addText("デリバリー、全部まかせて。\n売上だけ見てればいい。", {
    x:0.5, y:1.85, w:7.5, h:1.5,
    fontSize:28, bold:true, color:C.text, lineSpacingMultiple:1.2,
  });
  s.addText("複数のデリバリーサービスへの出店登録・初期設定・メニュー登録まで\nRemo Eatsが丸ごと代行。最短2週間で売上チャンネルを5つに増やします。", {
    x:0.5, y:3.4, w:7.5, h:0.9,
    fontSize:11, color:C.mid, wrap:true, lineSpacingMultiple:1.4,
  });

  // CTAボタン
  s.addShape(pptx.ShapeType.rect, { x:0.5, y:4.4, w:2.8, h:0.6, fill:{color:C.navy}, radius:4 });
  s.addText("無料で導入相談する", { x:0.5, y:4.4, w:2.8, h:0.6, fontSize:11, bold:true, color:C.white, align:"center", valign:"middle" });
  s.addShape(pptx.ShapeType.rect, { x:3.5, y:4.4, w:2.8, h:0.6, fill:{color:C.white}, line:{color:C.navy,width:2}, radius:4 });
  s.addText("無料診断を試す →", { x:3.5, y:4.4, w:2.8, h:0.6, fontSize:11, color:C.navy, align:"center", valign:"middle" });

  // 右カラム（ダッシュボードUI）
  s.addShape(pptx.ShapeType.rect, { x:8.3, y:1.3, w:5.2, h:4.3, fill:{color:C.gray}, line:{color:"E5E7EB",width:1}, radius:8 });
  s.addText("📱 ダッシュボードUIイメージ", { x:8.3, y:2.9, w:5.2, h:0.5, fontSize:11, color:C.mid, align:"center" });
  s.addText("（Figmaワイヤーフレームで詳細化）", { x:8.3, y:3.4, w:5.2, h:0.4, fontSize:9, color:"CCCCCC", align:"center", italic:true });

  // Figma URL記載エリア
  s.addText("🔗 Figmaワイヤーフレーム：（Phase4で生成・URLを記載予定）", {
    x:0.3, y:6.3, w:12, h:0.35, fontSize:9, color:C.blue, italic:true,
  });

  addStrategyNote(s, "採用コピー：感情訴求型\n代替B（数字）：「最短2週間で5サービスに同時出店」\n代替C（直球）：「複数デリバリー、一括導入。手間ゼロで売上チャンネルを増やす」", 0.85);
}

// ═══════════════════════════════════════════════════════════
// スライド 9：スケジュール・お見積もり
// ═══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.addShape(pptx.ShapeType.rect, { x:0, y:0, w:"100%", h:"100%", fill:{color:C.gray} });
  addSectionBar(s, "05 ｜ スケジュール・お見積もり");

  // タイムライン
  s.addText("制作スケジュール（目安）", { x:0.4, y:0.85, w:6, h:0.4, fontSize:14, bold:true, color:C.text });
  const weeks = [
    ["Week 1", "ヒアリング・競合調査・戦略設計"],
    ["Week 2", "ワイヤーフレーム・コピーライティング"],
    ["Week 3", "デザイン・コーディング"],
    ["Week 4", "テスト・修正・納品"],
  ];
  weeks.forEach(([w, desc], i) => {
    const x = 0.4 + i * 3.3;
    s.addShape(pptx.ShapeType.rect, { x, y:1.35, w:3.0, h:0.45, fill:{color:C.navy}, radius:4 });
    s.addText(w, { x, y:1.35, w:3.0, h:0.45, fontSize:12, bold:true, color:C.white, align:"center", valign:"middle" });
    s.addShape(pptx.ShapeType.rect, { x, y:1.82, w:3.0, h:0.85, fill:{color:C.white}, line:{color:"E5E7EB",width:1} });
    s.addText(desc, { x:x+0.1, y:1.82, w:2.8, h:0.85, fontSize:10, color:C.text, valign:"middle", wrap:true });
    if (i < 3) {
      s.addText("→", { x:x+3.0, y:1.55, w:0.3, h:0.4, fontSize:14, color:C.mid, align:"center" });
    }
  });

  // 料金表（松竹梅）
  s.addText("お見積もりプラン（松竹梅）", { x:0.4, y:2.95, w:8, h:0.4, fontSize:14, bold:true, color:C.text });

  const plans = [
    { name:"梅 ☁️", sub:"AIハイスピード型", items:["LP1枚（AI生成ベース）","最短2週間","戦略設計込み"], price:"¥XXX,XXX", color:"6B7280" },
    { name:"竹 🌿", sub:"ハイブリッド型", items:["LP1枚","3〜4週間","デザイナー仕上げ込み"], price:"¥XXX,XXX", color:C.blue, highlight:true },
    { name:"松 🌲", sub:"プロ品質型", items:["LP＋下層2ページ","4〜6週間","A/Bテスト設計込み"], price:"¥XXX,XXX", color:C.navy },
  ];

  plans.forEach((p, i) => {
    const x = 0.4 + i * 4.4;
    const bgColor = p.highlight ? "EFF6FF" : C.white;
    s.addShape(pptx.ShapeType.rect, { x, y:3.45, w:4.1, h:3.1, fill:{color:bgColor}, line:{color: p.highlight ? C.blue : "E5E7EB", width: p.highlight ? 3 : 1}, radius:6 });
    if (p.highlight) {
      s.addShape(pptx.ShapeType.rect, { x:x+0.8, y:3.25, w:2.5, h:0.35, fill:{color:C.blue}, radius:4 });
      s.addText("おすすめ", { x:x+0.8, y:3.25, w:2.5, h:0.35, fontSize:10, bold:true, color:C.white, align:"center", valign:"middle" });
    }
    s.addText(p.name, { x, y:3.55, w:4.1, h:0.45, fontSize:18, bold:true, color:p.color, align:"center" });
    s.addText(p.sub,  { x, y:3.98, w:4.1, h:0.35, fontSize:11, color:C.mid, align:"center" });
    p.items.forEach((item, j) => {
      s.addText("✓ " + item, { x:x+0.3, y:4.45+j*0.5, w:3.7, h:0.45, fontSize:11, color:C.text });
    });
    s.addShape(pptx.ShapeType.rect, { x:x+0.3, y:5.9, w:3.5, h:0.04, fill:{color:"E5E7EB"} });
    s.addText(p.price, { x, y:6.0, w:4.1, h:0.45, fontSize:18, bold:true, color:p.color, align:"center" });
  });

  s.addText("※ 料金はすべて仮置きです。詳細はヒアリング後にご提案いたします。", {
    x:0.4, y:6.55, w:13, h:0.3, fontSize:9, color:C.mid, italic:true,
  });
}

// ═══════════════════════════════════════════════════════════
// スライド 10：クロージング
// ═══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.addShape(pptx.ShapeType.rect, { x:0, y:0, w:"100%", h:"100%", fill:{color:C.navy} });
  s.addShape(pptx.ShapeType.rect, { x:0, y:0, w:"100%", h:0.1, fill:{color:C.amber} });
  s.addShape(pptx.ShapeType.rect, { x:0, y:6.9, w:"100%", h:0.1, fill:{color:C.amber} });

  s.addText("まずは無料相談から", {
    x:1, y:1.5, w:11, h:1.2,
    fontSize:38, bold:true, color:C.white, align:"center",
  });
  s.addText("デリバリー導入でお悩みの飲食店オーナー様、お気軽にご相談ください。\n戦略設計から実装まで、Remo Eatsが丸ごとサポートします。", {
    x:1.5, y:2.8, w:10, h:1.1,
    fontSize:14, color:"93C5FD", align:"center", wrap:true, lineSpacingMultiple:1.5,
  });

  // CTAボタン（白）
  s.addShape(pptx.ShapeType.rect, { x:4, y:4.1, w:5.1, h:0.75, fill:{color:C.white}, radius:6 });
  s.addText("無料で導入相談する →", { x:4, y:4.1, w:5.1, h:0.75, fontSize:16, bold:true, color:C.navy, align:"center", valign:"middle" });

  // 連絡先
  s.addText("📧  contact@ayumu.co.jp  ｜  🌐  www.remo-eats.jp  ｜  📞  03-XXXX-XXXX", {
    x:1, y:5.3, w:11, h:0.5,
    fontSize:12, color:"CBD5E1", align:"center",
  });
  s.addText("株式会社Ayumu  ／  Remo Eats LP提案チーム", {
    x:1, y:5.9, w:11, h:0.4,
    fontSize:11, color:"64748B", align:"center",
  });
}

// ─── 出力 ────────────────────────────────────────────────
const filename = "提案書_株式会社Ayumu_20260403.pptx";
pptx.writeFile({ fileName: filename })
  .then(() => console.log(`✅ 生成完了: ${filename}`))
  .catch(err => console.error("❌ エラー:", err));
