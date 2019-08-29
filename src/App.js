import React, { useEffect } from "react";
import chartXkcd from "chart.xkcd";
import "./light.css";
import "./App.css";

import Stats from "./Stats";

function App() {
  useEffect(() => {
    const svg = document.querySelector(".bar-chart");

    // You can't control the colors yet. :(
    // https://github.com/timqian/chart.xkcd/issues/11#issuecomment-526298775
    new chartXkcd.Bar(svg, {
      title: "Kuma vs Stumptown", // optional
      // xLabel: '', // optional
      yLabel: "# documents", // optional
      data: {
        labels: ["Kuma (en-US)", "Stumptown"],
        datasets: [
          {
            data: [Stats.kuma["en-US"], Stats.stumptown["en-US"]]
          }
        ]
      },
      options: {
        // optional
        yTickCount: 10
      }
    });
  }, []);
  return (
    <div>
      <h1>Are We Stumptowned Yet?</h1>
      <h2>No :(</h2>

      <h3>What's this?</h3>
      <p>
        Stumptown is a Mozilla MDN project to rewrite existing documentation
        about web development, from a{" "}
        <a href="https://developer.mozilla.org">Wiki</a>, stored in a central
        relational database, to{" "}
        <b>strutured content (e.g. Markdown files) in a Git repo</b>.
      </p>
      <p>Stumptown consists of two parts:</p>
      <ul>
        <li>
          <a href="https://github.com/mdn/stumptown-content">
            <b>github.com/mdn/stumptown-content</b>
          </a>{" "}
          - the actual content (plus some scripting)
        </li>
        <li>
          <a href="https://github.com/mdn/stumptown-renderer">
            <b>github.com/mdn/stumptown-renderer</b>
          </a>{" "}
          - React components for turning content into HTML web pages
        </li>
      </ul>
      <p>
        This site is about attempting to measure how many ready pages there are
        in <b>github.com/mdn/stumptown-content</b> and contrast that with the
        number of pages in <b>developer.mozilla.org</b>.
      </p>

      <h3>Current Status</h3>
      <dl>
        <dt>
          Kuma (<code>en-US</code>):
        </dt>
        <dd className="number">{Stats.kuma["en-US"].toLocaleString()}</dd>

        <dt>
          Stumptown (<code>en-US</code>):
        </dt>
        <dd className="number">{Stats.stumptown["en-US"].toLocaleString()}</dd>
        <dd>
          Approximately{" "}
          {(
            (100 * Stats.stumptown["en-US"]) /
            (Stats.stumptown["en-US"] + Stats.kuma["en-US"])
          ).toFixed(1)}
          % of Kuma
        </dd>
      </dl>
      <p>
        <small>As of {prettyTimestamp(Stats.date)}</small>
      </p>
      <div>
        <svg className="bar-chart"></svg>
      </div>
    </div>
  );
}

function prettyTimestamp(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString();
}

export default App;
