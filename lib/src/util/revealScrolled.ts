const revealScrolled = (
  target: HTMLElement,
  maxParent?: HTMLElement | null
) => {
  //   let [parent, rect] = [target.parentElement, target.getBoundingClientRect()];
  let parent = target.parentElement;
  while (parent) {
    if (parent.scrollHeight > parent.clientHeight) {
      const [rect, parentRect] = [
        target.getBoundingClientRect(),
        parent.getBoundingClientRect(),
      ];
      if (rect.top < parentRect.top) {
        parent.scrollTop -= parentRect.top - rect.top;
      } else if (rect.bottom > parentRect.bottom) {
        parent.scrollTop += rect.bottom - parentRect.bottom;
      }
    }
    if (maxParent && parent === maxParent) break;
    parent = parent.parentElement;
  }
};

export { revealScrolled };
