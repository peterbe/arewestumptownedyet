# Are We Stumptowned Yet?

## About

A semi-whimsical web page for displaying an executive summary of the
progress of turning MDN Web Docs into structured content that
can be rendered.

## How To Hack On

Install stuff and run:

    yarn
    yarn run start
    open http://localhost:3000

To generate the stats you need to have a `stumptown-renderer` clone in
which you have, at some recent point, run `make deployment-build`. Then run:

    node inject-stats.js ../stumptown-renderer/stumptown/packaged/ src/Stats.js

That will update `src/Stats.js` and possible files in `./stats-log/` which
you need to git add.

## Deployment

Just run:

    yarn run deploy

You need to have write access to push to `github.com/peterbe/arewestumptownedyet`.
