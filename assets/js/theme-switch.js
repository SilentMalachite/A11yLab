(() => {
  const getPreferredTheme = () => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // ボタンの見た目と支援技術に伝わる状態を、実際のテーマとずらさない。
  // aria-pressed を更新しないと、スクリーンリーダー利用者にはどちらの
  // モードで表示されているのか分からないままになる。
  const syncToggle = (theme) => {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    toggle.setAttribute('aria-pressed', String(theme === 'dark'));
    const icon = toggle.querySelector('.theme-toggle__icon');
    if (icon) {
      icon.textContent = theme === 'dark' ? '◑' : '◐';
    }
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    syncToggle(theme);
  };

  const currentTheme = getPreferredTheme();
  // この時点では body がまだ無くボタンを掴めないため、テーマの適用のみ。
  // ボタンの状態は DOMContentLoaded で合わせる。
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);

  window.addEventListener('DOMContentLoaded', () => {
    syncToggle(document.documentElement.getAttribute('data-theme'));

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
      });
    }
  });
})();
