let award_detail=(function(){
    let modal=document.getElementById("myModal");
    let award_modal_detail={};
    let award_name=[];
     function dataget(){
         return fetch('assets/awards/awards.json').then(response => response.json()); 
     }
     
     function ProcessData(awardData){
        return new Promise((resolve,reject)=>{
            let awardmodalData=[];
                for(sampleData in awardData){
                    award_name.push(awardData[sampleData].Name);
                    awardmodalData.push({
                        name:awardData[sampleData].Name,
                        url:awardData[sampleData].vdurl,
                        rname:awardData[sampleData].Realname
                    })
                }
                award_modal_detail.data=awardmodalData;
                resolve(awardmodalData);
        })  
     }

      function clearElement(ele){
          while(ele.firstChild)
                ele.removeChild(ele.firstChild);
      } 
     function formatModalDetails(awardobject){
           let modalDataContent=document.getElementsByClassName("modal-detail")[0];
           let modalDataHead=document.getElementsByClassName("modal-head")[0];
           clearElement(modalDataContent);
           clearElement(modalDataHead);
             let vid=document.createElement("video");
             vid.setAttribute("width","auto");
             vid.setAttribute("height","500px");
             vid.setAttribute("id","myvideo");
             vid.setAttribute("controls","");
             vid.setAttribute("autoplay","");
             vid.setAttribute("type","video/webm")
             let souc=document.createElement("source");
             souc.setAttribute("src",awardobject.url);
             vid.appendChild(souc);
             modalDataContent.appendChild(vid);
             let header=document.createElement("h2");
             header.setAttribute("color","white");
             header.innerText=awardobject.rname;
             modalDataHead.appendChild(header);

     }
       
     function setUpDOMforlist(awardlistdata){
                awardlistdata.forEach(setlisthandler);

     }
     function setlisthandler(singleawarddata){
        let createmodalcontent=document.getElementsByClassName("flex-bo")[0];
        let listcreation=document.createElement("li");
         listcreation.setAttribute("class","award-list");
         listcreation.innerText=singleawarddata.name;
         awardlinkhandler=createlinkhandlerforawards(singleawarddata);
         listcreation.addEventListener('click',awardlinkhandler);
         createmodalcontent.appendChild(listcreation);

     }
     function createlinkhandlerforawards(singleawarddata){
           return function(event){
               formatModalDetails(singleawarddata);
            let modalWholeData=document.getElementById("myModal");
            modalWholeData.style.display="block";
           }
     }
    function init(){
          dataget().then(ProcessData).then(setUpDOMforlist);
    }
    init();
          return{
              init
          }
})();