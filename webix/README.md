# Webix Gantt

## Prerequisites

Used the Webix Pro Trial version v.9.1.6, not the Webix Standard Open Source GPL version, but in terms of performances, they should be similar.
https://webix-ui.medium.com/webix-pro-vs-webix-standard-23a8087c7961

## Info

I have not found how to use local data. The url property fits all solutions with a REST standard the website doesn't explain adequately.
/tasks GET to get the list of tasks
/links GET to get the list of dependencies
I created a server endpoint with files called /tasks and /links

Default Date format YYYY-MM-DD

The Auto-Scheduling feature is not available.

Recommended ways to improve perf
https://docs.webix.com/desktop__plain_dynamic_loading.html

## Measure

Depending on the number of tasks desired, copy data to these files from either:
* 100-tasks-webix.json and 100-deps-webix.json OR
* 1000-tasks-webix.json and 1000-deps-webix.json OR
* 5000-tasks-webix.json and 5000-deps-webix.json OR
* 10000-tasks-webix.json and 10000-deps-webix.json

1. Open Chrome devtools
2. Open ... in Chrome

The console will show the results.

## Results

| Auto-scheduling       | OFF  |       |       |        |
|-----------------------|------|-------|-------|--------|
| Nb Tasks              | 100  | 1000  | 5000  | 10000  |
| TTR (ms)              |      |       |       |        |
| FPS                   | 60.1 | 30.4  | 5.2   | 2.9    |
| DOM Before Scroll     | 2056 | 16736 | 38898 | 77348  |
| DOM After Scroll      | 2056 | 16736 | 81898 | 163348 |
| Mem                   | 5.1  | 8.94  | 26.79 | 48.43  |
| Moving task time (ms) | 4    | 4     | 4     | 6      |