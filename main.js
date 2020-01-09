// fetching issues from local storage if existed

function fetchIssues(){
    let issues = JSON.parse(localStorage.getItem('issues'));
    let issuesList = document.getElementById("issuesList");
    

    issuesList.innerHTML = '';

    for( let i = 0; i < issues.length; i++){
        let id=issues[i].id;
        
        let desc = issues[i].description;
        let severity = issues[i].severity;
        let assignedTo = issues[i].assignedTo;
        let status = issues[i].status;
       

        // for hiding or showing close button 
        let closeButtonHTML =''; 
        if(status =='Open'){
            closeButtonHTML = '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> ';

        }else {

            closeButtonHTML = '';
        }
         // exporting list to html
        issuesList.innerHTML += '<div class="well">'+
        '<h6>Issue ID: ' + id + '</h6>'+
        '<p><span class="label label-info">' + status + '</span></p>'+
        '<h3>' + desc + '</h3>'+
        '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' '+
        '<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+closeButtonHTML
        +
        '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
        '</div>';

    }

}

// submitting issue

document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e){
        
 
    let issueId=chance.guid(); // generating unique ID 
    let issueDesc = document.getElementById('issueDescInput').value;
    let issueSeverity = document.getElementById('issueSeverityInput').value;
    let issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    let issueStatus ="Open";

    // issue list object
    let issue={
        id:issueId,
        description:issueDesc,
        severity:issueSeverity,
        assignedTo:issueAssignedTo,
        status:issueStatus
    }
    console.log(`Issue ID : ${issueId}, description : ${issueDesc} severity: ${issueSeverity} assigned to : ${issueAssignedTo} status=${issueStatus}`);
    //adding to local storage on submit

    if(localStorage.getItem('issues') === null){
        let issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else{
        let issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    
    }

    document.getElementById('issueInputForm').reset(); // reset the input form on submit
    
    fetchIssues(); // load the function after submit
    e.preventDefault();

    

}

// deleting issue
 function deleteIssue(id){
     let issues = JSON.parse(localStorage.getItem('issues'));

     for ( let i = 0; i<issues.length;i++){
        if(issues[i].id==id){
            issues.splice(i,1);

        }
     }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();


 }

 // set status to close 

 function setStatusClosed(id){

    let issues = JSON.parse(localStorage.getItem('issues'));
    for ( let i=0; i<issues.length; i++){
        if(issues[i].id == id){
            issues[i].status ="Closed";
        }

    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
 }