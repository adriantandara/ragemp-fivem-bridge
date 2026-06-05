export interface NetworkedReceiverOpts<P> {
  createEvent: string;
  syncAllEvent: string;
  updateEvent: string;
  destroyEvent: string;
  create: (pool: P, data: any) => void;
  update: (pool: P, id: number, data: any) => void;
  destroy: (pool: P, id: number) => void;
}

export function setupNetworkedReceiver<P extends { exists(id: number): boolean }>(
  pool: P,
  opts: NetworkedReceiverOpts<P>,
): void {
  onNet(opts.createEvent, (data: any) => opts.create(pool, data));

  onNet(opts.syncAllEvent, (list: any[]) => {
    for (const data of list) {
      if (!pool.exists(data.id)) opts.create(pool, data);
    }
  });

  onNet(opts.updateEvent, (id: number, data: any) => opts.update(pool, id, data));

  onNet(opts.destroyEvent, (id: number) => opts.destroy(pool, id));
}
