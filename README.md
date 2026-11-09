# ATHLETE OS

A mobile-first local PWA for recording personal workouts, runs, and mobility practice. It has no package dependencies or build step. Data is stored in this browser's IndexedDB; the app can log sessions offline after its first load.

## Run locally

Install Node.js 18 or newer, then from this folder run:

```sh
node server.mjs
```

Open <http://127.0.0.1:8000>. The static server is included because npm is not installed in the current development environment.

## Use on iPhone

Create a repository named `athlete-os`, add these project files, then open **Settings → Pages** and select **GitHub Actions** as the source. The included workflow deploys the static app on every push to `main`. After its first successful run, the iPhone opens `https://<your-github-name>.github.io/athlete-os/`; the PC does not need to stay on. Service workers and Home Screen installation require HTTPS. Open the URL in Safari, tap **Share**, then **Add to Home Screen**. Open it once online to cache the app shell for offline use.

GitHub Pages on the Free plan requires a public repository, so the website and source will be public. The training history itself is not uploaded; it stays in the browser's local IndexedDB on each device.

The repository and deployed JavaScript are public when using GitHub Free Pages. The starter app therefore contains no personal profile measurements. Enter age, sex, height, and weight once in the Profile screen on the iPhone after installation; those values stay in that phone's IndexedDB.

## Data and backups

Workout drafts are saved to IndexedDB as each set field changes. Finishing a workout saves the full session; runs and mobility entries are written when their forms are saved. Active workout state survives refresh and reopening in the same browser profile. Database schema version is `1` in `app.js`; increase `DB_VERSION` and add an `onupgradeneeded` migration before changing stored record shapes.

Use **Profile → Export JSON** to download a backup. Keep that file somewhere separate from the phone. **Import backup** validates the file and skips duplicate IDs. CSV exports are available for workouts and runs. Browser storage is local device storage and can be cleared or lost with the device; it is not a cloud backup. Automatic cloud sync, Supabase authentication/RLS, and cross-device conflict resolution are not configured.

## Included

- Dashboard, weekly plan, session history, progress charts, mobility library, and athlete profile
- Gym A/B/C templates, individual set logging, RIR, exercise notes, resume after refresh, and a rest timer
- Squat variation, depth, heel contact, technique, comfort, and difficulty fields
- Run logging with pace, distance, duration, effort, heart rate, intervals, and notes
- Mobility completion history and before/after stiffness notes
- JSON import/export, duplicate detection, CSV export, backup reminder, and local data deletion
- Service worker and iPhone Home Screen metadata
- Calculation tests using Node's built-in test runner

## Verify calculations

```sh
node --check app.js
node --check core.js
node --check sw.js
node --test tests/core.test.cjs
```

Browser-driven iPhone layout, IndexedDB persistence/reopen, and offline service-worker behavior still need verification in a browser/device. The current environment has no npm, and its browser could not connect to the local server.

