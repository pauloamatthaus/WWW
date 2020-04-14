const url = "https://covid19-brazil-api.now.sh/api/report/v1";

window.onload = function() {
    getCases();
}

function getCases(){

    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';
    request.send();

    request.onload = function(){
        let cases = request.response;

        showCases(cases);          
     }

}

function showCases(cases) {
    let tamanho = cases.data.length;
    
    for(var i = 0; i < tamanho; i++){
        let caso = {
            estado: cases.data[i].state,
            casos: cases.data[i].cases,
            mortos: cases.data[i].deaths,
            suspeito:cases.data[i].suspects,
            naoconfirmado: cases.data[i].refuses
        }
      createTableElement(caso);    
      
        
    }

}

function createTableElement(caso){
    $("#cases_table").append("<tr>");

       let object_keys = Object.keys(caso);
       console.log(object_keys);

       for(let i = 0; i < object_keys.length; i++){
            let currentKey = object_keys[i];

            if(currentKey === "estado"){

                $("#cases_table").append("<td>" + caso[currentKey] + "</td>");
                
            }if(currentKey === "casos"){
                $("#cases_table").append("<td>" + caso[currentKey] + "</td>");
            }  
            if(currentKey === "mortos"){
                $("#cases_table").append("<td>" + caso[currentKey] + "</td>");
            }
            if(currentKey === "suspeito"){
                $("#cases_table").append("<td>" + caso[currentKey] + "</td>");
            }if(currentKey === "naoconfirmado"){
                $("#cases_table").append("<td>" + caso[currentKey] + "</td>");
            }
            


       }

    $("#user_table").append("</tr>");
}