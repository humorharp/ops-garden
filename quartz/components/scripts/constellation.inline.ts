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
    },
    options,
  );
  const observer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
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
    const elapsed = previousTime ? Math.min(now - previousTime, 50) : 0;
    previousTime = now;
    if (
      !reducedMotion &&
      !driftPaused &&
      inView &&
      !document.hidden &&
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
    animationFrame = requestAnimationFrame(drift);
  }
  motionPreference.addEventListener(
    "change",
    () => {
      reducedMotion = motionPreference.matches;
      pauseButton.hidden = reducedMotion;
      if (reducedMotion) {
        absorbDrift();
        simulation.stop();
        draw();
      }
    },
    options,
  );
  animationFrame = requestAnimationFrame(drift);
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
  panel.dataset.interactive = "true";
  window.addCleanup(() => {
    cancelAnimationFrame(animationFrame);
    observer.disconnect();
    controller.abort();
    simulation.stop();
  });
});

