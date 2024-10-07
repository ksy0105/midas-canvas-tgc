import './style.css'

const modules = import.meta.glob('./modules/*.ts')
for (const path in modules) await modules[path]()