# JavaScript Gantt Chart performance comparison
A performance comparison of 5 popular JavaScript Gantt Chart components including:
* Webix 9.1.6, https://webix.com/gantt/
* DHTMLX 7.1.9, https://dhtmlx.com/docs/products/dhtmlxGantt/
* Bryntum 5.0.0, https://www.bryntum.com/products/gantt/
* DevExtreme 21.2.5, https://js.devexpress.com/Demos/WidgetsGallery/Demo/Gantt
* Syncfusion 19.4.0, https://ej2.syncfusion.com/documentation/gantt/

Not evaluated
* Kendo UI
* DlhSoft
* DayPilot
* Netronics

This benchmark measures:
* Initial rendering time (TTR) in ms
* Scroll performance (FPS)
* Number of DOM elements before and after scroll
* Memory consumption
* Time after moving a task with 100 successors along the time axis by 1 month (task id 3 -> 111)

In 2 configurations:
* With auto-scheduling off
* With auto-scheduling on

Number of tasks considered:
* 100
* 1000
* 5000
* 10000

## Conditions of evaluation
* 1 column for the task name and 1 column for the progress in form of a column template
* Selection and Edition activated
* All parent tasks expanded/open
* Virtualization activated when available
* Lenovo Thinkpad | AMD Ryzen 5 3500U with Radeon Vega Mobile Gfx 2.10 GHz 32.0 GB RAM | Windows 11 Pro v. 21H2
* Chrome Version 99.0.4844.51


