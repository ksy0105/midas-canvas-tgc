import './style.css'

const modules = import.meta.glob('./modules/*.ts')

async function loadModulesSequentially() {
    for (const path in modules) {
        const moduleLoader = modules[path]
        const module = await moduleLoader()
        console.log(`Module loaded from ${path}`, module)
    }
}

loadModulesSequentially()