// ========================================
// 共通ヘッダー/ナビゲーション動的挿入
// ========================================

document.addEventListener('DOMContentLoaded', function () {
  const headerEl = document.getElementById('app-header');
  if (!headerEl) return;

  const path = window.location.pathname;
  const isAdmin = path.includes('/admin/');
  const isLoginPage = path.includes('login.html');
  const isIndex = path.endsWith('index.html') || path.endsWith('/');

  // ログインページとランディングページではナビなし
  if (isLoginPage || isIndex) {
    headerEl.innerHTML = getMinimalHeader(isAdmin);
    return;
  }

  headerEl.innerHTML = isAdmin ? getAdminHeader() : getUserHeader();
  initMobileMenu();
});

function getMinimalHeader(isAdmin) {
  return `
    <header class="bg-gray-900/80 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-center h-16">
          <a href="${isAdmin ? '../index.html' : '../index.html'}" class="flex items-center gap-2">
            <i class="fa-solid fa-ship text-sky-500 text-xl"></i>
            <span class="text-xl font-bold text-sky-500">BOAT</span>
            <span class="text-xl font-bold text-white">PREDICTOR</span>
            ${isAdmin ? '<span class="text-xs font-bold text-amber-400 ml-1 px-1.5 py-0.5 border border-amber-400/50 rounded">ADMIN</span>' : ''}
          </a>
        </div>
      </div>
    </header>`;
}

function getUserHeader() {
  return `
    <header class="bg-gray-900/80 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <a href="../index.html" class="flex items-center gap-2">
            <i class="fa-solid fa-ship text-sky-500 text-xl"></i>
            <span class="text-xl font-bold text-sky-500">BOAT</span>
            <span class="text-xl font-bold text-white">PREDICTOR</span>
          </a>
          <nav class="hidden md:flex items-center space-x-6">
            <a href="predict.html" class="text-slate-300 hover:text-white transition flex items-center gap-2">
              <i class="fa-solid fa-chart-line"></i>予測
            </a>
            <a href="weekly.html" class="text-slate-300 hover:text-white transition flex items-center gap-2">
              <i class="fa-solid fa-calendar-week"></i>今週の一覧
            </a>
            <a href="login.html" class="text-slate-400 hover:text-red-400 transition flex items-center gap-2">
              <i class="fa-solid fa-right-from-bracket"></i>ログアウト
            </a>
          </nav>
          <button id="mobile-menu-btn" class="md:hidden text-slate-300 hover:text-white p-2">
            <i class="fa-solid fa-bars text-xl"></i>
          </button>
        </div>
        <nav id="mobile-menu" class="hidden md:hidden pb-4 space-y-2">
          <a href="predict.html" class="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition">
            <i class="fa-solid fa-chart-line mr-2"></i>予測
          </a>
          <a href="weekly.html" class="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition">
            <i class="fa-solid fa-calendar-week mr-2"></i>今週の一覧
          </a>
          <a href="login.html" class="block px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-red-400 transition">
            <i class="fa-solid fa-right-from-bracket mr-2"></i>ログアウト
          </a>
        </nav>
      </div>
    </header>`;
}

function getAdminHeader() {
  return `
    <header class="bg-gray-900/80 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <a href="../index.html" class="flex items-center gap-2">
            <i class="fa-solid fa-ship text-sky-500 text-xl"></i>
            <span class="text-xl font-bold text-sky-500">BOAT</span>
            <span class="text-xl font-bold text-white">PREDICTOR</span>
            <span class="text-xs font-bold text-amber-400 ml-1 px-1.5 py-0.5 border border-amber-400/50 rounded">ADMIN</span>
          </a>
          <nav class="hidden md:flex items-center space-x-6">
            <a href="dashboard.html" class="text-slate-300 hover:text-white transition flex items-center gap-2">
              <i class="fa-solid fa-gauge-high"></i>ダッシュボード
            </a>
            <div class="flex items-center gap-2 text-slate-400">
              <i class="fa-solid fa-user-shield"></i>
              <span class="text-sm">管理者</span>
            </div>
            <a href="login.html" class="text-slate-400 hover:text-red-400 transition flex items-center gap-2">
              <i class="fa-solid fa-right-from-bracket"></i>ログアウト
            </a>
          </nav>
          <button id="mobile-menu-btn" class="md:hidden text-slate-300 hover:text-white p-2">
            <i class="fa-solid fa-bars text-xl"></i>
          </button>
        </div>
        <nav id="mobile-menu" class="hidden md:hidden pb-4 space-y-2">
          <a href="dashboard.html" class="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition">
            <i class="fa-solid fa-gauge-high mr-2"></i>ダッシュボード
          </a>
          <a href="login.html" class="block px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-red-400 transition">
            <i class="fa-solid fa-right-from-bracket mr-2"></i>ログアウト
          </a>
        </nav>
      </div>
    </header>`;
}

function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', function () {
    menu.classList.toggle('hidden');
    const icon = btn.querySelector('i');
    if (menu.classList.contains('hidden')) {
      icon.className = 'fa-solid fa-bars text-xl';
    } else {
      icon.className = 'fa-solid fa-xmark text-xl';
    }
  });
}
