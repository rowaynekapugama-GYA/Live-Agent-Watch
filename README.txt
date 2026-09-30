Live Agent Watch · working model (static site)

Upload this whole folder to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3, cPanel public_html).
Open index.html from the host's URL. Opening index.html directly from your computer as a file will not load the world map (browsers block local file reads), so use a host or a local web server.

Pages
  index.html      Live world map, stream, campaigns, "Replay a campaign"
  dashboard.html  What a single site owner sees
  install.html    Add-your-site flow: generates a key and the instructions to paste into an AI coding assistant
  how.html        How it works, signs, canary, ground rules, roadmap

All activity shown is simulated in the browser. Nothing is collected.

assets/
  logo.png, logo-dark.png, icon.png, mark.svg, mark-white.svg   brand assets
  style.css, app.js                                             site
  vendor.js (d3-geo, d3-array, internmap, topojson-client)      map libraries, bundled offline
  world.json (world-atlas countries-110m)                       world geometry
