# Devextreme Gantt

## Prerequisites

Licensed ZIP version 21.2.5 https://go.devexpress.com/DevExpressDownload_DevExtremeCompleteTrialZip.aspx
Used .min files from the Licensed version.

## Info

Get Started here: https://js.devexpress.com/Documentation/Guide/UI_Components/Gantt/Getting_Started_with_Gantt/

Default Date format MM-DD-YYYY

Recommended ways to improve perf
https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxGantt/Configuration/validation/#enableDependencyValidation

## Measure

1. Open Chrome devtools
2. Open ... in Chrome

The console will show the results.

## Results

| Auto-scheduling       | OFF   |       |      |       | ON    |       |       |       |
|-----------------------|-------|-------|------|-------|-------|-------|-------|-------|
| Nb Tasks              | 100   | 1000  | 5000 | 10000 | 100   | 1000  | 5000  | 10000 |
| TTR (ms)              | 244   | 402   | 1220 | 3300  | 267   | 446   | 1802  | 5277  |
| FPS                   | 40.7  | 21.4  | 10.4 | 5.7   | 39.1  | 11    | 1.6   | 0.6   |
| DOM Before Scroll     | 812   | 831   | 831  | 831   | 831   | 831   | 831   | 831   |
| DOM After Scroll      | 815   | 824   | 824  | 824   | 803   | 824   | 824   | 824   |
| Mem                   | 20.07 | 20.52 | 27.1 | 34.19 | 19.87 | 21.96 | 26.94 | 34.01 |
| Moving task time (ms) | 94	| 226	| 1490 | 7351  | 3810  | 4641  | 19415 | 54657 |
