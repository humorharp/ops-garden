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
        initialX: Number(el.dataset.x),
        initialY: Number(el.dataset.y),
      },
    ]),
  );
  const paths = Array.from(svg.querySelectorAll<SVGPathElement>("[data-from]"));
  function draw() {
    for (const node of nodes.values())
      node.el.setAttribute("transform", `translate(${node.x} ${node.y})`);
    for (const path of paths) {
      const a = nodes.get(path.dataset.from!)!,
        b = nodes.get(path.dataset.to!)!;
      const bend = Number(path.dataset.bend);
      path.setAttribute(
        "d",
        `M ${a.x} ${a.y} Q ${(a.x + b.x) / 2 - (b.y - a.y) * bend} ${(a.y + b.y) / 2 + (b.x - a.x) * bend} ${b.x} ${b.y}`,
      );
    }
  }
  function move(node: { x: number; y: number }, x: number, y: number) {
    node.x = Math.max(120, Math.min(780, x));
    node.y = Math.max(35, Math.min(445, y));
    draw();
  }
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
        handle.focus();
        activePointer = event.pointerId;
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
        if (p) move(node, p.x - offsetX, p.y - offsetY);
      },
      options,
    );
    const end = () => {
      activePointer = null;
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
        const step = event.shiftKey ? 30 : 10;
        move(
          node,
          node.x + delta[event.key][0] * step,
          node.y + delta[event.key][1] * step,
        );
      },
      options,
    );
  }
  panel.querySelector("button")?.addEventListener(
    "click",
    () => {
      for (const node of nodes.values()) {
        node.x = node.initialX;
        node.y = node.initialY;
      }
      draw();
    },
    options,
  );
  panel.dataset.interactive = "true";
  window.addCleanup(() => controller.abort());
});
