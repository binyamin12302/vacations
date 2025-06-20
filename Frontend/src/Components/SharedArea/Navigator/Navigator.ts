// Navigator.ts
let globalNavigate: ((path: string) => void) | null = null;

export function setNavigate(navigateFunction: (path: string) => void) {
    globalNavigate = navigateFunction;
}

export function navigate(path: string) {
    if (globalNavigate) globalNavigate(path);
    else console.warn("Navigator: navigate function not set yet!");
}
