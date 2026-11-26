// Plain-canvas charts for the Kavaria statistics site.
// No libraries: every chart is drawn with the 2D canvas API.
// All charts scale for the device pixel ratio so they stay sharp on phones.

function setup(canvas, height) {
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth || canvas.parentElement.clientWidth || 600;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.height = height + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.font = '12px system-ui, -apple-system, "Segoe UI", sans-serif';
  return { ctx, width, height };
}

function niceMax(values) {
  const max = Math.max(...values);
  if (max <= 0) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(max)));
  const norm = max / pow;
  const step = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10;
  return step * pow;
}

function axes(ctx, w, h, pad, max, unit) {
  ctx.strokeStyle = '#d7dee6';
  ctx.fillStyle = '#5b6b7a';
  ctx.lineWidth = 1;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (let i = 0; i <= 4; i++) {
    const v = (max * i) / 4;
    const y = pad.t + (h - pad.t - pad.b) * (1 - i / 4);
    ctx.beginPath();
    ctx.moveTo(pad.l, y);
    ctx.lineTo(w - pad.r, y);
    ctx.stroke();
    ctx.fillText(v >= 1000 ? (v / 1000).toFixed(v % 1000 ? 1 : 0) + 'k' : String(Math.round(v * 10) / 10), pad.l - 8, y);
  }
  if (unit) {
    ctx.textAlign = 'left';
    ctx.fillText(unit, pad.l, pad.t - 14);
  }
}

// Line chart. labels: x labels, series: [{label, values, color}].
export function lineChart(canvas, labels, series, unit = '') {
  const { ctx, width: w, height: h } = setup(canvas, 260);
  const pad = { l: 48, r: 14, t: 42, b: 26 };
  const max = niceMax(series.flatMap((s) => s.values));
  axes(ctx, w, h, pad, max, '');
  const plotW = w - pad.l - pad.r;
  const plotH = h - pad.t - pad.b;
  const step = plotW / (labels.length - 1);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#5b6b7a';
  labels.forEach((label, i) => {
    if (i % 2 === 0) ctx.fillText(String(label).slice(2), pad.l + i * step, h - pad.b + 8);
  });
  series.forEach((s) => {
    ctx.strokeStyle = s.color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    s.values.forEach((v, i) => {
      const x = pad.l + i * step;
      const y = pad.t + plotH * (1 - v / max);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.fillStyle = s.color;
    s.values.forEach((v, i) => {
      const x = pad.l + i * step;
      const y = pad.t + plotH * (1 - v / max);
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  });
  // Legend, on its own row above the plot area.
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  let lx = pad.l;
  series.forEach((s) => {
    ctx.fillStyle = s.color;
    ctx.fillRect(lx, 10, 14, 4);
    ctx.fillStyle = '#33414f';
    ctx.fillText(s.label, lx + 18, 12);
    lx += 18 + ctx.measureText(s.label).width + 22;
  });
}

// Vertical bar chart. data: [{label, value, color?}].
export function barChart(canvas, data, unit = '', color = '#1d5c8a') {
  const { ctx, width: w, height: h } = setup(canvas, 260);
  const pad = { l: 48, r: 14, t: 24, b: 26 };
  const max = niceMax(data.map((d) => d.value));
  axes(ctx, w, h, pad, max, unit);
  const plotW = w - pad.l - pad.r;
  const plotH = h - pad.t - pad.b;
  const slot = plotW / data.length;
  const barW = Math.min(46, slot * 0.62);
  data.forEach((d, i) => {
    const x = pad.l + i * slot + (slot - barW) / 2;
    const bh = plotH * (d.value / max);
    ctx.fillStyle = d.color || color;
    ctx.fillRect(x, pad.t + plotH - bh, barW, bh);
    ctx.fillStyle = '#33414f';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(String(d.value), x + barW / 2, pad.t + plotH - bh - 4);
    ctx.fillStyle = '#5b6b7a';
    ctx.textBaseline = 'top';
    ctx.fillText(d.label, x + barW / 2, h - pad.b + 8);
  });
}

// Horizontal bar chart, best for ranked categories.
export function hbarChart(canvas, data, unit = '') {
  const rowH = 34;
  const { ctx, width: w, height: h } = setup(canvas, data.length * rowH + 46);
  const pad = { l: 150, r: 52, t: 24, b: 10 };
  const max = niceMax(data.map((d) => d.value));
  ctx.strokeStyle = '#d7dee6';
  ctx.fillStyle = '#5b6b7a';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (let i = 0; i <= 4; i++) {
    const x = pad.l + ((w - pad.l - pad.r) * i) / 4;
    ctx.beginPath();
    ctx.moveTo(x, pad.t);
    ctx.lineTo(x, h - pad.b);
    ctx.stroke();
    ctx.fillText(String(Math.round((max * i) / 4)), x, pad.t - 12);
  }
  if (unit) {
    ctx.textAlign = 'left';
    ctx.fillText(unit, pad.l, pad.t - 12);
  }
  data.forEach((d, i) => {
    const y = pad.t + i * rowH + rowH / 2;
    const bw = ((w - pad.l - pad.r) * d.value) / max;
    ctx.fillStyle = d.color || '#1d5c8a';
    ctx.fillRect(pad.l, y - 10, bw, 20);
    ctx.fillStyle = '#33414f';
    ctx.textAlign = 'right';
    ctx.fillText(d.label, pad.l - 8, y);
    ctx.textAlign = 'left';
    ctx.fillText(String(d.value), pad.l + bw + 6, y);
  });
}

// Donut chart with a centre label.
export function donutChart(canvas, data, centreLabel) {
  const { ctx, width: w, height: h } = setup(canvas, 240);
  const cx = w / 2;
  const cy = h / 2 - 6;
  const r = Math.min(w, h) / 2 - 34;
  const total = data.reduce((s, d) => s + d.value, 0);
  let a = -Math.PI / 2;
  data.forEach((d) => {
    const sweep = (d.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, a, a + sweep);
    ctx.closePath();
    ctx.fillStyle = d.color;
    ctx.fill();
    a += sweep;
  });
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.58, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.fillStyle = '#33414f';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 15px system-ui, -apple-system, "Segoe UI", sans-serif';
  ctx.fillText(centreLabel, cx, cy - 8);
  ctx.font = '12px system-ui, -apple-system, "Segoe UI", sans-serif';
  ctx.fillStyle = '#5b6b7a';
  ctx.fillText('share of GDP', cx, cy + 12);
  // Legend below.
  let ly = h - 18;
  let lx = 16;
  ctx.textAlign = 'left';
  data.forEach((d) => {
    ctx.fillStyle = d.color;
    ctx.fillRect(lx, ly - 5, 10, 10);
    ctx.fillStyle = '#33414f';
    ctx.fillText(d.label + ' ' + d.value + '%', lx + 14, ly);
    lx += 14 + ctx.measureText(d.label + ' ' + d.value + '%').width + 18;
  });
}

// Draw every canvas in the page that carries a data-chart attribute.
// Each chart function is registered by name; views call drawCharts() after render.
export function drawChart(canvas) {
  const kind = canvas.dataset.chart;
  const spec = JSON.parse(canvas.dataset.spec || '{}');
  if (kind === 'line') lineChart(canvas, spec.labels, spec.series, spec.unit);
  else if (kind === 'bar') barChart(canvas, spec.data, spec.unit, spec.color);
  else if (kind === 'hbar') hbarChart(canvas, spec.data, spec.unit);
  else if (kind === 'donut') donutChart(canvas, spec.data, spec.centre);
}

export function drawAllCharts(root = document) {
  root.querySelectorAll('canvas[data-chart]').forEach(drawChart);
}
