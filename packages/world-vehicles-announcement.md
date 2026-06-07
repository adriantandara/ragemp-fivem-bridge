# 🚗 New: spawn vehicles anywhere on the map

Hey everyone! New optional plugin just landed in the bridge: **world-vehicles**.

You know the FiveM headache where `mp.vehicles.new` just returns `null` if there's no player standing near the spot? That's gone. With this plugin on, you can spawn server vehicles **anywhere** — empty parking lots, the airport, the top of Chiliad, wherever — exactly like you're used to on RAGE:MP.

**How it works**
Under the hood it uses `CreateVehicleServerSetter` and keeps the vehicle alive even when nobody's around. The moment a player drives into range, the engine streams it in and hands them control automatically. No manual controller juggling. On servers without the setter, it falls back to a tiny internal queue that retries the spawn the second a player walks up — fully server-side, no colshapes in your pool.

**It's off by default.** Turn it on with one line in your fxmanifest:

```lua
bridge_world_vehicles 'yes'
```

That's it. Your existing `mp.vehicles.new(...)` calls don't change — they just start working everywhere. Spawning a boat or heli far away? Pass `{ vehicleType: 'boat' }` (or `heli`, `plane`, etc.) so it picks the right type.

Zero cost if you leave it off — the plugin doesn't register anything unless you enable it.

Docs: **Plugins → world-vehicles**. Have fun spawning stuff in the middle of nowhere 🌍
