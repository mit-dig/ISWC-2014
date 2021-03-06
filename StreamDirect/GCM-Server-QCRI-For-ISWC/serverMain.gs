function doGet() {
  return HtmlService.createHtmlOutputFromFile('serverUI');
}

function doPost(eventInfo) {
  if(eventInfo.parameter.type === 'subscribe'){
    // construct the query and register it with CSPARQL 
    // 1. build query using the parameters, inserting a generated UUID into the query and local DB <UUID, regId>
    var uuid = generateUUID();
   
    var querytext = '';
    if(eventInfo.parameter.queryId == 1){
      querytext = buildQuery1(uuid);
      
    } else if(eventInfo.parameter.queryId == 2){
      querytext = buildQuery2(uuid);
      
    } else if(eventInfo.parameter.queryId == 3){
      querytext = buildQuery3(uuid);
      
    } else if(eventInfo.parameter.queryId == 4){
      querytext = buildQuery4(uuid);
      
    } else if(eventInfo.parameter.queryId == 5){      
      querytext = buildQuery5(uuid);
      
    } else if(eventInfo.parameter.queryId == 6){ 
      querytext = buildQuery6(uuid);
      
    } else if(eventInfo.parameter.queryId == 7){
      querytext = buildQuery7(uuid);
      
    } else if(eventInfo.parameter.queryId == 8){
      querytext = buildQuery8(uuid);
      
    } else if(eventInfo.parameter.queryId == 9){
      querytext = buildQuery9(uuid);
      
    } else if(eventInfo.parameter.queryId == 10){
      querytext = buildQuery10(uuid);
      
    } else if(eventInfo.parameter.queryId == 11){
      querytext = buildQuery11(uuid);
      
    } else if(eventInfo.parameter.queryId == 12){      
      querytext = buildQuery12(uuid);
      
    } else if(eventInfo.parameter.queryId == 13){      
      querytext = buildQuery13(uuid);
      
    } else if(eventInfo.parameter.queryId == 14){   
      querytext = buildQuery14(uuid);
    }
    
    //var querytext = buildQuery(eventInfo.parameter.topic, eventInfo.parameter.location, eventInfo.parameter.trigger, uuid);
    //MyLog("queryText", "querytext", querytext);
     
   // Delete old uuids associated with the regId with the same topic, since those are no longer valid
    // Then add the new uuid with the regId
    deleteOldUUID(eventInfo.parameter.regId);
    addNewUUID(eventInfo.parameter.regId, uuid, eventInfo.parameter.queryId);
    
    // 2. putting to the CSPARQL engine
    var serverUrl = SERVER_URL + uuid;
    var response = putRequest(querytext, serverUrl);
    
    // 3. register this GCM server as an observer for the query
    var payload = GCM_SERVER_URL;
    var response = postRequest(payload, serverUrl);
    
    //MyLog("postRequest", "var response", response.getResponseCode());
    if (response.getResponseCode() == 200) {
      sendGCM2One(eventInfo.parameter.regId, 'subscribe,true'+','+uuid);
    } else {
      sendGCM2One(eventInfo.parameter.regId, 'subscribe,false'+','+uuid);
    }
    
  } else if(eventInfo.parameter.regId) {
    processReg(eventInfo);
   
  } else if(eventInfo.parameter.type === 'sendAll'){
	// TODO authentication to make sure device is registered 
	sendGCM2All(eventInfo.parameter.gcmMessage);
    //MyLog("GCM", "test", eventInfo.parameter.gcmMessage);
   
  } else if (eventInfo.postData.contents){  // sends CSPARQL results out
    var contents = JSON.parse(eventInfo.postData.contents);
    //MyLog("CSPARQL", "var contents", contents);
    // Check if the results contain a UUID
    
    var firstLevel = contents['http://streamreasoning.org/ontologies/sr4ld2013-onto#uuid']; 
    //MyLog("CSPARQL", "var firstLevel", firstLevel);
    if (firstLevel!= undefined) {
    	var uuid = firstLevel['http://streamreasoning.org/ontologies/sr4ld2013-onto#is'][0]['value'];
    	//MyLog("CSPARQL", "var uuid", uuid);
    	delete contents['http://streamreasoning.org/ontologies/sr4ld2013-onto#uuid'];
    	//MyLog("CSPARQL", "var contents after deletion", contents);
    	processResult(uuid, contents);
    }

    //For processing results from aggregate queries
    //    var contents = JSON.parse(eventInfo.postData.contents);
    //    var uuid = contents.head.vars[0];
    //    var val = contents.results.bindings[0][uuid].value;
    //    //MyLog("CSPARQL", "var uuid, var val", uuid +"\n"+val);
    //   processResult(uuid, val);    
 }
  
 var app = UiApp.getActiveApplication();
 return app;
}

function processReg(eventInfo) {  
  var reg = db.query({regId : eventInfo.parameter.regId}).next();
  if(reg && eventInfo.parameter.type === 'unregister'){
    db.remove(reg);
    Logger.log("Removed the given registration id.");
  } else if(!reg && eventInfo.parameter.type === 'register'){
     db.save(eventInfo.parameter);
     Logger.log("Registered the given registration id.");
  }
}


function testProcessResult() {
  processResult('0323sb','how are you doing?');
}

function processResult(uuid, result) {
  var entries = db.query({"uuid" : uuid});
  //MyLog("processResult", "var entries", entries);
  var devices = [];
  while (entries.hasNext()) {
	  var current = entries.next();
	  devices.push(current.regId);
  }
  //MyLog("processResult", "var devices", devices);
  if (devices.length != 0) {
    sendGCM(devices, GCM_MESSAGE_PLAYLOAD_KEY, 'result,'+result+','+uuid);
  }
}

function testSaveGroups() {
  var devices =[];
  Logger.log(devices.length != 0);
}

/**
 * @param {String} functionName The name of the function when the log is generated
 * @param {String} tag The tag for the log
 * @param {String} msg Log message
 */ 
function MyLog(fuctionName, tag, msg){
  // replace LOGGING_SPREADSHEET_ID with a the id of a spreadsheet you own
  var debugSpreadSheetId = "";
  var gSS = SpreadsheetApp.openById(debugSpreadSheetId);
  var sheet = gSS.getSheetByName('Sheet1');
  var rowToInsert = sheet.getLastRow() + 1;
  
  var cellLocationFunc = 'A' + rowToInsert;
  var cellLocationTag = 'B' + rowToInsert;
  var cellLocationMsg = 'C' + rowToInsert;
  var cellLocationTimestamp = 'D' + rowToInsert;
  
  
  var lock = LockService.getPrivateLock();
  lock.waitLock(2000);
  sheet.getRange(cellLocationFunc).setValue(fuctionName);
  sheet.getRange(cellLocationTag).setValue(tag);
  sheet.getRange(cellLocationMsg).setValue(msg);
  var time = new Date();
  var logTime = Utilities.formatDate(time, 'EST', "yyyy-MM-dd HH:mm:ss");
  sheet.getRange(cellLocationTimestamp).setValue(logTime);
  lock.releaseLock();

}

function collapse(){
  var results = db.query({"queryId":db.anyValue()});
  while(results.hasNext()){
  
    var queryEntry = results.next();
    queryEntry.uuid = '0smjs2';
    db.save(queryEntry);
  }
  


}

