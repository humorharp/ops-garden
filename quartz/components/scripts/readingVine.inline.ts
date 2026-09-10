// Decorative reading motion; native article links remain the interaction surface.
type Point = { x: number; y: number };
type Hinge = { rotation: number; velocity: number; radius?: number };

let dispose = () => {};
const ns = "http://www.w3.org/2000/svg";
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const ease = (n: number) => n * n * (3 - 2 * n);
function element<K extends keyof SVGElementTagNameMap>(
  name: K,
  attrs: Record<string, string | number>,
  parent?: Element,
) {
  const el = document.createElementNS(ns, name);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, String(v)));
  parent?.append(el);
  return el;
}
function leaf(parent: Element, tip = false) {
  const g = element("g", { class: tip ? "vine-tip" : "vine-sprout" }, parent);
  element(
    "path",
    { class: "vine-leaf", d: "M0 0 C-11 -10 -9 -28 1 -38 C11 -25 12 -10 0 0Z" },
    g,
  );
  element(
    "path",
    {
      class: "vine-vein",
      d: "M0 -2 Q-2 -18 0 -33 M0 -13 L7 -21 M-1 -21 L-7 -26",
    },
    g,
  );
  return g;
}
function init() {
  dispose();
  const articleNode = document.querySelector<HTMLElement>(
    "article.garden-essay",
  );
  const titleNode = document.querySelector<HTMLElement>(".article-title");
  const dockNode = document.querySelector<HTMLElement>(".read-next-arrow");
  if (!articleNode || !titleNode || !dockNode) return;
  const article = articleNode,
    title = titleNode,
    dock = dockNode;
  const controller = new AbortController(),
    options = { signal: controller.signal, passive: true };
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const fine = matchMedia("(hover:hover) and (pointer:fine)");
  const svg = element(
    "svg",
    { "aria-hidden": "true", class: "reading-vine", focusable: "false" },
    document.body,
  );
  const path = element("path", { class: "vine-stem" }, svg);
  const sprouts = Array.from(article.querySelectorAll("h2")).map((heading) => {
    let hash = 0;
    for (const c of heading.textContent ?? "")
      hash = (Math.imul(hash, 31) + c.charCodeAt(0)) >>> 0;
    return {
      el: leaf(svg),
      heading,
      distance: 0,
      rotation: 0,
      velocity: 0,
      size: 0.65 + (hash % 101) / 250,
      base: -28 - ((hash >>> 8) % 43),
      point: undefined as Point | undefined,
      offset: ((hash >>> 16) % 29) - 14,
      slender: 0.72 + ((hash >>> 4) % 29) / 100,
    };
  });
  const tip = { el: leaf(svg, true), rotation: 0, velocity: 0 };
  const plant = element("g", { class: "vine-plant" }, svg);
  element(
    "path",
    {
      class: "vine-stem",
      d: "M0 0 C-12 -22 -22 -61 -4 -108 M-9 -23 C-34 -31 -55 -47 -66 -69 M-15 -47 C8 -52 26 -69 36 -91 M-12 -70 Q-34 -78 -42 -100 M-15 -41 Q-43 -44 -52 -37 M-6 -17 Q14 -25 26 -42 M-6 -93 Q10 -99 14 -115",
    },
    plant,
  );
  const roots = [
    [-4, -108, 8, 0.55],
    [-66, -69, -42, 0.48],
    [36, -91, 32, 0.51],
    [-42, -100, -27, 0.4],
    [-52, -37, -75, 0.42],
    [26, -42, 48, 0.44],
    [14, -115, 22, 0.38],
    [-26, -35, -52, 0.36],
    [-10, -66, 55, 0.32],
  ].map(([x, y, base, size]) => ({
    el: leaf(plant),
    x,
    y,
    base,
    size,
    rotation: 0,
    velocity: 0,
  }));
  const crown = [
    [-58, 62, 0.53],
    [42, 49, 0.46],
  ].map(([base, radius, size]) => ({
    el: leaf(svg),
    base,
    radius,
    size,
    rotation: 0,
    velocity: 0,
  }));
  const bud = element("g", { class: "vine-bud" }, svg);
  element("path", { class: "vine-stem", d: "M0 0 Q10 -12 6 -24" }, bud);
  element(
    "path",
    {
      fill: "#a7bf9b",
      stroke: "#79b5b3",
      "stroke-width": 1,
      d: "M6 -22 C-3 -27 0 -35 5 -38 C12 -34 15 -26 6 -22Z",
    },
    bud,
  );
  let bloom = 0,
    plantScale = 1,
    plantX = 0,
    plantY = 0;
  let frame = 0,
    last = 0,
    amount = 0,
    target = 0,
    length = 0,
    startY = 0,
    endY = 0,
    small = false;
  let mouse: Point | null = null;
  function measure() {
    const a = article.getBoundingClientRect(),
      t = title.getBoundingClientRect(),
      b = dock.getBoundingClientRect();
    // Exclude the previous overlay height when the document becomes shorter.
    svg.setAttribute("height", "0");
    const w = document.documentElement.clientWidth,
      h = document.documentElement.scrollHeight;
    small = w <= 700;
    svg.setAttribute("width", String(w));
    svg.setAttribute("height", String(h));
    startY = t.top + scrollY + t.height * 0.55;
    endY = b.top + scrollY + b.height * 0.65;
    const x = Math.min(w - (small ? 25 : 48), a.right + (small ? 14 : 48));
    const finishX = b.left + b.width * 0.5;
    // Measure the actual title glyph lines, not its full-width block.
    let textRight = t.left;
    const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const range = document.createRange();
      range.selectNodeContents(walker.currentNode);
      for (const box of range.getClientRects())
        textRight = Math.max(textRight, box.right);
    }
    const room = x - textRight - 22;
    plantScale = small
      ? 0.7
      : Math.min(1.55, Math.max(0.8, room / 150), Math.max(1, t.height / 110));
    const beside = !small && room > 110;
    // A reserved band above the mobile title gives the sprig room to grow.
    plantX = small ? x - 25 : beside ? textRight + 22 + room * 0.53 : x;
    plantY = small
      ? t.top + scrollY + 105
      : beside
        ? t.bottom + scrollY - 18
        : startY;
    startY = plantY;
    // Stable per essay, regenerated only for layout changes. No noise simulation per frame.
    let seed = 2166136261;
    for (const c of location.pathname)
      seed = Math.imul(seed ^ c.charCodeAt(0), 16777619);
    const random = () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
      return (seed >>> 0) / 4294967296;
    };
    const low = Math.max(a.right + 7, x - (small ? 7 : 27)),
      high = Math.min(w - 20, x + (small ? 9 : 19));
    const within = (n: number) => Math.max(low, Math.min(high, n));
    let px = x,
      py = small ? plantY + 75 : beside ? t.bottom + scrollY + 115 : startY,
      slope = 0,
      d = `M${plantX} ${plantY}`;
    if (beside || small)
      d += ` C${plantX + (py - plantY) * 0.32} ${plantY + (py - plantY) * 0.59} ${x - 6} ${py - 57} ${x} ${py}`;
    if (beside || small) slope = 6 / 57;
    let nextCurl = startY + 240 + random() * 400;
    while (py < endY - 230) {
      const step = 180 + random() * 310;
      const ny = Math.min(endY - 180, py + step);
      const nx = within(x + (random() - 0.45) * (small ? 16 : 47));
      const nextSlope =
        ny >= nextCurl && ny < endY - 350 ? 0 : (random() - 0.5) * 0.14;
      const reach = (ny - py) * (0.28 + random() * 0.12);
      d += ` C${within(px + slope * reach)} ${py + reach} ${within(nx - nextSlope * reach)} ${ny - reach} ${nx} ${ny}`;
      px = nx;
      py = ny;
      slope = nextSlope;
      if (py >= nextCurl && py < endY - 350) {
        const leftRoom = px - low,
          rightRoom = high - px;
        const side = leftRoom > rightRoom ? -1 : 1;
        const room = Math.max(leftRoom, rightRoom);
        const rx = Math.min(
          (small ? 6 : 13) + random() * (small ? 3 : 9),
          room / 2,
        );
        const ry = rx * (1.12 + random() * 0.5),
          k = 0.55228475;
        const cx = px + side * rx;
        // An offset exit carries the curl forward, rather than closing a ring on the stem.
        d += ` C${px} ${py + k * ry} ${cx - side * k * rx} ${py + ry} ${cx} ${py + ry}`;
        d += ` C${cx + side * k * rx} ${py + ry} ${px + side * 2 * rx} ${py + k * ry} ${px + side * 2 * rx} ${py}`;
        d += ` C${px + side * 2 * rx} ${py - k * ry} ${cx + side * k * rx} ${py - ry} ${cx} ${py - ry}`;
        d += ` C${cx - side * k * rx} ${py - ry} ${px + side * 3} ${py - k * ry} ${px + side * 3} ${py + ry * 0.65}`;
        px += side * 3;
        py += ry * 0.65;
        slope = 0;
        nextCurl = py + 650 + random() * 1000;
      }
    }
    d += ` C${within(px + slope * 55)} ${py + (endY - py) * 0.4} ${finishX + 45} ${endY - 45} ${finishX} ${endY}`;
    path.setAttribute("d", d);
    length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    const samples: { at: number; p: Point }[] = [];
    for (let at = 0; at <= length; at += Math.max(3, length / 300))
      samples.push({ at, p: path.getPointAtLength(at) });
    sprouts.forEach((s) => {
      const box = s.heading.getBoundingClientRect();
      const headingY = box.top + scrollY + box.height * 0.5 + 12 + s.offset;
      let best = Infinity;
      samples.forEach(({ at, p }) => {
        const score = Math.abs(p.y - headingY) + Math.abs(p.x - x) * 0.08;
        if (score < best) {
          best = score;
          s.distance = at;
          s.point = p;
        }
      });
    });
    updateTarget();
    paint(16);
    wake();
  }
  function updateTarget() {
    target = motion.matches
      ? 1
      : clamp(
          (scrollY + innerHeight * 0.68 - startY) / Math.max(1, endY - startY),
        );
  }
  function hinge(s: Hinge, point: Point, dt: number) {
    let angle = 0;
    if (mouse && fine.matches && !motion.matches) {
      const dx = mouse.x - point.x,
        dy = mouse.y + scrollY - point.y;
      angle =
        (dx >= 0 ? -1 : 1) *
        27 *
        Math.pow(1 - clamp(Math.hypot(dx, dy) / (s.radius || 115)), 2);
    }
    if (motion.matches) {
      s.rotation = 0;
      s.velocity = 0;
      return false;
    }
    const step = Math.min(dt, 32) / 16;
    s.velocity += (angle - s.rotation) * 0.07 * step;
    s.velocity *= Math.pow(0.78, step);
    s.rotation += s.velocity * step;
    if (Math.abs(s.velocity) + Math.abs(angle - s.rotation) < 0.03) {
      s.rotation = angle;
      s.velocity = 0;
      return false;
    }
    return true;
  }
  function paint(dt: number) {
    let moving = false;
    const reach = length * amount;
    path.style.strokeDashoffset = String(length - reach);
    sprouts.forEach((s) => {
      if (!s.point) return;
      const growth = ease(clamp((reach - s.distance) / 60));
      const base = s.base;
      moving = hinge(s, s.point, dt) || moving;
      s.el.setAttribute(
        "transform",
        `translate(${s.point.x} ${s.point.y}) rotate(${base + s.rotation}) scale(${growth * (small ? 0.52 : 0.82) * s.size * s.slender} ${growth * (small ? 0.52 : 0.82) * s.size})`,
      );
      s.el.style.opacity = String(growth * 0.85);
    });
    const p = path.getPointAtLength(reach);
    const behind = path.getPointAtLength(Math.max(0, reach - 3));
    const ahead = path.getPointAtLength(Math.min(length, reach + 3));
    const tangent =
      (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI + 90;
    const landing = ease(clamp((amount - 0.975) / 0.025));
    const angle = tangent + (325 - tangent) * landing;
    moving = hinge(tip, p, dt) || moving;
    tip.el.setAttribute(
      "transform",
      `translate(${p.x} ${p.y}) rotate(${angle + tip.rotation}) scale(${(small ? 0.48 : 0.6) * (1 + bloom * 0.18)})`,
    );
    const origin = path.getPointAtLength(0);
    plant.setAttribute(
      "transform",
      `translate(${origin.x} ${origin.y}) scale(${plantScale})`,
    );
    roots.forEach((s) => {
      moving =
        hinge(
          s,
          { x: origin.x + s.x * plantScale, y: origin.y + s.y * plantScale },
          dt,
        ) || moving;
      s.el.setAttribute(
        "transform",
        `translate(${s.x} ${s.y}) rotate(${s.base + s.rotation}) scale(${s.size})`,
      );
    });
    const end = path.getPointAtLength(length);
    crown.forEach((s, i) => {
      const anchor = { x: end.x, y: end.y + 5 };
      moving = hinge(s, anchor, dt) || moving;
      const growth = ease(clamp((bloom - i * 0.15) / 0.85));
      s.el.setAttribute(
        "transform",
        `translate(${anchor.x} ${anchor.y}) rotate(${s.base + s.rotation}) scale(${growth * (small ? 0.65 : 1) * s.size})`,
      );
      s.el.style.opacity = String(growth);
    });
    const budGrowth = ease(clamp((bloom - 0.35) / 0.65));
    bud.setAttribute(
      "transform",
      `translate(${end.x} ${end.y + 5}) scale(${budGrowth * (small ? 0.42 : 0.6)})`,
    );
    bud.style.opacity = String(budGrowth);
    return moving;
  }
  function tick(time: number) {
    frame = 0;
    if (document.hidden) return;
    const dt = last ? Math.min(64, time - last) : 16;
    last = time;
    amount += (target - amount) * (1 - Math.exp(-dt / 150));
    if (Math.abs(target - amount) < 0.00005) amount = target;
    const bloomTarget = amount > 0.999 ? 1 : 0;
    bloom += (bloomTarget - bloom) * (1 - Math.exp(-dt / 420));
    if (Math.abs(bloomTarget - bloom) < 0.001) bloom = bloomTarget;
    const moving = paint(dt) || bloom !== bloomTarget;
    if (amount !== target || moving) frame = requestAnimationFrame(tick);
    else last = 0;
  }
  function wake() {
    if (motion.matches) {
      amount = 1;
      bloom = 1;
      paint(16);
      return;
    }
    if (!frame && !document.hidden) frame = requestAnimationFrame(tick);
  }
  addEventListener(
    "scroll",
    () => {
      updateTarget();
      wake();
    },
    options,
  );
  addEventListener("resize", measure, options);
  addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType === "mouse") {
        mouse = { x: e.clientX, y: e.clientY };
        wake();
      }
    },
    options,
  );
  document.documentElement.addEventListener(
    "pointerleave",
    () => {
      mouse = null;
      wake();
    },
    options,
  );
  document.addEventListener(
    "visibilitychange",
    () => {
      if (!document.hidden) {
        updateTarget();
        wake();
      }
    },
    options,
  );
  motion.addEventListener(
    "change",
    () => {
      updateTarget();
      wake();
    },
    options,
  );
  const observer = new ResizeObserver(measure);
  observer.observe(article);
  if (dock.parentElement) observer.observe(dock.parentElement);
  document.documentElement.classList.add("vine-enabled");
  measure();
  amount = target;
  paint(16);
  document.fonts.ready.then(() => {
    if (!controller.signal.aborted) measure();
  });
  dispose = () => {
    controller.abort();
    observer.disconnect();
    cancelAnimationFrame(frame);
    svg.remove();
    document.documentElement.classList.remove("vine-enabled");
  };
  window.addCleanup(dispose);
}
document.addEventListener("nav", init);
