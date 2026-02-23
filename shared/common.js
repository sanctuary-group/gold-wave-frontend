// ========================================
// 共通ユーティリティ
// ========================================

// 艇番カラー定義
const BOAT_COLORS = {
  1: { bg: 'bg-white', text: 'text-gray-900', border: '' },
  2: { bg: 'bg-black', text: 'text-white', border: 'border border-slate-600' },
  3: { bg: 'bg-red-500', text: 'text-white', border: '' },
  4: { bg: 'bg-blue-500', text: 'text-white', border: '' },
  5: { bg: 'bg-yellow-400', text: 'text-gray-900', border: '' },
  6: { bg: 'bg-green-500', text: 'text-white', border: '' }
};

// 艇番バッジHTML生成
function getBoatBadge(number, size = 'md') {
  const color = BOAT_COLORS[number];
  if (!color) return '';
  const sizeClass = size === 'lg' ? 'w-10 h-10 text-base' : size === 'sm' ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm';
  return `<span class="inline-flex items-center justify-center ${sizeClass} rounded-full ${color.bg} ${color.text} ${color.border} font-bold">${number}</span>`;
}

// 予想着順を矢印付きで表示
function renderPredictionOrder(boats, size = 'md') {
  return boats.map(n => getBoatBadge(n, size)).join('<span class="mx-1 text-slate-500 font-bold">&rarr;</span>');
}

// 級別表示のクラス
function getClassStyle(classNumber) {
  switch (classNumber) {
    case 1: return 'text-amber-400 font-bold';
    case 2: return 'text-sky-400 font-semibold';
    case 3: return 'text-slate-300';
    case 4: return 'text-slate-500';
    default: return 'text-slate-400';
  }
}

// ステータスバッジ生成
function getStatusBadge(status) {
  const styles = {
    '有効': 'bg-green-500/20 text-green-400',
    '停止': 'bg-red-500/20 text-red-400',
    '保留': 'bg-amber-500/20 text-amber-400',
    'テスト中': 'bg-purple-500/20 text-purple-400',
    '決済済': 'bg-green-500/20 text-green-400',
    '未決済': 'bg-slate-500/20 text-slate-400'
  };
  const style = styles[status] || 'bg-slate-500/20 text-slate-400';
  return `<span class="px-2 py-0.5 rounded-full text-xs font-medium ${style}">${status}</span>`;
}

// 信頼度バー生成
function getConfidenceBar(percent) {
  const color = percent >= 75 ? 'bg-green-500' : percent >= 50 ? 'bg-sky-500' : 'bg-amber-500';
  return `
    <div class="flex items-center gap-3">
      <div class="flex-1 bg-slate-700 rounded-full h-2">
        <div class="${color} h-2 rounded-full transition-all duration-500" style="width: ${percent}%"></div>
      </div>
      <span class="text-sm font-mono font-bold text-white">${percent}%</span>
    </div>`;
}

// 日付フォーマット
function formatDate(dateStr) {
  const d = new Date(dateStr);
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  return `${d.getMonth() + 1}/${d.getDate()} (${days[d.getDay()]})`;
}

// 今週の日付リスト取得
function getWeekDates() {
  const today = new Date('2026-02-23');
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1);
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
}
