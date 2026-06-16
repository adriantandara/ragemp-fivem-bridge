'use strict';

/**
 * Default chat echo for the ragemp-chat resource.
 *
 * The bridge itself never renders or broadcasts chat. When a player sends a
 * plain message the bridge fires the RAGE:MP `playerChat` event and, unless a
 * handler returns `false` to cancel it, raises the local `ragemp:chat:output`
 * hook. This resource owns the policy: it echoes `name: message` to everyone,
 * mirroring RAGE:MP's stock behaviour. Remove or edit this handler to change it.
 */
mp.events.add('ragemp:chat:output', (player, text) => {
  const safe = String(text).replace(/[<>]/g, '');
  mp.players.broadcast(`${player.name}: ${safe}`);
});
