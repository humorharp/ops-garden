document.addEventListener("nav", () => {
  const headings = Array.from(
    document.querySelectorAll<HTMLElement>(".reading-section > h2"),
  );
  const article = headings[0]?.closest("article");
  if (!article) return;
  // The actual headings scroll and stick; this layer supplies only the glass.
  const bar = document.createElement("div");
  bar.className = "reading-glass";
  bar.setAttribute("aria-hidden", "true");
  document.body.append(bar);
  document.documentElement.classList.add("reading-glass-enabled");
  let frame = 0;
  const update = () => {
    frame = 0;
    const bounds = article.getBoundingClientRect();
    const clearance =
      Math.max(
        ...headings.map((heading) => heading.getBoundingClientRect().height),
      ) + 48;
    document.documentElement.style.setProperty(
      "--reading-sidebar-clearance",
      clearance + "px",
    );
    let active: HTMLElement | undefined;
    for (const heading of headings) {
      if (
        getComputedStyle(heading).position === "sticky" &&
        heading.getBoundingClientRect().top <= 16.5
      )
        active = heading;
    }
    const height = active ? active.getBoundingClientRect().height + 32 : 0;
    bar.style.height = height + "px";
    const focus = document.activeElement;
    const focusBounds =
      focus instanceof HTMLElement && article.contains(focus)
        ? focus.getBoundingClientRect()
        : undefined;
    const obscuresFocus =
      focusBounds && focusBounds.top < height && focusBounds.bottom > 0;
    bar.classList.toggle(
      "is-visible",
      !!active && bounds.bottom > height + 24 && !obscuresFocus,
    );
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  document.addEventListener("focusin", schedule);
  document.addEventListener("focusout", schedule);
  const observer = new ResizeObserver(schedule);
  observer.observe(article);
  headings.forEach((heading) => observer.observe(heading));
  update();
  window.addCleanup(() => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    bar.remove();
    document.documentElement.classList.remove("reading-glass-enabled");
    document.documentElement.style.removeProperty(
      "--reading-sidebar-clearance",
    );
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    document.removeEventListener("focusin", schedule);
    document.removeEventListener("focusout", schedule);
  });
});
