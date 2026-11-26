// Pages of the Kavaria statistics site. Each view returns HTML; charts are
// drawn after the HTML is placed in the page (see main.js).
import {
  COUNTRY, YEARS, POPULATION, BIRTH_RATE, DEATH_RATE, AGE_GROUPS, URBAN_SHARE,
  GDP, GDP_GROWTH, GDP_PER_CAPITA, SECTORS, EXPORTS, IMPORTS, CPI, INFLATION,
  INFLATION_BY_CATEGORY, UNEMPLOYMENT, UNEMPLOYMENT_YOUTH, EMPLOYMENT_RATE,
  EMPLOYMENT_BY_SECTOR, LIFE_EXPECTANCY, INFANT_MORTALITY, HOSPITAL_BEDS_PER_1000,
  HEALTH_SPENDING_GDP, LITERACY, ENROLMENT_PRIMARY, ENROLMENT_SECONDARY,
  ENROLMENT_TERTIARY, EDUCATION_SPENDING_GDP, REGIONS, KEY_INDICATORS, RELEASES,
  CALENDAR, fmt, yearValue,
} from './data.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

function chart(kind, spec) {
  return `<canvas data-chart="${kind}" data-spec='${JSON.stringify(spec).replace(/'/g, '&#39;')}' role="img" aria-label="Chart"></canvas>`;
}

function yearOptions(selected) {
  return YEARS.map((y) => `<option value="${y}"${y === selected ? ' selected' : ''}>${y}</option>`).join('');
}

function statCard(label, value, note, href) {
  return `<a class="stat-card" href="${href}"><span class="stat-label">${label}</span><span class="stat-value">${value}</span><span class="stat-note">${note}</span></a>`;
}

function sourceNote(text) {
  return `<p class="source">Source: ${text}</p>`;
}

function releaseList() {
  return `<ul class="releases">${RELEASES.map((r) => `<li><span class="rel-date">${r.date}</span><a href="${r.href}">${esc(r.title)}</a></li>`).join('')}</ul>`;
}

export function overviewView() {
  const cards = KEY_INDICATORS.map((k) => statCard(k.label, k.value, k.change, k.href)).join('');
  return `
  <section class="hero">
    <p class="eyebrow">National Statistics Office · ${esc(COUNTRY.fullName)}</p>
    <h1>Statistics about ${esc(COUNTRY.name)},<br>for everyone.</h1>
    <p class="lede">Official figures on the people, the economy, health and education of
    ${esc(COUNTRY.name)} — published openly, with the source and year of every number.
    Updated ${esc(COUNTRY.updated)}.</p>
    <form class="search" id="site-search" action="#/data" method="get">
      <label for="q">Search the statistics</label>
      <input id="q" name="q" type="search" placeholder="Try “unemployment”, “regions” or “inflation”…" autocomplete="off">
      <button type="submit">Search</button>
    </form>
    <p class="search-hint" id="search-hint" aria-live="polite"></p>
  </section>
  <section>
    <h2>Key figures, 2025</h2>
    <div class="stat-grid">${cards}</div>
  </section>
  <section class="two-col">
    <div>
      <h2>Population is growing slowly</h2>
      <p>Resident population rose from 7.82 million in 2015 to <strong>8.42 million</strong> in 2025.
      Growth has slowed as births fell and the population aged: 15.5% are now 65 or older.</p>
      ${chart('line', { labels: YEARS, series: [{ label: 'Population (thousands)', values: POPULATION, color: '#1d5c8a' }], unit: 'thousands' })}
      ${sourceNote('KNSO, Population register, 1 January each year.')}
      <p><a class="button" href="#/population">Explore population →</a></p>
    </div>
    <div>
      <h2>The economy in one picture</h2>
      <p>GDP reached <strong>274.6 billion KVR</strong> in 2025, up 2.9% in real terms.
      Services make up almost three fifths of output.</p>
      ${chart('donut', { data: SECTORS, centre: '274.6 bn' })}
      ${sourceNote('KNSO, National accounts 2025.')}
      <p><a class="button" href="#/economy">Explore the economy →</a></p>
    </div>
  </section>
  <section class="two-col">
    <div>
      <h2>Latest releases</h2>
      ${releaseList()}
    </div>
    <div>
      <h2>Coming up</h2>
      <ul class="releases">${CALENDAR.slice(0, 4).map((c) => `<li><span class="rel-date">${c.date}</span>${esc(c.title)}</li>`).join('')}</ul>
      <p><a class="button" href="#/about">Full release calendar →</a></p>
    </div>
  </section>`;
}

export function populationView(year) {
  const y = year || 2025;
  const pop = yearValue(POPULATION, y);
  const births = yearValue(BIRTH_RATE, y);
  const deaths = yearValue(DEATH_RATE, y);
  const urban = yearValue(URBAN_SHARE, y);
  return `
  <h1>Population</h1>
  <p class="lede">How many people live in ${esc(COUNTRY.name)}, how old they are, and where they live.</p>
  <div class="controls">
    <label>Year
      <select id="year-select" data-page="population">${yearOptions(y)}</select>
    </label>
  </div>
  <div class="stat-grid">
    ${statCard('Resident population', fmt(pop) + ' thousand', 'at 1 January ' + y, '#/population')}
    ${statCard('Births per 1,000', fmt(births, 1), 'in ' + y, '#/population')}
    ${statCard('Deaths per 1,000', fmt(deaths, 1), 'in ' + y, '#/population')}
    ${statCard('Living in towns & cities', fmt(urban, 1) + '%', 'in ' + y, '#/population')}
  </div>
  <section class="two-col">
    <div>
      <h2>Population, 2015–2025</h2>
      ${chart('line', { labels: YEARS, series: [{ label: 'Population (thousands)', values: POPULATION, color: '#1d5c8a' }], unit: 'thousands' })}
      ${sourceNote('KNSO, Population register.')}
    </div>
    <div>
      <h2>Age structure, 2025</h2>
      ${chart('hbar', { data: AGE_GROUPS.map((g) => ({ label: 'Age ' + g.label, value: g.value })), unit: '% of population' })}
      ${sourceNote('KNSO, Population by age, 1 January 2025.')}
    </div>
  </section>
  <section>
    <h2>Births and deaths</h2>
    <p>Births have fallen from 11.8 per 1,000 residents in 2015 to 10.9 in 2025, while deaths
    fell from 9.4 to 8.7 — natural increase is now 2.2 per 1,000.</p>
    ${chart('line', { labels: YEARS, series: [
      { label: 'Births per 1,000', values: BIRTH_RATE, color: '#2e8b6a' },
      { label: 'Deaths per 1,000', values: DEATH_RATE, color: '#b0483a' },
    ], unit: 'per 1,000' })}
    ${sourceNote('KNSO, Vital statistics.')}
  </section>
  <section>
    <h2>Population by province, 2025</h2>
    <p>Two in five residents live in Veldmar or Nordkust. See the full regional breakdown on the
    <a href="#/regions">Regions</a> page.</p>
    <table class="data-table">
      <thead><tr><th>Province</th><th>Population (thousands)</th><th>Share</th></tr></thead>
      <tbody>${REGIONS.map((r) => `<tr><td>${r.name}</td><td>${fmt(r.pop)}</td><td>${fmt((r.pop / 8420) * 100, 1)}%</td></tr>`).join('')}</tbody>
    </table>
  </section>`;
}

export function economyView(year, tab) {
  const y = year || 2025;
  const gdp = yearValue(GDP, y);
  const growth = yearValue(GDP_GROWTH, y);
  const pc = yearValue(GDP_PER_CAPITA, y);
  const active = tab || 'gdp';
  const tabBtn = (id, label) => `<button class="tab${active === id ? ' active' : ''}" data-tab="${id}" data-page="economy" aria-selected="${active === id}">${label}</button>`;
  let panel = '';
  if (active === 'gdp') {
    panel = `
      <h2>GDP and growth, 2015–2025</h2>
      ${chart('line', { labels: YEARS, series: [
        { label: 'GDP (bn KVR)', values: GDP, color: '#1d5c8a' },
      ], unit: 'bn KVR' })}
      ${chart('bar', { data: YEARS.map((yr, i) => ({ label: String(yr).slice(2), value: GDP_GROWTH[i], color: GDP_GROWTH[i] < 0 ? '#b0483a' : '#2e8b6a' })), unit: '% real growth' })}
      ${sourceNote('KNSO, National accounts. GDP in current prices; growth in chained 2020 prices.')}`;
  } else if (active === 'sectors') {
    panel = `
      <h2>What the economy makes, 2025</h2>
      ${chart('donut', { data: SECTORS, centre: '274.6 bn' })}
      <table class="data-table">
        <thead><tr><th>Sector</th><th>Share of GDP</th><th>Share of jobs</th></tr></thead>
        <tbody>${SECTORS.map((s, i) => `<tr><td>${s.label}</td><td>${fmt(s.value, 1)}%</td><td>${fmt(EMPLOYMENT_BY_SECTOR[i].value, 1)}%</td></tr>`).join('')}</tbody>
      </table>
      ${sourceNote('KNSO, National accounts and Labour force survey 2025.')}`;
  } else {
    panel = `
      <h2>Trade with the world, 2015–2025</h2>
      ${chart('line', { labels: YEARS, series: [
        { label: 'Exports (bn KVR)', values: EXPORTS, color: '#2e8b6a' },
        { label: 'Imports (bn KVR)', values: IMPORTS, color: '#b0483a' },
      ], unit: 'bn KVR' })}
      <p>In 2025 exports were <strong>93.4 billion KVR</strong> and imports 94.8 billion —
      a trade deficit of 1.4 billion KVR, the smallest since 2019. Main exports are machinery,
      timber products and processed food.</p>
      ${sourceNote('KNSO, Foreign trade statistics.')}
      <p><a class="button" href="#/data">Download the trade tables →</a></p>`;
  }
  return `
  <h1>Economy</h1>
  <p class="lede">Output, growth, trade and the shape of the ${esc(COUNTRY.name)} economy.</p>
  <div class="controls">
    <label>Year
      <select id="year-select" data-page="economy">${yearOptions(y)}</select>
    </label>
  </div>
  <div class="stat-grid">
    ${statCard('GDP', fmt(gdp, 1) + ' bn KVR', 'in ' + y, '#/economy')}
    ${statCard('Real growth', fmt(growth, 1) + '%', 'in ' + y, '#/economy')}
    ${statCard('GDP per capita', fmt(pc) + ' KVR', 'in ' + y, '#/economy')}
    ${statCard('Exports', fmt(yearValue(EXPORTS, y), 1) + ' bn KVR', 'in ' + y, '#/economy')}
  </div>
  <div class="tabs" role="tablist">${tabBtn('gdp', 'GDP & growth')}${tabBtn('sectors', 'Sectors')}${tabBtn('trade', 'Trade')}</div>
  <section>${panel}</section>`;
}

export function healthView() {
  return `
  <h1>Health</h1>
  <p class="lede">How long people live, how healthy they are, and what the health system provides.</p>
  <div class="stat-grid">
    ${statCard('Life expectancy', '78.9 years', 'at birth, 2025', '#/health')}
    ${statCard('Infant mortality', '3.8 per 1,000', 'live births, 2025', '#/health')}
    ${statCard('Hospital beds', '4.4 per 1,000', 'residents, 2025', '#/health')}
    ${statCard('Health spending', '7.6% of GDP', '2025', '#/health')}
  </div>
  <section class="two-col">
    <div>
      <h2>Life expectancy, 2015–2025</h2>
      ${chart('line', { labels: YEARS, series: [{ label: 'Years', values: LIFE_EXPECTANCY, color: '#2e8b6a' }], unit: 'years' })}
      ${sourceNote('KNSO, Life tables. The 2020 dip reflects the pandemic years.')}
    </div>
    <div>
      <h2>Infant mortality, 2015–2025</h2>
      ${chart('line', { labels: YEARS, series: [{ label: 'Deaths per 1,000 live births', values: INFANT_MORTALITY, color: '#1d5c8a' }], unit: 'per 1,000' })}
      ${sourceNote('KNSO, Vital statistics.')}
    </div>
  </section>
  <section>
    <h2>Health spending and capacity</h2>
    <p>Health spending was 7.6% of GDP in 2025, down from a pandemic peak of 8.4% in 2020.
    There are 4.4 hospital beds per 1,000 residents and 3.9 doctors per 1,000 residents.
    The leading causes of death are heart disease (28%), cancer (24%) and stroke (9%).</p>
    ${chart('bar', { data: YEARS.map((yr, i) => ({ label: String(yr).slice(2), value: HEALTH_SPENDING_GDP[i] })), unit: '% of GDP' })}
    ${sourceNote('KNSO, Health accounts; Ministry of Health, hospital register 2025.')}
  </section>`;
}

export function educationView() {
  return `
  <h1>Education</h1>
  <p class="lede">Schooling, literacy and the share of young people in higher education.</p>
  <div class="stat-grid">
    ${statCard('Adult literacy', '99.0%', 'age 15+, 2025', '#/education')}
    ${statCard('Primary enrolment', '99.6%', 'net rate, 2025', '#/education')}
    ${statCard('Tertiary enrolment', '69.1%', 'gross rate, 2025', '#/education')}
    ${statCard('Education spending', '5.0% of GDP', '2025', '#/education')}
  </div>
  <section class="two-col">
    <div>
      <h2>Enrolment by level, 2015–2025</h2>
      ${chart('line', { labels: YEARS, series: [
        { label: 'Primary (%)', values: ENROLMENT_PRIMARY, color: '#1d5c8a' },
        { label: 'Secondary (%)', values: ENROLMENT_SECONDARY, color: '#2e8b6a' },
        { label: 'Tertiary (%)', values: ENROLMENT_TERTIARY, color: '#c98a2b' },
      ], unit: '%' })}
      ${sourceNote('KNSO, Education statistics; Ministry of Education.')}
    </div>
    <div>
      <h2>Literacy and spending</h2>
      <p>Adult literacy reached 99.0% in 2025. Public spending on education is 5.0% of GDP,
      of which 41% goes to primary schools, 36% to secondary and 23% to tertiary education.
      There are 412,000 pupils in primary school, 368,000 in secondary and 214,000 students
      in higher education.</p>
      ${chart('bar', { data: YEARS.map((yr, i) => ({ label: String(yr).slice(2), value: EDUCATION_SPENDING_GDP[i] })), unit: '% of GDP' })}
      ${sourceNote('KNSO, Education statistics 2025.')}
    </div>
  </section>`;
}

export function regionsView(sortKey, query) {
  const key = sortKey || 'pop';
  const q = (query || '').trim().toLowerCase();
  const rows = REGIONS.filter((r) => !q || r.name.toLowerCase().includes(q) || r.capital.toLowerCase().includes(q));
  const sorted = [...rows].sort((a, b) => b[key] - a[key]);
  const totalPop = REGIONS.reduce((s, r) => s + r.pop, 0);
  const sortBtn = (id, label) => `<button class="pill${key === id ? ' active' : ''}" data-sort="${id}" data-page="regions">${label}</button>`;
  return `
  <h1>Regions</h1>
  <p class="lede">Eight provinces, from the capital province of Veldmar to the eastern islands.
  Compare them by population, wealth and jobs.</p>
  <div class="controls">
    <label>Search
      <input id="region-search" type="search" placeholder="Province or capital…" value="${esc(query || '')}">
    </label>
    <span class="sort-group">Sort by: ${sortBtn('pop', 'Population')}${sortBtn('gdpPc', 'GDP per capita')}${sortBtn('unemp', 'Unemployment')}${sortBtn('urban', 'Urban share')}</span>
  </div>
  <div id="region-table-wrap">
  <table class="data-table">
    <thead><tr><th>Province</th><th>Capital</th><th>Population (000s)</th><th>Area (km²)</th><th>GDP per capita (KVR)</th><th>Unemployment</th><th>Urban</th></tr></thead>
    <tbody>${sorted.map((r) => `<tr><td><strong>${r.name}</strong></td><td>${r.capital}</td><td>${fmt(r.pop)}</td><td>${fmt(r.area)}</td><td>${fmt(r.gdpPc)}</td><td>${fmt(r.unemp, 1)}%</td><td>${fmt(r.urban, 1)}%</td></tr>`).join('') || '<tr><td colspan="7">No province matches that search.</td></tr>'}</tbody>
  </table>
  </div>
  <p>${fmt(totalPop)} thousand people live in ${esc(COUNTRY.name)} across ${fmt(COUNTRY.areaKm2)} km².
  Veldmar province alone holds ${fmt((REGIONS[0].pop / totalPop) * 100, 1)}% of the population and the
  highest GDP per capita (41,200 KVR), while Ostinseln has the lowest (23,100 KVR) and the
  highest unemployment (7.4%).</p>
  ${sourceNote('KNSO, Regional accounts 2024 and Population register 2025.')}
  <section>
    <h2>GDP per capita by province</h2>
    ${chart('hbar', { data: [...REGIONS].sort((a, b) => b.gdpPc - a.gdpPc).map((r) => ({ label: r.name, value: r.gdpPc })) , unit: 'KVR' })}
  </section>`;
}

export function labourView() {
  return `
  <h1>Labour market</h1>
  <p class="lede">Who works, who is looking for work, and where the jobs are.</p>
  <div class="stat-grid">
    ${statCard('Unemployment', '5.4%', 'of the labour force, Q3 2025', '#/labour')}
    ${statCard('Youth unemployment', '12.4%', 'age 15–24, Q3 2025', '#/labour')}
    ${statCard('Employment rate', '68.3%', 'age 15–64, Q3 2025', '#/labour')}
    ${statCard('Labour force', '4.61 m', 'people, Q3 2025', '#/labour')}
  </div>
  <section class="two-col">
    <div>
      <h2>Unemployment, 2015–2025</h2>
      ${chart('line', { labels: YEARS, series: [
        { label: 'All (%)', values: UNEMPLOYMENT, color: '#1d5c8a' },
        { label: 'Youth 15–24 (%)', values: UNEMPLOYMENT_YOUTH, color: '#c98a2b' },
      ], unit: '%' })}
      ${sourceNote('KNSO, Labour force survey. The 2020 spike reflects the pandemic.')}
    </div>
    <div>
      <h2>Employment by sector, 2025</h2>
      ${chart('hbar', { data: EMPLOYMENT_BY_SECTOR.map((s) => ({ label: s.label, value: s.value })), unit: '% of jobs' })}
      ${sourceNote('KNSO, Labour force survey, Q3 2025.')}
    </div>
  </section>
  <section>
    <h2>Employment rate</h2>
    <p>The employment rate for people aged 15–64 rose to 68.3% in 2025, its highest level
    in the series. The rate is 72.1% for men and 64.6% for women. Part-time work is 18.2%
    of all jobs, and 7.9% of workers are self-employed.</p>
    ${chart('bar', { data: YEARS.map((yr, i) => ({ label: String(yr).slice(2), value: EMPLOYMENT_RATE[i] })), unit: '%' })}
    ${sourceNote('KNSO, Labour force survey.')}
  </section>`;
}

export function pricesView(year) {
  const y = year || 2025;
  return `
  <h1>Prices</h1>
  <p class="lede">Consumer prices, inflation, and what got more expensive.</p>
  <div class="controls">
    <label>Year
      <select id="year-select" data-page="prices">${yearOptions(y)}</select>
    </label>
  </div>
  <div class="stat-grid">
    ${statCard('Inflation', fmt(yearValue(INFLATION, y), 1) + '%', 'annual average, ' + y, '#/prices')}
    ${statCard('CPI index', fmt(yearValue(CPI, y), 1), '2020 = 100, ' + y, '#/prices')}
    ${statCard('Food inflation', '3.1%', 'annual average, 2025', '#/prices')}
    ${statCard('Core inflation', '2.1%', 'excl. food & energy, 2025', '#/prices')}
  </div>
  <section class="two-col">
    <div>
      <h2>Inflation, 2015–2025</h2>
      ${chart('bar', { data: YEARS.map((yr, i) => ({ label: String(yr).slice(2), value: INFLATION[i], color: INFLATION[i] > 4 ? '#b0483a' : '#1d5c8a' })), unit: '%' })}
      ${sourceNote('KNSO, Consumer price index. The 2022 spike followed the energy shock.')}
    </div>
    <div>
      <h2>Inflation by category, 2025</h2>
      ${chart('hbar', { data: INFLATION_BY_CATEGORY.map((c) => ({ label: c.label, value: c.value })), unit: '%' })}
      ${sourceNote('KNSO, Consumer price index, October 2025.')}
    </div>
  </section>
  <section>
    <h2>What a basket costs</h2>
    <p>The average household spent 2,940 KVR a month in 2025. The biggest shares are housing
    and energy (27%), food and drink (21%) and transport (14%). A litre of milk cost 1.85 KVR,
    a loaf of bread 2.40 KVR and a monthly bus pass 68 KVR in October 2025.</p>
    <p><a class="button" href="#/data">Download the CPI tables →</a></p>
  </section>`;
}

export function dataView() {
  const tables = [
    { id: 'population', title: 'Population, births and deaths 2015–2025', rows: YEARS.map((y, i) => [y, POPULATION[i], BIRTH_RATE[i], DEATH_RATE[i], URBAN_SHARE[i]]) , header: 'Year,Population (000s),Births per 1000,Deaths per 1000,Urban share (%)' },
    { id: 'economy', title: 'GDP, growth and trade 2015–2025', rows: YEARS.map((y, i) => [y, GDP[i], GDP_GROWTH[i], GDP_PER_CAPITA[i], EXPORTS[i], IMPORTS[i]]), header: 'Year,GDP (bn KVR),Real growth (%),GDP per capita (KVR),Exports (bn KVR),Imports (bn KVR)' },
    { id: 'labour', title: 'Labour market 2015–2025', rows: YEARS.map((y, i) => [y, UNEMPLOYMENT[i], UNEMPLOYMENT_YOUTH[i], EMPLOYMENT_RATE[i]]), header: 'Year,Unemployment (%),Youth unemployment (%),Employment rate (%)' },
    { id: 'health-education', title: 'Health and education 2015–2025', rows: YEARS.map((y, i) => [y, LIFE_EXPECTANCY[i], INFANT_MORTALITY[i], LITERACY[i], ENROLMENT_TERTIARY[i]]), header: 'Year,Life expectancy (years),Infant mortality per 1000,Literacy (%),Tertiary enrolment (%)' },
    { id: 'regions', title: 'Regions 2025', rows: REGIONS.map((r) => [r.name, r.capital, r.pop, r.area, r.gdpPc, r.unemp, r.urban]), header: 'Province,Capital,Population (000s),Area (km2),GDP per capita (KVR),Unemployment (%),Urban share (%)' },
  ];
  window.__csvTables = tables;
  return `
  <h1>Data & downloads</h1>
  <p class="lede">Every figure on this site as a table you can download and reuse.
  Files are CSV, free to use with attribution to the Kavaria National Statistics Office.</p>
  ${tables.map((t) => `
    <section class="download">
      <h2>${t.title}</h2>
      <p>${t.rows.length} rows · CSV · updated ${esc(COUNTRY.updated)}</p>
      <button class="button" data-download="${t.id}">Download CSV</button>
    </section>`).join('')}
  <section>
    <h2>How to cite us</h2>
    <p>“Kavaria National Statistics Office (2025), <em>Kavaria in Figures 2025</em>, Veldmar.”
    Figures are revised when source data change; the release calendar on the
    <a href="#/about">About page</a> lists the next revision dates.</p>
  </section>`;
}

export function aboutView() {
  return `
  <h1>About the Office</h1>
  <p class="lede">The Kavaria National Statistics Office (KNSO) is the independent producer of
  official statistics for the Republic of ${esc(COUNTRY.name)}.</p>
  <section>
    <h2>What we do</h2>
    <p>We collect, compile and publish statistics on the population, the economy, health,
    education, the labour market and the regions — so that citizens, businesses, researchers
    and government can make decisions on facts, not guesses. We are independent of government
    in our methods and in what we publish, and we publish on a fixed calendar announced in advance.</p>
    <h2>Sources and methods</h2>
    <ul>
      <li>Population: the national population register, updated daily by municipalities.</li>
      <li>Economy: national accounts compiled to the Kavarian System of National Accounts, base year 2020.</li>
      <li>Prices: a monthly survey of 28,000 prices in 120 outlets across all eight provinces.</li>
      <li>Labour: a quarterly survey of 24,000 households.</li>
      <li>Health and education: administrative records from the ministries, checked against surveys.</li>
    </ul>
    <h2>Release calendar</h2>
    <table class="data-table">
      <thead><tr><th>Date</th><th>Release</th></tr></thead>
      <tbody>${CALENDAR.map((c) => `<tr><td>${c.date}</td><td>${esc(c.title)}</td></tr>`).join('')}</tbody>
    </table>
    <h2>Contact</h2>
    <p>Statistics House, 14 Market Square, Veldmar · <a href="#/about">contact form</a> ·
    Press office: +355 21 400 100 · Figures on this site were last updated ${esc(COUNTRY.updated)}.</p>
  </section>`;
}

export function notFoundView() {
  return `<h1>Page not found</h1>
  <p class="lede">That page does not exist on this site. Try one of the sections below.</p>
  <p><a class="button" href="#/">Back to the overview →</a></p>`;
}
