# DHTMLX Gantt

## Prerequisites

PRO Gantt Trial v.7.1.9 not the Standard version under GPL https://docs.dhtmlx.com/gantt/desktop__editions_comparison.html

## Info

Default Date format: DD-MM-YYYY

Official Perf recommendations
https://docs.dhtmlx.com/gantt/desktop__performance.html

## Measure

Serve index.html from your web server and open the page in a Chrome browser version >89.

1. Open Chrome devtools
2. Open ... in Chrome

The console will show the results.

## Results

| Auto-scheduling       | OFF  |      |      |       | ON   |      |      |       |
|-----------------------|------|------|------|-------|------|------|------|-------|
| Nb Tasks              | 100  | 1000 | 5000 | 10000 | 100  | 1000 | 5000 | 10000 |
| TTR (ms)              | 149  | 207  | 609  | 948   | 159  | 243  | 912  | 1558  |
| FPS                   | 60   | 60.1 | 56.6 | 46    | 60.3 | 60   | 57.1 | 50.6  |
| DOM Before Scroll     | 926  | 926  | 926  | 926   | 926  | 926  | 926  | 926   |
| DOM After Scroll      | 773  | 773  | 773  | 773   | 773  | 773  | 773  | 773   |
| Mem                   | 5.03 | 9.4  | 29.3 | 51.9  | 5.11 | 9.39 | 27   | 44.9  |
| Moving task time (ms) | 7    | 30   | 80   | 136   | 36   | 95   | 255  | 401   |
