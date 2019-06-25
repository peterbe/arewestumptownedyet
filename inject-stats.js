/**
 * Script to generate JavaScript code that contains all the necessary stats.
 *
 * Usage:
 *
 *   node inject-stats.js node inject-stats.js ../stumptown-renderer/stumptown/packaged/ [src/Stats.js]
 */
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);

if (!args.length) {
  throw new Error(
    "Usage: node inject-stats.js path/to/stumptown/packaged/dir [src/Stats.js]"
  );
}

let sourceDir = args[0];
let destination = "src/Stats.js";
if (args.length > 1) {
  destination = args[1];
}

let countJsonFiles = 0;
let sumJsonFilesBytes = 0;
function walk(directory) {
  const files = fs.readdirSync(directory);
  for (let filename of files) {
    // console.log(filename);
    const filepath = path.join(directory, filename);
    if (filename.endsWith(".json")) {
      sumJsonFilesBytes += fs.statSync(filepath).size;
      countJsonFiles++;
    }

    if (fs.statSync(filepath).isDirectory()) {
      walk(filepath);
    }
  }
}

walk(sourceDir);
console.log({ countJsonFiles, sumJsonFilesBytes });

/**
 * Note to self; here's how I found out how many documents Kuma has in prod.

Start a `./manage.py shell_plus` in kubectl on prod.
Paste in this code:

from django.db.models import Q
from kuma.wiki.constants import EXPERIMENT_TITLE_PREFIX, LEGACY_MINDTOUCH_NAMESPACES
q = Q(slug__startswith=EXPERIMENT_TITLE_PREFIX)
for legacy_mindtouch_namespace in LEGACY_MINDTOUCH_NAMESPACES:
   q |= Q(slug__startswith='{}:'.format(legacy_mindtouch_namespace))
docs = Document.objects.filter(is_redirect=False).exclude(html='', current_revision__isnull=True).exclude(q)
docs.count()
docs.filter(locale='en-US').count()

 * As of June 24 2019, I ran that and the number was 64,262 (all)
 * and 18,256 (en-US)
 * */

const kumaDocuments = {
  "en-US": 18256,
  all: 64262
};

const stats = {
  date: new Date().getTime(),
  kuma: kumaDocuments,
  stumptown: {
    "en-US": countJsonFiles,
    all: null
  }
};

fs.mkdirSync("stats-log", { recursive: true });
const statsLogToday = new Date().toISOString().split("T")[0] + ".json";
fs.writeFileSync(
  path.join("stats-log", statsLogToday),
  JSON.stringify(stats, null, 2)
);

const code = `/** This page is auto-generated from inject-stats.js
 * Date: ${new Date()}
 */

const Stats = ${JSON.stringify(stats, null, 2)};
export default Stats;
`;

fs.writeFileSync(destination, code);
console.log(`Wrote ${destination} 🎉`);
