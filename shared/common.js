// ========================================
// 共通ユーティリティ
// ========================================

// 艇番カラー定義
const BOAT_COLORS = {
  1: { bg: 'bg-white', text: 'text-gray-900', border: 'border border-gold/20' },
  2: { bg: 'bg-black', text: 'text-white', border: '' },
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
  return `<span class="inline-flex items-center justify-center ${sizeClass} rounded-full ${color.bg} ${color.text} ${color.border} font-bold shadow-elevation-1">${number}</span>`;
}

// 予想着順を矢印付きで表示
function renderPredictionOrder(boats, size = 'md') {
  return boats.map(n => getBoatBadge(n, size)).join('<span class="mx-1.5 text-warm-gray/50 text-xs"><i class="fa-solid fa-chevron-right"></i></span>');
}

// 級別表示のクラス
function getClassStyle(classNumber) {
  switch (classNumber) {
    case 1: return 'text-gold-warm font-bold';
    case 2: return 'text-gold-warm font-semibold';
    case 3: return 'text-warm-text';
    case 4: return 'text-warm-gray';
    default: return 'text-warm-gray';
  }
}

// ステータスバッジ生成
function getStatusBadge(status) {
  const styles = {
    '有効': 'bg-status-success-bg text-status-success',
    '停止': 'bg-status-error-bg text-status-error',
    '保留': 'bg-status-warning-bg text-gold-dark',
    'テスト中': 'bg-status-purple-bg text-status-purple',
    '決済済': 'bg-status-success-bg text-status-success',
    '未決済': 'bg-status-info-bg text-warm-gray'
  };
  const style = styles[status] || 'bg-status-info-bg text-warm-gray';
  return `<span class="badge-premium ${style}">${status}</span>`;
}

// 信頼度バー生成
function getConfidenceBar(percent) {
  const color = percent >= 75 ? 'bg-status-success' : percent >= 50 ? 'bg-gold' : 'bg-gold-dark';
  return `
    <div class="flex items-center gap-3">
      <div class="flex-1 bg-dark-surface rounded-full h-1.5 overflow-hidden">
        <div class="${color} h-1.5 rounded-full transition-all duration-800 ease-premium" style="width: ${percent}%"></div>
      </div>
      <span class="text-xs font-mono font-semibold text-charcoal tracking-tight">${percent}%</span>
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
