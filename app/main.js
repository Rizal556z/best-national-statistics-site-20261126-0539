// Router and page interactions for the Kavaria statistics site.
// Hash routes: #/ #/population #/economy #/health #/education #/regions
// #/labour #/prices #/data #/about. Year, tab, sort and search state live in
// the hash query (for example #/economy?year=2023&tab=trade) so every view
// has a linkable address.
import { drawAllCharts } from './charts.js';
import {
  overviewView, populationView, economyView, healthView, educationView,
  regionsView, labourView, pricesView, dataView, aboutView, notFoundView,
} from './views.js';

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('.main-nav a')];

function parseHash() {
  const raw = location.hash.replace(/^#\/?/, '');
  const [path, query = ''] = raw.split('?');
  const params = new URLSearchParams(query);
  return { path: path || '', params };
}

function route() {
  const { path, params } = parseHash();
  const year = Number(params.get('year')) || undefined;
  let html;
  let key = path;
  if (path === '') { html = overviewView(); key = ''; }
  else if (path === 'population') html = populationView(year);
  else if (path === 'economy') html = economyView(year, params.get('tab') || 'gdp');
  else if (path === 'health') html = healthView();
  else if (path === 'education') html = educationView();
  else if (path === 'regions') html = regionsView(params.get('sort') || 'pop', params.get('q') || '');
  else if (path === 'labour') html = labourView();
  else if (path === 'prices') html = pricesView(year);
  else if (path === 'data') html = dataView();
  else if (path === 'about') html = aboutView();
  else { html = notFoundView(); key = ''; }
  app.innerHTML = html;
  document.title = document.querySelector('h1') ? document.querySelector('h1').textContent + ' — Kavaria Statistics' : 'Kavaria Statistics';
  navLinks.forEach((a) => {
    const target = a.getAttribute('href').replace(/^#\/?/, '');
    a.classList.toggle('current', target === key);
    if (target === key) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  drawAllCharts(app);
  wireControls(params);
  window.scrollTo(0, 0);
}

function go(path, params) {
  const q = new URLSearchParams(params).toString();
  location.hash = '#/' + path + (q ? '?' + q : '');
}

function wireControls(params) {
  const yearSelect = document.getElementById('year-select');
  if (yearSelect) {
    yearSelect.addEventListener('change', () => {
      const page = yearSelect.dataset.page;
      const next = { year: yearSelect.value };
      if (page === 'economy') next.tab = params.get('tab') || 'gdp';
      go(page, next);
    });
  }
  document.querySelectorAll('[data-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      go(btn.dataset.page, { year: params.get('year') || '2025', tab: btn.dataset.tab });
    });
  });
  document.querySelectorAll('[data-sort]').forEach((btn) => {
    btn.addEventListener('click', () => {
      go('regions', { sort: btn.dataset.sort, q: params.get('q') || '' });
    });
  });
  const search = document.getElementById('region-search');
  if (search) {
    search.addEventListener('input', () => {
      go('regions', { sort: params.get('sort') || 'pop', q: search.value });
    });
  }
  document.querySelectorAll('[data-download]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const table = (window.__csvTables || []).find((t) => t.id === btn.dataset.download);
      if (!table) return;
      const csv = [table.header, ...table.rows.map((r) => r.join(','))].join('\n');
      const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'kavaria-' + table.id + '.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
  });
  const siteSearch = document.getElementById('site-search');
  if (siteSearch) {
    siteSearch.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = document.getElementById('q').value.trim().toLowerCase();
      const hint = document.getElementById('search-hint');
      const pages = [
        ['population', ['population', 'births', 'deaths', 'age', 'urban', 'people']],
        ['economy', ['economy', 'gdp', 'growth', 'trade', 'exports', 'imports']],
        ['labour', ['labour', 'unemployment', 'jobs', 'employment']],
        ['prices', ['prices', 'inflation', 'cpi', 'cost']],
        ['health', ['health', 'life expectancy', 'hospital', 'mortality']],
        ['education', ['education', 'school', 'literacy', 'students']],
        ['regions', ['regions', 'provinces', 'veldmar', 'nordkust']],
        ['data', ['data', 'download', 'csv', 'tables']],
      ];
      const hit = pages.find(([, words]) => words.some((w) => q.includes(w)));
      if (hit) {
        location.hash = '#/' + hit[0];
      } else if (hint) {
        hint.textContent = q ? 'No section matches “' + q + '”. Try “unemployment”, “regions” or “inflation”.' : 'Type a topic to search the site.';
      }
    });
  }
}

window.addEventListener('hashchange', route);
route();
