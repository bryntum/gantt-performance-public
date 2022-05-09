import { RenderTimer, FPS, Scroller, countDOMNodes } from '../util/util.js';

async function init() {

    const nbTasks=100; //Should be 100, 1000,5000 or 10000
    const lineHeight=35; 
    const autoSchedule=false;

    const ttrOnly=false;

    window.autoSchedule=autoSchedule;

    const responseTasks = await fetch(`./data/${nbTasks}-tasks-and-deps-dhtmlx.json`);
    
    const json = await responseTasks.json();

    new RenderTimer().start({
        operationName: 'Rendering Time',
        callback() {
            gantt.config.columns=[
                {name:"text", label:"Name", tree:true, width:200 },
                {
                    name : 'progress', label: 'Progress', width : 120, 
                    template:function(obj){
                        return `
                        <div style="
                            width : ${obj.progress*100}%;
                            background-color: blue;
                            height : 3px;
                            top: 0;
                            left :0;
                            "></div>
                        ${Math.round(obj.progress*100)}
                        `;
                    }
                },
            ];
            gantt.config.start_date = new Date(2022, 0, 1);
            gantt.config.end_date = new Date(2022, 11, 31);

            if (autoSchedule===true){
                gantt.plugins({
                    auto_scheduling: true
                });
                gantt.config.auto_scheduling = true;
            }

            gantt.init("container");
            gantt.parse(json);

            if (!ttrOnly){
                setTimeout(() => {
                    FPS.start();
                    console.log("Before scroll, the document is composed of "+countDOMNodes()+" nodes.");
                    Scroller.scroll({
                        element: document.querySelector('.gantt_ver_scroll'),
                        distance:nbTasks*lineHeight,
                        callback() {
                            FPS.stop();
                            postFPS();
                        }
                    });
                }, 1000);
            }
        }
    });
}

function postFPS(){
    //COUNT DOM NODES
    console.log("After scroll, the document is composed of "+countDOMNodes()+" nodes.");

    shiftTaskOnTimeLine();
}

function shiftTaskOnTimeLine(){
    new RenderTimer().start({
        operationName: 'Shifting Task Time',
        callback() {
            document.querySelector('.gantt_ver_scroll').scrollTop = 0;//SCROLL TO TOP TO SEE IT
            //MOVE FIRST TASK (EXC PARENT) 1 MONTH IN THE FUTURE
            let task=gantt.getTask(3);
            task.start_date = gantt.date.add(task.start_date, 1, "month");//1 month in the future
            task.end_date = gantt.calculateEndDate(task.start_date, task.duration);
            gantt.updateTask(task.id); //renders the updated task
            
            if (window.autoSchedule===true){
                //If Auto Scheduling required, autoSchedule needs to be called to recalculate subsequent links
                gantt.autoSchedule(task.id);
            }

        }
    });
}

init();