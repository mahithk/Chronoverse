🌍 Chronoverse — Project Description...


1. Overview


This project is an interactive World Time Zone Explorer built using HTML, CSS, and JavaScript.
It allows users to:

Explore all standard time zones across the globe.

View live local times for every timezone.

Interactively click markers on a world map or search in a list.

Highlight and update selected time zones in real-time.

Essentially, it works as a global clock + timezone visualizer with both map-based interaction and list-based browsing.



2. Key Features


🕒 Real-Time Clock Updates

The program calculates current local time in every timezone using JavaScript’s Date and UTC offset logic.

A setInterval updates all times every second, keeping clocks perfectly in sync.

🌍 Interactive World Map

The map has red markers (map-marker elements) placed at approximate coordinates (x, y) for each timezone’s major city.

Each marker has a tooltip with the city name.

Clicking a marker updates the main display (time, date, timezone abbreviation).

The selected marker zooms in (scale effect) with a glowing highlight to show it’s active.

📜 Scrollable Timezone List

A sidebar (or container) displays all 39+ timezones in a list format.

Each item shows:

City/region name.

UTC offset and abbreviation.

Current date.

Current time (live-updating).

Hovering or clicking an item highlights it and syncs the display with the map marker.

🔍 Search Functionality

A search box lets users quickly find time zones by:

Location (e.g., London, Sydney).

Offset (e.g., +05:30).

The list dynamically filters results in real time.

⭐ Highlighting and Auto-Scroll

The selected timezone is highlighted in both the list and the map.

Auto-scroll brings the active timezone into view in the list.

📌 Default Highlight (Kolkata / India Time)

When the page loads, it automatically highlights Kolkata (UTC+05:30, IST).

If Kolkata is missing, it falls back to a default timezone (London).



3. Technical Details

   
Data Structure

All timezones are stored in a JavaScript array of objects (timeZones).

Each object includes:

offset → UTC offset (e.g., +05:30).

abbrev → Time zone abbreviation (e.g., IST).

location → Main city/region.

x, y → Map coordinates for marker placement.

Example:

{ offset: '+05:30', abbrev: 'IST', location: 'Kolkata, India', x: 64, y: 47 }

Time Calculation

Uses JavaScript’s Date and UTC offset adjustments:

const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
const tzTime = new Date(utc + ((h * 60 + m) * 60000));


This converts the local system time into the target timezone.

Real-Time Updates

setInterval (1 second) updates:

List times.

Date strings.

Main display for the highlighted timezone.

DOM Interaction

Markers (.map-marker) and list items (.timezone-item) are dynamically created and appended.

Clicking or hovering triggers highlightTimezone(), which syncs the display.



4. User Flow


The user loads the page.

The map and timezone list are populated.

By default, Kolkata time is highlighted.

User can:

🔍 Search a timezone.

📍 Click a marker on the map.

📜 Scroll and select from the list.

The selected timezone info (date + live clock) updates in the main display.

The user can keep it open to watch global times update live in real time.



5. Use Cases


Travelers planning flights across multiple time zones.

Remote workers collaborating globally.

Students learning about time zones.

Digital clock replacement with global awareness.



6. Enhancements (Future Ideas)


🖼️ Better world map projection (interactive SVG).

⏰ Add alarm/meeting planner across time zones.

🌐 Option to switch between 12-hour/24-hour formats.

📱 Mobile-friendly collapsible design.

🎨 Custom themes (dark/light, neon, etc.).

✅ In short:
This project is a beautifully interactive, real-time world clock and timezone explorer, combining a map UI + searchable list + live updating clocks for every timezone across the planet.
