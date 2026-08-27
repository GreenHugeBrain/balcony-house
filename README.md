# The Balcony House

A concept site for a nine-room guesthouse in Sololaki, Old Tbilisi, built around
the argument that booking direct should be easier than booking through a
platform — not merely cheaper.

**Live:** https://greenhugebrain.github.io/balcony-house/

React and Vite. No dependencies beyond React, no backend.

## What it does

- **Rooms as an accordion**, not four identical cards. Rate, aspect and the
  honest detail — no lift, two flights of stairs — are in the open.
- **A quote that updates as you type.** Nights are computed from the two dates,
  multiplied by the room rate, and shown before any personal detail is asked for.
  A departure before the arrival is refused in words rather than shown as a
  negative total.
- **Capacity checked against the room.** Four guests in a room that sleeps two is
  caught on submit and named specifically.
- **"Check this room"** carries the room you were reading into the form.

The enquiry sends nothing. The confirmation panel says so.

## Photographs

The exterior and old-town photography is from Wikimedia Commons, under the
licences in `CREDITS.md`. There are no photographs of the bedrooms, because there
is no house — the interiors shown are the common rooms, and a real guesthouse
using this design would put its own room photography in their place.

## Design

Cormorant Garamond against Inter, cream and ochre. The lari sign is set in the
body face throughout: Cormorant has no glyph for it, and the fallback sits above
the baseline where the serif numerals do not.

## Run locally

```bash
npm install
npm run dev
```

`npm run build` outputs to `dist/`, which the GitHub Actions workflow publishes
to Pages on every push to `master`.
