import { Gantt, ProjectModel } from './js/gantt.module.js';
import { RenderTimer, FPS, Scroller, countDOMNodes } from '../util/util.js';


async function init() {

    const nbTasks=100; //Should be 100, 1000,5000 or 10000
    const lineHeight=46; 
    const autoSchedule=false;

    const ttrOnly=false;

    const responseTasks = await fetch(`./data/${nbTasks}-tasks.json`);
    const responseDeps = await fetch(`./data/${nbTasks}-deps.json`);
    
    const jsonTasks = await responseTasks.json();
    const jsonDeps = await responseDeps.json();

    if (autoSchedule===false){
        var dummyCalculations = {
            project : {
                endDate : 'userProvidedValue'
            },
            // Disable task percentDone, startDate, endDate and duration fields automatic calculation
            tasks : {
                percentDone : 'userProvidedValue',
                startDate   : 'userProvidedValue',
                endDate     : 'userProvidedValue',
                duration    : 'userProvidedValue'
            }
        };
    }

    new RenderTimer().start({
        operationName: 'Rendering Time',
        callback() {
            window.gantt = new Gantt({
                appendTo : 'container',

                // UNCOMMENT FEATURES TO TURN OFF to match other components active features
                features : {
                    //cellEdit       : false,
                    //projectLines   : false,
                    //taskCopyPaste  : false,
                    //taskDragCreate : false,
                    //taskMenu       : false,
                    //taskResize     : false,
                    //taskToolTip    : false
                },
                startDate : '2022-01-02T11:00:00Z',

                project : {
                    taskStore : {
                        data       : jsonTasks
                    },
                    dependencyStore : {
                        data       : jsonDeps
                    }
                },
                columnLines : false,

                columns : [
                    { type: 'name', field : 'name', text : 'Name', width : 160 },
                    {
                        field      : 'percentDone',
                        text       : 'Progress',
                        width      : 120,
                        htmlEncode : false,
                        //autoSyncHtml : true,
                        renderer({ value }) {
                            return `
                            <div style="
                                width : ${value}%; 
                                background-color: blue; 
                                height : 3px;
                                position: absolute;
                                top: 0;
                                left :0;
                                "></div>
                            ${Math.round(value)}
                            `;
                        }
                    },
                ],
                
            });

            if (autoSchedule===false){
                gantt.project.setCalculations(dummyCalculations);
            }
            if (!ttrOnly){
                setTimeout(() => {
                    FPS.start();
                    console.log("After scroll, the document is composed of "+countDOMNodes()+" nodes.");
                    Scroller.scroll({
                        element: window.gantt.bodyContainer,
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

            window.gantt.bodyContainer.scrollTop = 0;//SCROLL TO TOP TO SEE IT
            var record=window.gantt.project.taskStore.findRecord('id',3);
            record.startDate="2022-02-02";//MOVE FIRST TASK (EXC PARENT) 1 MONTH IN THE FUTURE
            record.endDate="2022-02-06";//MOVE FIRST TASK (EXC PARENT) 1 MONTH IN THE FUTURE
        }
    });
}                        

init();