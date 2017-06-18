
export function mergeType(A: number, B: Uint8Array) : ArrayBuffer {
    const a = new Uint8Array([A]);
    const c = new Uint8Array(B.length + 1);
    c.set(a);
    c.set(B, a.length);
    return c.buffer as ArrayBuffer;
}

export function splitType(A : Buffer) : [number,Buffer] {
    return [
        (new Uint8Array(A.slice(0,1)))[0],
        A.slice(1),
    ]
}