
import { RenderTimer, FPS, Scroller, countDOMNodes } from '../util/util.js';

async function init() {

    const nbTasks=100; //Should be 100, 1000,5000 or 10000
    const lineHeight=36; 
    const autoSchedule=false;

    const ttrOnly=false;

    const responseTasks = await fetch(`./data/${nbTasks}-tasks-and-deps-syncfusion.json`);
    
    const json = await responseTasks.json();

    ej.gantt.Gantt.Inject(ej.gantt.Edit,ej.gantt.Selection);//See https://ej2.syncfusion.com/documentation/api/gantt/#editmodule

    const config = {
        dataSource: json,
        taskFields: {
            id: 'id',
            name: 'name',
            startDate: 'startDate',
            endDate: 'endDate',
            progress: 'progress',
            duration: 'duration',
            dependency: 'dependency',
            child: 'subtasks'
        },

        enableVirtualization: true,//virtual scrolling NEEDED or you never get anything
       
        height: '1024px',
        columns: [
            { field: 'id', headerText: 'ID'},//REQUIRED OR EDITION IS NOT POSSIBLE
            { field: 'name', headerText: 'Name', width: '160' },
            { field: 'progress', headerText: 'Progress', width: '120', template: '#progress-template'}//See index.html
        ],
        splitterSettings:{position:"400px"},
        editSettings:{
			allowEditing:true
		}
    }

    if (autoSchedule===false){
        config.taskMode = 'Manual';//default auto https://ej2.syncfusion.com/react/demos/gantt/taskMode/
    }
    
    

    new RenderTimer().start({
        operationName: 'Rendering Time',
        sync: false,//Syncfusion Gantt rendering is async
        callback(renderTimer) {
            var gantt = new ej.gantt.Gantt({
                /*It is "created" and not "create" contrary to the docs https://help.syncfusion.com/api/js/ejgantt#events:create
                And it doesn't trigger when the Gantt is completely rendered
                created: function (args) {
                    debugger;
                },*/
                // Best way I found to detect "approximately" the end of the rendering
                // As soon as the screen displays as many rows as can fit in height
                //
                rowDataBound: function ({data}) {

                    if (data.id>19){
                        renderTimer.stop();
                    }
                },
                ...config
            });
            
            gantt.appendTo('#gantt');
            if (!ttrOnly){
                setTimeout(() => {
                    FPS.start();
                    console.log("After scroll, the document is composed of "+countDOMNodes()+" nodes.");
                    Scroller.scroll({
                        element: document.querySelector('.e-chart-scroll-container'),
                        distance:nbTasks*lineHeight,
                        callback() {
                            FPS.stop();
                            postFPS();
                        }
                    });
                }, 10000);
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
        sync:false,
        callback(renderTimer) {
            
            gantt.ej2_instances[0].setScrollTop(0);//SCROLL TO TOP TO SEE IT

            gantt.ej2_instances[0].addEventListener('actionComplete', function ({requestType}) {
                if (requestType==='save'){
                    renderTimer.stop();
                }
            });

            var record = gantt.ej2_instances[0].getRecordByID(3);
            record.startDate="2022-02-02";
            record.endDate="2022-02-06";
            gantt.ej2_instances[0].updateRecordByID({...record});
            
        }
    });
}            

init();