import './style.css';

const examples = import.meta.glob('./examples/*.js');

for (const path in examples) {
  await examples[path]();
}