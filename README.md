# BOAT PREDICTOR - ボートレース予測アプリ

ボートレース（競艇）の出走データをAIで分析し、着順予測・買い目を提供するWebアプリケーション。

---

## 技術スタック

### フロントエンド
- HTML / Tailwind CSS / Vanilla JS
- テーマ: ダーク/ライトモード対応

### バックエンド（構築予定）
- **Python + FastAPI** - REST API サーバー
- **MySQL + SQLAlchemy** - データベース / ORM
- **Alembic** - DBマイグレーション
- **JWT** - 認証（メール+パスワード）
- **HTTPX** - BoatraceOpenAPI との通信

### レースデータ
- **[BoatraceOpenAPI](https://github.com/BoatraceOpenAPI)** - 出走表・結果・直前情報（無料・認証不要）
  - 出走表: `https://boatraceopenapi.github.io/programs/v2/{YYYY}/{YYYYMMDD}.json`
  - 結果: `https://boatraceopenapi.github.io/results/v2/{YYYY}/{YYYYMMDD}.json`
  - 直前情報: `https://boatraceopenapi.github.io/previews/v2/{YYYY}/{YYYYMMDD}.json`

---

## ディレクトリ構成

```
bort-race-prediction/
├── index.html
├── user/
│   ├── login.html
│   ├── register.html
│   ├── predict.html
│   └── weekly.html
├── admin/
│   ├── login.html
│   └── dashboard.html
├── shared/
│   ├── common.js
│   ├── header.js
│   ├── dummy-data.js        # 開発用ダミーデータ（バックエンド完成後に廃止）
│   ├── premium.css
│   └── tailwind-config.js
└── backend/                 # バックエンド（構築予定）
    ├── app/
    │   ├── main.py
    │   ├── config.py
    │   ├── database.py
    │   ├── dependencies.py
    │   ├── models/
    │   │   ├── user.py
    │   │   ├── race.py
    │   │   ├── prediction.py
    │   │   └── logic.py
    │   ├── schemas/
    │   │   ├── auth.py
    │   │   ├── user.py
    │   │   ├── race.py
    │   │   ├── prediction.py
    │   │   └── logic.py
    │   ├── routers/
    │   │   ├── auth.py
    │   │   ├── races.py
    │   │   ├── predictions.py
    │   │   ├── weekly.py
    │   │   └── admin/
    │   │       ├── users.py
    │   │       └── logics.py
    │   └── services/
    │       ├── auth.py
    │       ├── boatrace_api.py
    │       └── prediction_engine.py
    ├── migrations/
    ├── requirements.txt
    ├── .env.example
    └── alembic.ini
```

---

## DBスキーマ

### `users`
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INT PK | |
| name | VARCHAR(100) | |
| email | VARCHAR(255) UNIQUE | |
| password_hash | VARCHAR(255) | bcrypt |
| role | ENUM('user', 'admin') | |
| status | ENUM('有効', '停止', '保留') | |
| payment | ENUM('決済済', '未決済') | |
| method | ENUM('email', 'LINE', 'SNS') | |
| created_at | DATETIME | |

### `logics`
| カラム | 型 | 説明 |
|--------|-----|------|
| id | VARCHAR(10) PK | 'A', 'B', 'C', ... |
| name | VARCHAR(100) | |
| description | TEXT | |
| accuracy | FLOAT | |
| status | ENUM('有効', 'テスト中', '無効') | |
| logic_type | ENUM('builtin', 'external') | |
| api_endpoint | VARCHAR(500) | 外部API URL（任意） |
| api_key_encrypted | VARCHAR(500) | 暗号化保存 |
| parameters_json | JSON | 重みパラメータ |

### `race_programs_cache`
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INT PK | |
| race_date | DATE | |
| stadium_number | INT | 1〜24 |
| race_number | INT | 1〜12 |
| data_json | JSON | BoatraceOpenAPIレスポンス |
| fetched_at | DATETIME | キャッシュ日時（30分TTL） |

### `predictions`
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INT PK | |
| logic_id | VARCHAR(10) FK | |
| race_date | DATE | |
| stadium_number | INT | |
| race_number | INT | |
| confidence | INT | 0〜100 |
| predicted_top3 | JSON | [1, 3, 5] |
| bets_json | JSON | 買い目・賭け方 |
| analysis | TEXT | AI分析テキスト |
| result_top3 | JSON | 実際の着順 |
| hit | BOOLEAN | NULL=未確定 |
| created_at | DATETIME | |

---

## API エンドポイント

### 認証
| Method | Path | 説明 |
|--------|------|------|
| POST | /api/auth/login | ユーザーログイン → JWT返却 |
| POST | /api/auth/admin/login | 管理者ログイン |
| POST | /api/auth/register | ユーザー新規登録 |
| GET | /api/auth/me | 現在のユーザー情報 |

### レースデータ
| Method | Path | 説明 |
|--------|------|------|
| GET | /api/races/programs | 出走表取得（`date`, `stadium` パラメータ） |
| GET | /api/stadiums | 全24場一覧 |

### 予測
| Method | Path | 説明 |
|--------|------|------|
| GET | /api/predictions | レース予測取得（ロジック別） |
| POST | /api/predictions/generate | 予測生成 |
| GET | /api/weekly-predictions | 週間予測一覧 |
| GET | /api/weekly-stats | 週間的中統計 |

### 管理者
| Method | Path | 説明 |
|--------|------|------|
| GET | /api/admin/dashboard | ダッシュボード統計 |
| GET | /api/admin/users | ユーザー一覧（検索・フィルタ・ページング） |
| PATCH | /api/admin/users/{id}/status | ステータス変更 |
| DELETE | /api/admin/users/{id} | ユーザー削除 |
| GET | /api/admin/logics | ロジック一覧 |
| POST | /api/admin/logics | ロジック追加 |
| PATCH | /api/admin/logics/{id} | ロジック更新 |
| DELETE | /api/admin/logics/{id} | ロジック削除 |

---

## 予測エンジン

BoatraceOpenAPIから取得した出走表データ（勝率・連対率・ST・モーター成績など）を元に予測を生成する。

### ロジックA - 安定型
- **重視指標:** 全国勝率・連対率・選手クラス（A1/A2/B1/B2）
- **方針:** 実績の高い選手を素直に評価。1号艇の有利さを加点。的中率重視。

### ロジックB - 穴狙い型
- **重視指標:** モーター連対率・クラス差・スタートタイミング
- **方針:** 好モーターを引いた下位クラス選手の逆転を狙う。配当妙味重視。

### ロジックC - 展示重視型
- **重視指標:** 直前情報APIの展示タイム・展示航走
- **方針:** 当日の気配変化を最優先。レース直前の状態を反映した予測。

> 管理画面から各ロジックの重みパラメータ（勝率重み・モーター重み・ST重みなど）を調整可能。

---

## 開発環境のセットアップ（予定）

```bash
# バックエンド
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 環境変数の設定
cp .env.example .env
# .env を編集（DB接続情報、JWT秘密鍵）

# DBマイグレーション
alembic upgrade head

# サーバー起動
uvicorn app.main:app --reload
# → http://localhost:8000/docs でSwagger UI確認

# フロントエンド（静的ファイル）
# Live Server 等でルートを配信
```

---

## 主な機能

- **ユーザー認証** - メール+パスワード / JWT
- **管理者管理** - ユーザー一覧・ステータス管理・決済管理
- **出走表表示** - BoatraceOpenAPIからリアルタイム取得（30分キャッシュ）
- **AI予測** - 3つのロジック（安定型/穴型/展示型）で着順・買い目を提示
- **週間成績** - 予測の的中履歴・的中率の追跡
- **ロジック管理** - 管理画面から予測パラメータの動的調整

---

## スタジアム一覧（24場）

| No | 名称 | No | 名称 | No | 名称 |
|----|------|----|----|----|----|
| 1 | 桐生 | 9 | 津 | 17 | 宮島 |
| 2 | 戸田 | 10 | 三国 | 18 | 徳山 |
| 3 | 江戸川 | 11 | びわこ | 19 | 下関 |
| 4 | 平和島 | 12 | 住之江 | 20 | 若松 |
| 5 | 多摩川 | 13 | 尼崎 | 21 | 芦屋 |
| 6 | 浜名湖 | 14 | 鳴門 | 22 | 福岡 |
| 7 | 蒲郡 | 15 | 丸亀 | 23 | 唐津 |
| 8 | 常滑 | 16 | 児島 | 24 | 大村 |
