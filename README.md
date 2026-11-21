# Friday Nights: Under the Lights

A college-style football sim for phone/tablet (landscape), with a 3D mode, season mode, 200-year canon history and legends.

## Build
    python3 build.py      # combines the .js files + template.html into index.html

Open `index.html` in any browser to play. No server needed.

## Files
- engine.js: teams, rosters, graduation, game engine
- season.js: league, schedule, playoffs, rankings, history, legends
- ui.js / stadium.js: 2D game screens, fields, uniforms
- three3d.js: 3D mode (Three.js in vendor/)
- live.js: live play control (steer the runner, read the pass)
- announce.js: the broadcast booth (spoken announcers + captions)
- builder.js: Mishawaka roster builder
- fakelogos.js: original mascot art for the fictional schools
- assets.js: logos and images (embedded)
