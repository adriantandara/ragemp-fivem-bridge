export class IdAllocator {
  private next = 0;
  private freed: number[] = [];

  allocate(): number {
    if (this.freed.length) return this.freed.shift()!;
    return this.next++;
  }

  free(id: number): void {
    let lo = 0;
    let hi = this.freed.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (this.freed[mid] < id) lo = mid + 1;
      else hi = mid;
    }
    if (this.freed[lo] === id) return;
    this.freed.splice(lo, 0, id);
  }

  reset(): void {
    this.next = 0;
    this.freed = [];
  }
}
