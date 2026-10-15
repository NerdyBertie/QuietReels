<img width="257" height="254" alt="Quiet Reels popup with a volume slider set to 10%" src="https://github.com/user-attachments/assets/ebce8f1f-5775-4453-9ce5-dbd4944d89e4" />

# Quiet Reels

A tiny Chrome extension that gives Facebook and Instagram videos a volume slider that remembers your setting. No more reels blasting at full volume the moment you unmute.

## Why I made it

I got tired of Facebook not having a real volume control. Reels are either muted or full blast, and I was sick of getting my ears blasted off every time I went to watch one. So I made the volume slider Facebook should have had in the first place.

## What it does

- Click the Quiet Reels icon on Facebook or Instagram and set a volume (10% by default).
- That level becomes the maximum for every video on that site. The site's own slider at 100% plays at your Quiet Reels level.
- The site's own mute button and slider still work as normal.
- Each site remembers its own setting, even after you close Chrome.

## Privacy

Quiet Reels has no network code. It only runs on facebook.com and instagram.com, and the only thing it stores is your volume number, using Chrome's built-in storage. You can read every line of code in this repo.

## Install

1. Download `QuietReels.zip` from the [Releases](../../releases) page and unzip it.
2. Move the `QuietReels` folder somewhere permanent, like Documents. Chrome loads it from that spot.
3. Open `chrome://extensions` in Chrome.
4. Turn on **Developer mode** (top-right corner).
5. Click **Load unpacked** and choose the `QuietReels` folder.
6. Pin it from the puzzle-piece menu, then refresh any open Facebook or Instagram tabs.

Chrome may show a notice about developer-mode extensions. That's normal for extensions installed this way.

## Updating

Replace the files in your `QuietReels` folder with the new ones, then click the reload arrow on the Quiet Reels card in `chrome://extensions` and refresh your Facebook or Instagram tabs.

## Having issues?

If something isn't working, open an issue on the [Issues](../../issues) page and let me know what's happening (which site, and what you were doing when it went wrong). I'll take a look!

© 2026 NerdyBertie. All rights reserved. You're welcome to download and use Quiet Reels, but please don't redistribute or modify it.
