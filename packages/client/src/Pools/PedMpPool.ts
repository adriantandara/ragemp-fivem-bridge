import { poolAdd, EntityInternals, CONSTRUCT } from "@ragemp-fivem-bridge/shared/internal";
import { StreamingPool } from "./StreamingPool";
import { PedMp } from "../Entities/PedMp";
import { getPedPool } from "../utils/worldScan";
import { StreamingInternals } from "../internal/streamingInternals";
import { setupPedPool, nextLocalPedId } from "../internal/pools/pedPoolService";
import { startStreaming } from "../internal/pools/streamingService";

export class PedMpPool extends StreamingPool<PedMp> {
    constructor() {
        super("ped");
        setupPedPool(this);
        startStreaming(
            this,
            getPedPool,
            (netId: number, handle: number) => new PedMp(CONSTRUCT, netId, handle),
            (handle: number) => !IsPedAPlayer(handle)
        );
    }

    new(model: number | string, position: { x: number; y: number; z: number }, options: any = {}, callback?: ((ped: PedMp) => void) | null): PedMp {
        if (typeof options === "number") {
            options = { heading: options };
        } else if (typeof options === "function") {
            callback = options;
            options = {};
        }
        if (typeof callback !== "function") callback = null;

        const hash = typeof model === "string" ? GetHashKey(model) : model;
        const id = nextLocalPedId();
        const ped = new PedMp(CONSTRUCT, id, 0);
        poolAdd(this, ped);

        const finish = () => {
            const handle = CreatePed(
                options.type ?? 4,
                hash,
                position.x,
                position.y,
                position.z,
                options.heading ?? 0,
                false,
                false
            );
            EntityInternals.get(ped).handle = handle;
            StreamingInternals.get(this).handleToEntity.set(handle, ped);

            SetEntityAsMissionEntity(handle, true, true);

            SetBlockingOfNonTemporaryEvents(handle, true);
            FreezeEntityPosition(handle, options.frozen ? true : false);

            SetModelAsNoLongerNeeded(hash);

            if (callback) {
                try {
                    callback(ped);
                } catch (e) {
                    console.error(`[ragemp-bridge] mp.peds.new callback error: ${e}`);
                }
            }
        };

        if (HasModelLoaded(hash)) {
            finish();
        } else {
            RequestModel(hash);
            const startedAt = GetGameTimer();
            const tick = setTick(() => {
                if (HasModelLoaded(hash)) {
                    clearTick(tick);
                    finish();
                } else if (GetGameTimer() - startedAt > 30000) {
                    clearTick(tick);
                    console.warn(
                        `[ragemp-bridge] mp.peds.new: model ${hash} failed to load after 30s — ped not created.`
                    );
                } else {
                    RequestModel(hash);
                }
            });
        }

        return ped;
    }
}
