import React from "react";
import { Bar, Line } from "react-roughviz";
import "./light.css";
import "./App.css";

import { Stats } from "./Stats";

export const isServer =
  typeof document === "undefined" || navigator.userAgent === "ReactSnap";

function App() {
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
        <StatsChart />
        <HistoryChart />
      </div>
    </div>
  );
}

function prettyTimestamp(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString();
}

export default App;

function StatsChart() {
  if (isServer) {
    return <i>No SVG charts in server mode</i>;
  }
  const data = {
    labels: ["Kuma (en-US)", "Stumptown"],
    values: [Stats.kuma["en-US"], Stats.stumptown["en-US"]]
  };

  return <Bar data={data} roughness={2} width={800} stroke="#cccccc" />;
}

function HistoryChart() {
  if (isServer) {
    return <i>No SVG charts in server mode</i>;
  }
  const data = process.env.PUBLIC_URL + "history.csv";
  // Still a bit broken since it doesn't display the dates on the
  // x-axis.
  return (
    <Line
      data={data}
      roughness={3}
      width={800}
      strokeWidth={1.5}
      // x="date"
      y="COUNT"
      xLabel="Time"
      yLabel="# Stumptown docs"
      stroke="#cccccc"
      title="# Stumptdown docs over time"
      legend={false}
      circleRadius={5}
    />
  );
}
