import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceRadial,
  forceCollide,
  forceX,
  forceY,
  SimulationNodeDatum,
} from "d3";
document.addEventListener("nav", () => {
  const panel = document.querySelector<HTMLElement>(".constellation-panel");
  const svg = panel?.querySelector<SVGSVGElement>(".reading-constellation");
  if (!panel || !svg) return;
  const controller = new AbortController();
  const options = { signal: controller.signal };
  const nodes = new Map(
    Array.from(svg.querySelectorAll<SVGGElement>("[data-node]")).map((el) => [
      el.dataset.node!,
      {
        el,
        x: Number(el.dataset.x),
        y: Number(el.dataset.y),
        fx: null as number | null,
        fy: null as number | null,
        driftX: 0,
        driftY: 0,
        vx: 0,
        vy: 0,
        initialX: Number(el.dataset.x),
        initialY: Number(el.dataset.y),
      },
    ]),
  );
  const paths = Array.from(svg.querySelectorAll<SVGPathElement>("[data-from]"));

  type LabelBox = { left: number; right: number; top: number; bottom: number };
  const labels = [...nodes.values()]
    .map((node) => {
      const text = node.el.querySelector<SVGTextElement>("text")!;
      return {
        node,
        text,
        width: text.getComputedTextLength(),
        offset: [0, 34] as [number, number],
        rendered: [0, 34] as [number, number],
      };
    })
    .sort(
      (a, b) =>
        Number(b.node.el.classList.contains("idea-hub")) -
        Number(a.node.el.classList.contains("idea-hub")),
    );
  function overlap(a: LabelBox, b: LabelBox) {
    return (
      Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) *
      Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top))
    );
  }
  function placeLabels() {
    const placed: LabelBox[] = [];
    const dots = [...nodes.values()].map((n) => ({
      left: n.x + n.driftX - 18,
      right: n.x + n.driftX + 18,
      top: n.y + n.driftY - 18,
      bottom: n.y + n.driftY + 18,
    }));
    for (const label of labels) {
      const { node, width } = label;
      const x = node.x + node.driftX,
        y = node.y + node.driftY;
      const side = width / 2 + 30;
      const reading = node.el.matches(":hover, :focus-within");
      const candidates: [number, number][] = reading
        ? [label.offset]
        : [
            label.offset,
            [0, 38],
            [0, -32],
            [side, 5],
            [-side, 5],
            [side, 38],
            [-side, 38],
            [side, -32],
            [-side, -32],
            [0, 65],
            [0, -58],
          ];
      let best = label.offset,
        bestBox: LabelBox | undefined,
        bestScore = Infinity;
      for (const candidate of candidates) {
        const [dx, dy] = candidate;
        const box = {
          left: x + dx - width / 2 - 6,
          right: x + dx + width / 2 + 6,
          top: y + dy - 19,
          bottom: y + dy + 7,
        };
        const outside =
          Math.max(0, 8 - box.left) +
          Math.max(0, box.right - 892) +
          Math.max(0, 8 - box.top) +
          Math.max(0, box.bottom - 492);
        const movement = Math.hypot(dx - label.offset[0], dy - label.offset[1]);
        const score =
          outside * 1000 +
          placed.reduce((sum, b) => sum + overlap(box, b), 0) * 10 +
          dots.reduce((sum, b) => sum + overlap(box, b), 0) +
          movement * 8;
        if (score < bestScore) {
          bestScore = score;
          best = candidate;
          bestBox = box;
        }
        // Keep the previous placement whenever it still has room.
        if (score === 0) break;
      }
      label.offset = best;
      placed.push(bestBox!);
    }
  }
  // Layout chooses destinations; a separate clock moves labels continuously.
  // The speed cap prevents a large relocation from becoming a fast sweep.
  function renderLabels(elapsed: number, immediate = false) {
    for (const label of labels) {
      if (!immediate && label.node.el.matches(":hover, :focus-within"))
        continue;
      const dx = label.offset[0] - label.rendered[0];
      const dy = label.offset[1] - label.rendered[1];
      const distance = Math.hypot(dx, dy);
      const blend =
        immediate || distance < 0.05
          ? 1
          : Math.min(
              1 - Math.exp(-elapsed / 220),
              (120 * elapsed) / 1000 / distance,
            );
      label.rendered[0] += dx * blend;
      label.rendered[1] += dy * blend;
      label.text.setAttribute("text-anchor", "middle");
      label.text.setAttribute("x", String(label.rendered[0]));
      label.text.setAttribute("y", String(label.rendered[1]));
    }
  }
  document.fonts.ready.then(() => {
    if (controller.signal.aborted) return;
    for (const label of labels)
      label.width = label.text.getComputedTextLength();
    placeLabels();
    renderLabels(0, reducedMotion);
  });

  function draw() {
    for (const node of nodes.values())
      node.el.setAttribute(
        "transform",
        `translate(${node.x + node.driftX} ${node.y + node.driftY})`,
      );
    for (const path of paths) {
      const a = nodes.get(path.dataset.from!)!,
        b = nodes.get(path.dataset.to!)!;

      path.setAttribute(
        "d",
        `M ${a.x + a.driftX} ${a.y + a.driftY} L ${b.x + b.driftX} ${b.y + b.driftY}`,
      );
    }
    placeLabels();
    if (reducedMotion || driftPaused) renderLabels(0, true);
  }
  function move(node: { x: number; y: number }, x: number, y: number) {
    node.x = Math.max(25, Math.min(875, x));
    node.y = Math.max(25, Math.min(460, y));
    draw();
  }
  type Idea = (typeof nodes extends Map<string, infer N> ? N : never) &
    SimulationNodeDatum;
  const motionPreference = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  let reducedMotion = motionPreference.matches;
  const simulation = forceSimulation<Idea>([...nodes.values()])
    .force(
      "links",
      forceLink<Idea, { source: Idea; target: Idea }>(
        paths.map((path) => ({
          source: nodes.get(path.dataset.from!)!,
          target: nodes.get(path.dataset.to!)!,
        })),
      )
        .distance(140)
        .strength(0.09),
    )
    .force("charge", forceManyBody().strength(-160))
    .force("spacing", forceCollide<Idea>(50).strength(0.8))
    .force(
      "petals",
      forceRadial<Idea>(
        (n) => (n.el.classList.contains("idea-hub") ? 65 : 185),
        450,
        250,
      ).strength(0.12),
    )
    .force("x", forceX(450).strength(0.004))
    .force("y", forceY(250).strength(0.004))
    .velocityDecay(0.55)
    .alphaDecay(0.045)
    .on("tick", draw)
    .stop();
  function settle() {
    simulation.alphaTarget(0).alpha(0.5);
    if (reducedMotion) {
      simulation.stop();
      simulation.tick(90);
      draw();
    } else simulation.restart();
  }
  let driftTime = 0,
    previousTime = 0,
    animationFrame = 0;
  let driftPaused = false,
    inView = false;
  function shouldAnimate() {
    return (
      !controller.signal.aborted &&
      !reducedMotion &&
      !driftPaused &&
      inView &&
      !document.hidden
    );
  }
  function stopAnimation() {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    previousTime = 0;
  }
  function startAnimation() {
    if (!animationFrame && shouldAnimate()) {
      animationFrame = requestAnimationFrame(drift);
    }
  }
  const pauseButton = document.createElement("button");
  pauseButton.type = "button";
  pauseButton.className = "constellation-reset";
  pauseButton.textContent = "Pause drift";
  pauseButton.hidden = reducedMotion;
  panel.querySelector(".map-caption")!.append(pauseButton);
  pauseButton.addEventListener(
    "click",
    () => {
      driftPaused = !driftPaused;
      pauseButton.textContent = driftPaused ? "Resume drift" : "Pause drift";
      pauseButton.setAttribute("aria-pressed", String(driftPaused));
      if (driftPaused) {
        stopAnimation();
        renderLabels(0, true);
      } else startAnimation();
    },
    options,
  );
  const observer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    inView ? startAnimation() : stopAnimation();
  });
  observer.observe(svg);
  function absorbDrift() {
    for (const node of nodes.values()) {
      node.x += node.driftX;
      node.y += node.driftY;
      node.driftX = 0;
      node.driftY = 0;
    }
    driftTime = 0;
  }
  function drift(now: number) {
    animationFrame = 0;
    if (!shouldAnimate()) return;
    const elapsed = previousTime ? Math.min(now - previousTime, 50) : 0;
    previousTime = now;
    if (
      !svg!.querySelector(".idea-node:hover") &&
      !svg!.querySelector(":focus-visible")
    ) {
      driftTime += elapsed / 1000;
      let i = 0;
      for (const node of nodes.values()) {
        const phase = i++ * 0.8;
        // Bounded displacement, never cumulative: slow, slightly different currents.
        node.driftX = 5 * (Math.sin(driftTime / 9 + phase) - Math.sin(phase));
        node.driftY =
          3.5 *
          (Math.sin(driftTime / 12 + phase * 1.3) - Math.sin(phase * 1.3));
      }
      draw();
    }
    renderLabels(elapsed);
    startAnimation();
  }
  motionPreference.addEventListener(
    "change",
    () => {
      reducedMotion = motionPreference.matches;
      pauseButton.hidden = reducedMotion;
      if (reducedMotion) {
        stopAnimation();
        absorbDrift();
        simulation.stop();
        draw();
      } else startAnimation();
    },
    options,
  );
  document.addEventListener(
    "visibilitychange",
    () => (document.hidden ? stopAnimation() : startAnimation()),
    options,
  );
  for (const node of nodes.values()) {
    const handle = node.el.querySelector<SVGCircleElement>(".idea-handle")!;
    let activePointer: number | null = null;
    let offsetX = 0,
      offsetY = 0;
    function point(event: PointerEvent) {
      const matrix = svg!.getScreenCTM();
      return matrix
        ? new DOMPoint(event.clientX, event.clientY).matrixTransform(
            matrix.inverse(),
          )
        : null;
    }
    handle.addEventListener(
      "pointerdown",
      (event) => {
        if (event.button !== 0 || activePointer !== null) return;
        const p = point(event);
        if (!p) return;
        event.preventDefault();
        absorbDrift();
        handle.focus();
        activePointer = event.pointerId;
        node.fx = node.x;
        node.fy = node.y;
        if (!reducedMotion) simulation.alphaTarget(0.15).restart();
        offsetX = p.x - node.x;
        offsetY = p.y - node.y;
        handle.setPointerCapture(event.pointerId);
        node.el.classList.add("dragging");
      },
      options,
    );
    handle.addEventListener(
      "pointermove",
      (event) => {
        if (event.pointerId !== activePointer) return;
        const p = point(event);
        if (p) {
          move(node, p.x - offsetX, p.y - offsetY);
          node.fx = node.x;
          node.fy = node.y;
        }
      },
      options,
    );
    const end = () => {
      if (activePointer === null) return;
      activePointer = null;
      node.fx = null;
      node.fy = null;
      settle();
      node.el.classList.remove("dragging");
    };
    handle.addEventListener("pointerup", end, options);
    handle.addEventListener("pointercancel", end, options);
    handle.addEventListener("lostpointercapture", end, options);
    handle.addEventListener(
      "keydown",
      (event) => {
        const delta: Record<string, [number, number]> = {
          ArrowLeft: [-1, 0],
          ArrowRight: [1, 0],
          ArrowUp: [0, -1],
          ArrowDown: [0, 1],
        };
        if (!delta[event.key]) return;
        event.preventDefault();
        absorbDrift();
        const step = event.shiftKey ? 30 : 10;
        move(
          node,
          node.x + delta[event.key][0] * step,
          node.y + delta[event.key][1] * step,
        );
        settle();
      },
      options,
    );
  }
  panel.querySelector("button")?.addEventListener(
    "click",
    () => {
      simulation.stop();
      driftTime = 0;
      for (const node of nodes.values()) {
        node.driftX = 0;
        node.driftY = 0;
        node.fx = null;
        node.fy = null;
        node.vx = 0;
        node.vy = 0;
        node.x = node.initialX;
        node.y = node.initialY;
      }
      draw();
    },
    options,
  );
  placeLabels();
  renderLabels(0, true);
  panel.dataset.interactive = "true";
  window.addCleanup(() => {
    stopAnimation();
    observer.disconnect();
    controller.abort();
    simulation.stop();
  });
});
