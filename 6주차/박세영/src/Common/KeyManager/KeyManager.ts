class KeyManager {
    private static instance: KeyManager;
    keySet = new Set();

    private constructor() {
      this.bind();
    }

    public static getInstance(): KeyManager {
        if (!KeyManager.instance) {
            KeyManager.instance = new KeyManager();
        }

        return KeyManager.instance;
    }

    bind() {
        document.addEventListener("keydown", (e) => {
            this.keySet.add(e.key);
        });
        document.addEventListener("keyup", (e) => {
            this.keySet.delete(e.key);
        });
    }

    isPressed(key: string) {
        return this.keySet.has(key);
    }
}

export const keyManager = KeyManager.getInstance();