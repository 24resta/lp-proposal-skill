# Figmaワイヤーフレーム生成ルール

## 目的
LP構成案をもとに、Figma上に実寸ワイヤーフレーム + 戦略メモを自動生成する。
提案書なしでも、このワイヤー単体でお客様に提案できるクオリティを目指す。

## 技術要件
- Figma MCP（use_figma）を使用
- ファイルの作成：`create_new_file` でデザインファイルを新規作成
- ワイヤーの書き込み：`use_figma` でPlugin APIを実行

## ワイヤーフレーム仕様

### レイアウト
- キャンバス幅：1440px（デスクトップ実寸）
- セクションは縦に連結（yを加算していく）
- 各セクション間に隙間なし（連続したLP体験を再現）

### カラーパレット（ワイヤーフレーム用）
```javascript
const NAVY = {r:30/255, g:39/255, b:97/255};      // FV・CTA背景
const WHITE = {r:1, g:1, b:1};                      // カード背景
const LIGHT_BG = {r:248/255, g:249/255, b:251/255}; // セクション交互背景
const TEAL = {r:0, g:168/255, b:150/255};           // CTAボタン
const GRAY = {r:229/255, g:232/255, b:238/255};     // プレースホルダー
const DARK_TEXT = {r:26/255, g:31/255, b:54/255};   // メインテキスト
const MID_GRAY = {r:136/255, g:150/255, b:167/255}; // サブテキスト
const DEEP_BLUE = {r:6/255, g:90/255, b:130/255};   // 強調
const ACCENT_ORANGE = {r:232/255, g:93/255, b:36/255}; // セクションラベル
```

### フォント
- 必ず `await figma.loadFontAsync()` で事前ロード
- 使用フォント：Inter（Regular, Semi Bold, Bold, Extra Bold）
- 日本語テキストはInterで表示可能（Figma側がフォールバック処理）

### セクションラベル
各セクションの左上に配置するオレンジのバッジ：
```javascript
function badge(label, x, y) {
  const f = figma.createFrame();
  f.resize(220, 24); f.x = x; f.y = y;
  f.fills = [{type:"SOLID", color:ACCENT_ORANGE}];
  f.cornerRadius = 4;
  const t = figma.createText();
  t.fontName = {family:"Inter", style:"Bold"};
  t.characters = label;
  t.fontSize = 11;
  t.fills = [{type:"SOLID", color:WHITE}];
  t.x = 8; t.y = 4;
  f.appendChild(t);
  return f;
}
// 使用例：badge("SEC.1 ファーストビュー", 80, 20)
```

## セクション構成（標準9セクション）

### SEC.1 ファーストビュー（高さ480px）
- 背景：NAVY全面
- 左側：キャッチコピー（46pt Extra Bold） + サブコピー + CTA2つ
- 右側：ダッシュボードプレースホルダー（破線枠）
- CTAボタン：メイン（TEAL塗り）+ サブ（WHITE枠線のみ）

### SEC.2 課題提起（高さ380px）
- 背景：LIGHT_BG
- タイトル中央揃え
- 3枚のペインカード（白背景、横並び、各380px幅）

### SEC.3 解決策・機能（高さ380px）
- 背景：WHITE
- 3枚の機能カード（薄青背景、横並び）
- 各カードにアイコン背景（DEEP_BLUE丸角四角）

### SEC.4 操作デモ（高さ440px）
- 背景：LIGHT_BG
- 大きなプレースホルダー（破線枠、GRAY背景）
- 「動画 or GIFアニメーション」テキスト

### SEC.5 競合比較表（高さ400px）
- 背景：WHITE
- テーブル：ヘッダーNAVY、交互行、自社ハイライト（薄緑）
- 列：サービス / 月額料金 / AI機能 / 導入時間 / サポート

### SEC.6 導入事例（高さ360px）
- 背景：LIGHT_BG
- Before/After カード（左：薄赤、右：薄緑、中央に矢印）
- 下部にお客様の声（引用スタイル）

### SEC.7 料金（高さ420px）
- 背景：WHITE
- 中央に大きな料金カード（DEEP_BLUE枠線）
- 価格大文字（52pt Extra Bold）+ CTA

### SEC.8 FAQ（高さ360px）
- 背景：LIGHT_BG
- 5項目のアコーディオン風カード
- 各カード：白背景、質問テキスト + 「+」マーク

### SEC.9 クロージングCTA（高さ280px）
- 背景：NAVY
- キャッチ + サブコピー + CTA2つ（FVと同じ構成）

### フッター（高さ60px）
- 背景：さらに濃いネイビー
- コピーライト + リンクテキスト

## 戦略メモ（アノテーション）

### 配置ルール
- ワイヤーフレーム右側（x=1500）に配置
- 各セクションに1つずつ（計9枚）
- 黄色い付箋スタイル（背景：FFF8E1、枠：FFE082）
- 点線でワイヤーフレームと接続

### 戦略メモの書き方
- タイトル：2〜4文字（「戦略意図」「配置の狙い」等）
- 本文：競合分析に基づく「なぜこの構成なのか」の説明
- 3〜4行以内に収める
- 具体的な競合名や数字を含む

### 実装パターン
```javascript
function annotation(page, title, body, sectionY) {
  const noteX = 1500;

  // 付箋本体
  const frame = figma.createFrame();
  frame.resize(320, 180);
  frame.x = noteX;
  frame.y = sectionY + 20;
  frame.fills = [{type:"SOLID", color:{r:1,g:248/255,b:225/255}}];
  frame.strokes = [{type:"SOLID", color:{r:1,g:224/255,b:130/255}}];
  frame.strokeWeight = 1.5;
  frame.cornerRadius = 8;

  // タイトル
  const t = figma.createText();
  t.fontName = {family:"Inter", style:"Bold"};
  t.characters = title;
  t.fontSize = 13;
  t.fills = [{type:"SOLID", color:{r:230/255,g:81/255,b:0}}];
  t.x = 16; t.y = 12;
  frame.appendChild(t);

  // 本文
  const b = figma.createText();
  b.fontName = {family:"Inter", style:"Regular"};
  b.characters = body;
  b.fontSize = 12;
  b.fills = [{type:"SOLID", color:{r:121/255,g:85/255,b:72/255}}];
  b.x = 16; b.y = 44;
  b.resize(288, 120);
  b.textAutoResize = "HEIGHT";
  b.lineHeight = {value:20, unit:"PIXELS"};
  frame.appendChild(b);

  page.appendChild(frame);

  // 接続線
  const line = figma.createLine();
  line.x = 1440;
  line.y = sectionY + 80;
  line.resize(noteX - 1440, 0);
  line.strokes = [{type:"SOLID", color:{r:1,g:224/255,b:130/255}}];
  line.strokeWeight = 1.5;
  line.dashPattern = [6, 4];
  page.appendChild(line);
}
```

## 注意事項
- `figma.loadFontAsync` は各スタイルごとに個別にawaitする
- effects（DROP_SHADOW等）はFigma Plugin APIでは使用不可の場合がある — 使わない
- テキストの `resize()` は `textAutoResize = "HEIGHT"` と組み合わせて使う
- 大量のノードを一度に作成するので、最後に `figma.viewport.scrollAndZoomIntoView()` でビューを調整する
