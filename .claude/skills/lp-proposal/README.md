# LP提案自動生成 SKILL v2 セットアップガイド

## v1との違い
- **対話モード追加**：一発生成だけでなく、壁打ちしながら段階的に作れる
- **カスタム設定**：スライド枚数（5/10/15/20枚）、情報密度、クライアント特性を指定可能
- **目次カスタム**：ユーザーが目次を自由に指定できる
- **ブラッシュアップ対応**：人力で修正したpptxをアップロードして再調整可能

## セットアップ手順

### 1. プロジェクト作成
```bash
mkdir -p ~/lp-proposal-project/.claude/skills/lp-proposal
cd ~/lp-proposal-project
```

### 2. SKILLファイルの配置
```bash
cp -r /path/to/lp-proposal-skill-v2/* .claude/skills/lp-proposal/
```

### 3. 依存パッケージ
```bash
npm install -g pptxgenjs react react-dom react-icons sharp
pip install markitdown[pptx] --break-system-packages
```

### 4. 実行

**クイックモード（一発生成）：**
```
claude
> クラウド勤怠管理SaaS、従業員10〜50名向け、クライアント：ABC株式会社
```

**カスタムモード（対話型）：**
```
claude
> LP提案を作りたい。構成から相談させて
```

**カスタム設定付き：**
```
claude
> LP提案を作って。業界：クラウド勤怠管理SaaS。スライド20枚、情報は詳細多め、クライアントはデータ好きな人
```

**ブラッシュアップ：**
```
claude
> この提案書を改善して [pptxファイルをドラッグ&ドロップ]
> 3枚目にもっとデータを入れたい
```

## ファイル構成
```
.claude/skills/lp-proposal/
├── SKILL.md              ← 指揮者（v2：対話型フロー）
├── research.md           ← Phase 1: 競合調査
├── analysis.md           ← Phase 2: 分析・戦略
├── proposal-pptx.md      ← Phase 3: pptx生成（v2：カスタム対応）
├── wireframe-figma.md    ← Phase 4: Figmaワイヤー
├── README.md             ← このファイル
└── examples/
```
