import { RenderTimer, FPS, Scroller, countDOMNodes } from '../util/util.js';

const nbTasks=10000; //Should be 100, 1000,5000 or 10000
const rt=new RenderTimer();

//https://docs.webix.com/gantt__howto.html#addingcolumnstoprojecttree
class CustomTree extends gantt.views.tree {
    config() {
      const ui = super.config();
   
      ui.columns[0].header= "Name";
      ui.columns[0].width=160;

      ui.columns.splice(1,1);

      ui.columns.splice(1,0,{
        id:"progress",
        header:"Progress",
        template:`
        <div style="
            width : #progress*100#; 
            background-color: blue; 
            height : 3px;
            top: 0;
            left :0;
            "></div>#progress*100#`,
        width:120
      });


      return ui;
    }
  }

async function init() {

    //WARNING, the value of nbTasks doesn't change data automatically, they have to be copied from data files to links and task json files
    
    const lineHeight=42; 

    const ttrOnly=false;

    
    rt.start({
        operationName: 'Rendering Time',
        sync: false,
        callback(renderTime) {
            webix.ui({
                
                view:"gantt",
                id: "myGantt",
                container:"container",
                override: new Map([[gantt.views.tree, CustomTree]]),
                scales: [
                    { unit: "month", step: 1, format: "%M"},
                    { unit: "day", step: 1, format: "%d" }
                ],
                url: "http://localhost/webix/data/",
                on:{
                    onInit: function() {
                        if (!ttrOnly){

                            requestAnimationFrame(step);

                            //renderTime.stop();
                            setTimeout(() => {
                                FPS.start();
                                console.log("After scroll, the document is composed of "+countDOMNodes()+" nodes.");
                                Scroller.scroll({
                                    element: document.querySelector(".webix_ss_vscroll"),
                                    distance:nbTasks*lineHeight,
                                    callback() {
                                        FPS.stop();
                                        postFPS();  
                                    }
                                });
                            }, 1000);
                        }
                    }
                }
            });
        }
    });
}

//There is no native event in Webix appropriate to trigger the end of TTR
//So we will be looking for the moment the last task is displayed on the screen.
//This is done every animation frame so this has a cost that might not be negligible.
function step(timestamp) {
    var lastTask=document.querySelector('div[aria-rowindex="'+nbTasks+'"');
    
    if (lastTask) {
        rt.stop();
        return;
    }
    requestAnimationFrame(step);
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
            document.querySelector(".webix_ss_vscroll").scrollTop = 0;
            const tasks = $$("myGantt").getService("local").tasks(); 
            tasks.waitData.then(function(){
                let task=tasks.getItem(3);
                task.start_date=new Date(2022,1,2);//
                task.end_date=new Date(2022,1,6);//
                tasks.refresh();
                //But of course because there is no auto-schedule it doesn't make dependend tasks to move
                //there is not so much to do so it doesn't take time 
            });
        }
    });
}         

init();