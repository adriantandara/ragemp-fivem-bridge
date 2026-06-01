import { StreamingPool } from "./StreamingPool";
import { PedMp } from "../Entities/PedMp";
import { getPedPool } from "../utils/worldScan";

let localPedIdCounter = 1000000;

export class PedMpPool extends StreamingPool {
    _add!: (entity: PedMp) => void;

    constructor() {
        super();
        this._startStreaming(
            getPedPool,
            (netId: number, handle: number) => new PedMp(netId, handle),
            (handle: number) => !IsPedAPlayer(handle)
        );
        this._setupServerSync();
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
        const id = ++localPedIdCounter;
        const ped = new PedMp(id, 0);
        this._add(ped);

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
            ped._handle = handle;

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

    _setupServerSync(): void {
        onNet("ragemp:pedInvincible", (netId: number, value: boolean) => {
            const handle = NetworkGetEntityFromNetworkId(netId);
            if (handle && DoesEntityExist(handle)) {
                SetEntityInvincible(handle, value);
                const ped = this._handleToEntity.get(handle);
                if (ped) {
                    ped._invincible = value;
                }
            }
        });
    }
}