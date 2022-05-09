import { RenderTimer, FPS, Scroller, countDOMNodes } from '../util/util.js';

async function init() {

    const nbTasks=1000; //Should be 100, 1000,5000 or 10000
    const lineHeight=36;
    const autoSchedule=true;

    const ttrOnly=false;

    const responseTasks = await fetch(`./data/${nbTasks}-tasks-devextreme.json`);
    const responseDeps = await fetch(`./data/${nbTasks}-deps-devextreme.json`);
    
    const jsonTasks = await responseTasks.json();
    const jsonDeps = await responseDeps.json();

    const config = {
        columns: [{
            dataField: "title",
            caption: "Name",
            width: 160
        },
        {
            dataField : 'progress',
            caption : 'Progress',
            width : 120,
            cellTemplate(element, info) {
                element.append(`
                <div style="
                    width : ${info.text}%; 
                    background-color: blue; 
                    height : 3px;
                    position: absolute;
                    top: 0;
                    left :0;
                    "></div>
                ${Math.round(info.text)}
                `).css('position', 'relative');
            }
        }],
        allowSelection : true,
        editing: {
            enabled: true
        },
        tasks: {
            dataSource: jsonTasks    
        },
        dependencies: {
            dataSource: jsonDeps
        }
    }

    if (autoSchedule===true){
        config.validation = {
            autoUpdateParentTasks: true,
            validateDependencies: true,
            enablePredecessorGap: true
        }
    }


    new RenderTimer().start({
        operationName: 'Rendering Time',
        sync: false,
        callback(renderTimer) {
            const gantt = $("#container").dxGantt({
                onContentReady: function(){
                    renderTimer.stop();
                    if (!ttrOnly){
                        setTimeout(() => {
                            FPS.start();
                            console.log("After scroll, the document is composed of "+countDOMNodes()+" nodes.");
                            Scroller.scroll({
                                element: document.querySelector(".dx-scrollable-container"),
                                distance:nbTasks*lineHeight,
                                callback() {
                                    FPS.stop();
                                    postFPS();  
                                }
                            });
                        }, 1000);
                    }
                },
                ...config
            });
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
            document.querySelector(".dx-scrollable-container").scrollTop=0;

            $("#container").dxGantt("instance").updateTask(3, {start: new Date("02-02-2022"),end: new Date("02-06-2022")});//MOVE FIRST TASK (EXC PARENT) 1 MONTH IN THE FUTURE
            
        }
    });
}                       

init();