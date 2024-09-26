export function setupCounter(element: HTMLButtonElement, initCounter?: number) {
  let counter = 0;
  const setCounter = (count: number) => {
    if (initCounter) counter = initCounter;
    else counter = count;
    element.innerHTML = `count is ${counter}`;
  };
  element.addEventListener("click", () => setCounter(counter + 1));
  setCounter(0);
}

export function resetCounter(element: HTMLButtonElement) {
  const initCounter = 0;
  element.innerHTML = `reset`;
  const setCounter = (count: number) => {
    setupCounter(
      document.querySelector<HTMLButtonElement>("#counter")!,
      count
    );
  };
  element.addEventListener("click", () => {
    setCounter(initCounter);
  });
}
