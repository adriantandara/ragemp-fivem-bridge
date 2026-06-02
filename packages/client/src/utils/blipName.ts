interface BlipNameJob {
  handle: number;
  text: string;
}

const _queue: BlipNameJob[] = [];
let _running = false;

function _run(): void {
    if (_running) return;
    _running = true;
    const step = () => {
        const job = _queue.shift();
        if (job && job.handle != null && DoesBlipExist(job.handle)) {
            BeginTextCommandSetBlipName("STRING");
            AddTextComponentSubstringPlayerName(job.text);
            EndTextCommandSetBlipName(job.handle);
        }
        if (_queue.length) {
            setTimeout(step, 0);
        } else {
            _running = false;
        }
    };
    setTimeout(step, 0);
}

export function applyBlipName(handle: number, name: string | null | undefined): void {
    if (handle == null || name == null || name === "") return;
    const existing = _queue.find((j) => j.handle === handle);
    if (existing) existing.text = String(name);
    else _queue.push({ handle, text: String(name) });
    _run();
}
