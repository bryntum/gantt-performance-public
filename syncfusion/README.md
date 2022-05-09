# Syncfusion Gantt

## Prerequisites

Trial v.19.4.0

## Info

Download the Essential Studio then -> https://ej2.syncfusion.com/javascript/documentation/getting-started/quick-start/

Default Date format: YYYY-MM-DD

`enableVirtualization: true` virtual scrolling NEEDED, or you never get anything.

## Measure

1. Open Chrome devtools
2. Open ... in Chrome

The console will show the results.

Note: It will freeze for a moment this is expected.

## Results

| Auto-scheduling       | OFF   |       |       |       | ON    |       |       |       |
|-----------------------|-------|-------|-------|-------|-------|-------|-------|-------|
| Nb Tasks              | 100   | 1000  | 5000  | 10000 | 100   | 1000  | 5000  | 10000 |
| TTR (ms)              | 300   | 615   | 3550  | 13450 | 375   | 1090  | 6025  | 19421 |
| FPS                   | 58.9  | 43.2  | 24.2  | 14.7  | 58.6  | 46.3  | 26.1  | 15.8  |
| DOM Before Scroll     | 2521  | 2553  | 2553  | 2553  | 2681  | 2719  | 2729  | 2729  |
| DOM After Scroll      | 1963  | 1706  | 2577  | 1708  | 2295  | 2757  | 2388  | 2603  |
| Mem                   | 12.17 | 14.25 | 21.48 | 29.2  | 12.39 | 15.05 | 21.86 | 29.88 |
| Moving task time (ms) | 181   | 305   | 1755  | 4945  | 201   | 390   | 1591  | 5091  |