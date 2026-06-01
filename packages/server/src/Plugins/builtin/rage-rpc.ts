import rpc from "@ragemp-fivem-bridge/rage-rpc";

export const name = "rage-rpc";

export default function setup({ mp }: { mp: any }): void {
  rpc.register("__rpc:noop", () => true);
  mp.rpc = rpc;
}
