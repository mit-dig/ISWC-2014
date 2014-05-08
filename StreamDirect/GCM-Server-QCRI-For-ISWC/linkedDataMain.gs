/**
 *  Functions supporting communication with CSPARQL Engine
 */

function generateUUID() {
  var uuid = ("0000" + (Math.random()*Math.pow(36,5) << 0).toString(36)).substr(-6);
  var reg = db.query({uuid : uuid}).next();
  if(!reg) {
    return uuid; 
  } else {
    return generateUUID();
  }
};

/**
 * @param {String} parameter The parameter for the QUERY
 */ 
/**
function buildQuery(topic, lat, long, uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX sioc: <http://rdfs.org/sioc/ns#> " +
  "PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#> " +
  "CONSTRUCT { ?post a sioc:MicroblogPost; sioc:attachment ?attachment; sioc:description ?desc; sioc:topic ?topic. :uuid :is '" + uuid + "'. } " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 2s STEP 2s] " +
  "WHERE { ?post a sioc:MicroblogPost; sioc:attachment ?attachment; sioc:description ?desc; sioc:topic ?topic; <http://hxl.humanitarianresponse.info/ns/#atLocation> ?location. " +
  "?location geo:lat ?lat; geo:long ?long . " +
  "FILTER (str(?topic) = '" + topic +"') " +
  "FILTER( ( ((?lat-(" + lat + "))*(?lat-(" + lat + "))) < (0.1*0.1)) ) " +
  "FILTER( ( ((?long-(" + long + "))*(?long-(" + long + "))) < (0.1*0.1)) )" +
  "}";
  return querytext;
}
*/

/**
 * Building the query for the monitoring situation 
 */
//function buildQuery(topic, place, limit, uuid) {
//	  var querytext = "REGISTER QUERY " + uuid + " AS " +
//	  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
//	  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
//	  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
//	  "PREFIX sioc: <http://rdfs.org/sioc/ns#> " +
//	  "PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#> " +
//	  "SELECT (COUNT(?topic) AS ?"+uuid+") " +
//	  "FROM STREAM <http://ex.org/gcm> [RANGE 10s STEP 2s] "+
//	  "WHERE { ?post a sioc:MicroblogPost; sioc:attachment ?attachment; sioc:description ?desc; sioc:topic ?topic; :place ?place. "+ 
//	  "FILTER (str(?place) = '" + place + "' && str(?topic) = '" + topic +"')} "+
//	  "GROUP BY ?place " +
//	  "HAVING (COUNT(?topic) >= "+ limit+" ) ";
//	  return querytext;
//	}


/**
* Queries for running the LUBM tests
*/

function buildQuery1(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "CONSTRUCT { ?X rdf:type ub:GraduateStudent . " + 
    " ?X ub:takesCourse <http://www.Department0.University0.edu/GraduateCourse0>. " + 
    " :uuid :is '" + uuid + "'. } " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 20s STEP 20s] " +
  "WHERE { ?X rdf:type ub:GraduateStudent . ?X ub:takesCourse <http://www.Department0.University0.edu/GraduateCourse0>." +
  "}";
  return querytext;
}

function buildQuery2(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "CONSTRUCT { ?X rdf:type ub:GraduateStudent . " +
    " ?Y rdf:type ub:University . " +
    " ?Z rdf:type ub:Department . " +
    " ?X ub:memberOf ?Z . " +
    " ?Z ub:subOrganizationOf ?Y ." +
    " ?X ub:undergraduateDegreeFrom ?Y . " +
     " :uuid :is '" + uuid + "'. } " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 2s STEP 2s] " +
  "WHERE { ?X rdf:type ub:GraduateStudent . " +
    " ?Y rdf:type ub:University . " +
    " ?Z rdf:type ub:Department . " +
    " ?X ub:memberOf ?Z . " +
    " ?Z ub:subOrganizationOf ?Y ." +
    " ?X ub:undergraduateDegreeFrom ?Y ." +
  "}";
  return querytext;
}

function buildQuery3(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "CONSTRUCT { ?X rdf:type ub:Publication . " +
  " ?X ub:publicationAuthor " +
       " <http://www.Department0.University0.edu/AssistantProfessor0> . " + 
       " :uuid :is '" + uuid + "'. } " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 30s STEP 30s] " +
    " WHERE { ?X rdf:type ub:Publication . " +
  " ?X ub:publicationAuthor " +
       " <http://www.Department0.University0.edu/AssistantProfessor0> . " +
  "}";
  return querytext;
}

function buildQuery4(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "CONSTRUCT { ?X rdf:type ub:Professor . " +
    " ?X ub:worksFor <http://www.Department0.University0.edu> .  " +
     " ?X ub:name ?Y1 . " +
     " ?X ub:emailAddress ?Y2 .  " +
     " ?X ub:telephone ?Y3 . " +
      ":uuid :is '" + uuid + "'. } " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 2s STEP 2s] " +
  "WHERE { ?X rdf:type ub:Professor . " +
    " ?X ub:worksFor <http://www.Department0.University0.edu> .  " +
     " ?X ub:name ?Y1 . " +
     " ?X ub:emailAddress ?Y2 .  " +
       " ?X ub:telephone ?Y3 . } ";
  return querytext;
}

function buildQuery5(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "CONSTRUCT { ?X rdf:type ub:Person . " +
    " ?X ub:memberOf <http://www.Department0.University0.edu> . :uuid :is '" + uuid + "'. } " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 2s STEP 2s] " +
  "WHERE { ?X rdf:type ub:Person . " +
    " ?X ub:memberOf <http://www.Department0.University0.edu> ." +
  "}";
  return querytext;
}

function buildQuery6(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "CONSTRUCT { ?X rdf:type ub:Student . " +
    " :uuid :is '" + uuid + "'. } " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 2s STEP 2s] " +
  "WHERE { ?X rdf:type ub:Student . " +
  "}";
  return querytext;
}


function buildQuery7(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "CONSTRUCT { ?X rdf:type ub:Student . " +
  " ?Y rdf:type ub:Course .  " +
  " ?X ub:takesCourse ?Y . " +
  " <http://www.Department0.University0.edu/AssociateProfessor0> ub:teacherOf ?Y. :uuid :is '" + uuid + "'. } " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 2s STEP 2s] " +
  "WHERE { ?X rdf:type ub:Student . " +
  " ?Y rdf:type ub:Course .  " +
  " ?X ub:takesCourse ?Y . " +
  " <http://www.Department0.University0.edu/AssociateProfessor0> ub:teacherOf ?Y ." +
  "}";
  return querytext;
}

function buildQuery8(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "CONSTRUCT {  ?X rdf:type ub:Student . " + 
  " ?Y rdf:type ub:Department . " + 
  " ?X ub:memberOf ?Y .  " + 
  " ?Y ub:subOrganizationOf <http://www.University0.edu> .  " + 
  " ?X ub:emailAddress ?Z . :uuid :is '" + uuid + "'. } " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 2s STEP 2s] " +
  "WHERE { ?X rdf:type ub:Student . " + 
  " ?Y rdf:type ub:Department . " + 
  " ?X ub:memberOf ?Y .  " + 
  " ?Y ub:subOrganizationOf <http://www.University0.edu> . " + 
  " ?X ub:emailAddress ?Z ." +
  "}";
  return querytext;
}

function buildQuery9(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "CONSTRUCT {  ?X rdf:type ub:Student . " +
  " ?Y rdf:type ub:Faculty . " +
  " ?Z rdf:type ub:Course . " +
  " ?X ub:advisor ?Y . " +
  " ?Y ub:teacherOf ?Z . " +
  " ?X ub:takesCourse ?Z . :uuid :is '" + uuid + "'. } " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 2s STEP 2s] " +
  "WHERE { ?X rdf:type ub:Student . " +
  " ?Y rdf:type ub:Faculty . " +
  " ?Z rdf:type ub:Course . " +
  " ?X ub:advisor ?Y . " +
  " ?Y ub:teacherOf ?Z . " +
  " ?X ub:takesCourse ?Z ." +
  "}";
  return querytext;
}

function buildQuery10(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "CONSTRUCT { ?X rdf:type ub:Student . " +
  " ?X ub:takesCourse " +
   " <http://www.Department0.University0.edu/GraduateCourse0> . :uuid :is '" + uuid + "'. } " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 2s STEP 2s] " +
  "WHERE { ?X rdf:type ub:Student . " +
  " ?X ub:takesCourse " +
   " <http://www.Department0.University0.edu/GraduateCourse0> ." +
  "}";
  return querytext;
}

function buildQuery11(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "CONSTRUCT {  ?X rdf:type ub:ResearchGroup . " + 
  " ?X ub:subOrganizationOf <http://www.University0.edu> . :uuid :is '" + uuid + "'. } " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 2s STEP 2s] " +
  "WHERE { ?X rdf:type ub:ResearchGroup . " + 
  " ?X ub:subOrganizationOf <http://www.University0.edu> ." +
  "}";
  return querytext;
}

function buildQuery12(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "CONSTRUCT { ?X rdf:type ub:Chair . ?Y rdf:type ub:Department . ?X ub:worksFor ?Y . "+
  " ?Y ub:subOrganizationOf <http://www.University0.edu> . " +
  " :uuid :is '" + uuid + "'. } " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 2s STEP 2s] " +
  "WHERE { ?X rdf:type ub:Chair . ?Y rdf:type ub:Department . ?X ub:worksFor ?Y . "+
  " ?Y ub:subOrganizationOf <http://www.University0.edu> . " +
  "}";
  return querytext;
}

function buildQuery13(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "CONSTRUCT { ?X rdf:type ub:Person . <http://www.University0.edu> ub:hasAlumnus ?X . " +
  " :uuid :is '" + uuid + "'. } " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 2s STEP 2s] " +
  "WHERE {?X rdf:type ub:Person . <http://www.University0.edu> ub:hasAlumnus ?X . }";
  return querytext;
}


function buildQuery14(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "CONSTRUCT { ?X rdf:type ub:UndergraduateStudent . :uuid :is '" + uuid + "' . } " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 30s STEP 30s] " +
    "WHERE { ?X rdf:type ub:UndergraduateStudent . }" ;
  return querytext;
}

function buildQuery1a(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "SELECT (COUNT(?X) AS ?" + uuid + " ) " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 30s STEP 30s] " +
  "WHERE { ?X rdf:type ub:GraduateStudent . ?X ub:takesCourse <http://www.Department0.University0.edu/GraduateCourse0>." +
  "}";
  return querytext;
}



function buildQuery2a(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "SELECT (COUNT(?X) AS ?" + uuid + " ) " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 2s STEP 2s] " +
  "WHERE { ?X rdf:type ub:GraduateStudent . " +
    " ?Y rdf:type ub:University . " +
    " ?Z rdf:type ub:Department . " +
    " ?X ub:memberOf ?Z . " +
    " ?Z ub:subOrganizationOf ?Y ." +
    " ?X ub:undergraduateDegreeFrom ?Y ." +
  "}";
  return querytext;
}

function buildQuery3a(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "SELECT (COUNT(?X) AS ?" + uuid + ") " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 30s STEP 30s] " +
    " WHERE { ?X rdf:type ub:Publication . " +
  " ?X ub:publicationAuthor " +
       " <http://www.Department0.University0.edu/AssistantProfessor0> . " +
  "}";
  return querytext;
}

function buildQuery4a(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "SELECT (COUNT(?X) AS ?uuid) " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 2s STEP 2s] " +
  "WHERE { ?X rdf:type ub:Professor . " +
    " ?X ub:worksFor <http://www.Department0.University0.edu> .  " +
     " ?X ub:name ?Y1 . " +
     " ?X ub:emailAddress ?Y2 .  " +
       " ?X ub:telephone ?Y3 . } ";
  return querytext;
}

function buildQuery5a(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "SELECT (COUNT(?X) AS ?uuid) " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 2s STEP 2s] " +
  "WHERE { ?X rdf:type ub:Person . " +
    " ?X ub:memberOf <http://www.Department0.University0.edu> ." +
  "}";
  return querytext;
}

function buildQuery6a(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "SELECT (COUNT(?X) AS ?uuid) " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 2s STEP 2s] " +
  "WHERE { ?X rdf:type ub:Student . " +
  "}";
  return querytext;
}


function buildQuery7a(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "SELECT (COUNT(?X) AS ?uuid) " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 2s STEP 2s] " +
  "WHERE { ?X rdf:type ub:Student . " +
  " ?Y rdf:type ub:Course .  " +
  " ?X ub:takesCourse ?Y . " +
  " <http://www.Department0.University0.edu/AssociateProfessor0> ub:teacherOf ?Y ." +
  "}";
  return querytext;
}

function buildQuery8a(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "SELECT (COUNT(?X) AS ?uuid) " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 2s STEP 2s] " +
  "WHERE { ?X rdf:type ub:Student . " + 
  " ?Y rdf:type ub:Department . " + 
  " ?X ub:memberOf ?Y .  " + 
  " ?Y ub:subOrganizationOf <http://www.University0.edu> . " + 
  " ?X ub:emailAddress ?Z ." +
  "}";
  return querytext;
}

function buildQuery9a(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "SELECT (COUNT(?X) AS ?uuid) " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 2s STEP 2s] " +
  "WHERE { ?X rdf:type ub:Student . " +
  " ?Y rdf:type ub:Faculty . " +
  " ?Z rdf:type ub:Course . " +
  " ?X ub:advisor ?Y . " +
  " ?Y ub:teacherOf ?Z . " +
  " ?X ub:takesCourse ?Z ." +
  "}";
  return querytext;
}

function buildQuery10a(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "SELECT (COUNT(?X) AS ?uuid) " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 2s STEP 2s] " +
  "WHERE { ?X rdf:type ub:Student . " +
  " ?X ub:takesCourse " +
   " <http://www.Department0.University0.edu/GraduateCourse0> ." +
  "}";
  return querytext;
}

function buildQuery11a(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "SELECT (COUNT(?X) AS ?uuid) " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 2s STEP 2s] " +
  "WHERE { ?X rdf:type ub:ResearchGroup . " + 
  " ?X ub:subOrganizationOf <http://www.University0.edu> ." +
  "}";
  return querytext;
}

function buildQuery12a(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "SELECT (COUNT(?X) AS ?uuid) " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 2s STEP 2s] " +
  "WHERE { ?X rdf:type ub:Chair . ?Y rdf:type ub:Department . ?X ub:worksFor ?Y . "+
  " ?Y ub:subOrganizationOf <http://www.University0.edu> . " +
  "}";
  return querytext;
}

function buildQuery13a(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "SELECT (COUNT(?X) AS ?uuid) " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 2s STEP 2s] " +
  "WHERE {?X rdf:type ub:Person . <http://www.University0.edu> ub:hasAlumnus ?X . }";
  return querytext;
}


function buildQuery14a(uuid) {
  var querytext = "REGISTER STREAM " + uuid + " AS " +
  "PREFIX : <http://streamreasoning.org/ontologies/sr4ld2013-onto#> " +
  "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
  "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
  "PREFIX ub: <http://dig.csail.mit.edu/onto#> " +
  "SELECT (COUNT(?X) AS ?" + uuid + " ) " +
  "FROM STREAM <http://ex.org/gcm> [RANGE 30s STEP 30s] " +
    "WHERE { ?X rdf:type ub:UndergraduateStudent . }" ;
  return querytext;
}


function putRequest(querytext, serverUrl) {
  var urlFetchOptions =  
     {'method' : 'put',
      'payload' : querytext,
      'headers' : {
        'Cache-Control' : 'no-cache'
      },
      'muteHttpExceptions': true,
     };
  return UrlFetchApp.fetch(serverUrl,urlFetchOptions);
}

function postRequest(payload, serverUrl) {
  var urlFetchOptions =  
     {'method' : 'post',
      'payload' : payload,
      'headers' : {
        'Cache-Control' : 'no-cache'
      },
      'muteHttpExceptions': true,
     };
  return UrlFetchApp.fetch(serverUrl,urlFetchOptions);
}

function deleteRequest(serverUrl) {
  var urlFetchOptions =  
     {'method' : 'delete',
      'headers' : {
        'Cache-Control' : 'no-cache'
      },
      'muteHttpExceptions': true,
     };
  return UrlFetchApp.fetch(serverUrl,urlFetchOptions);
}

function parseResult(result) {
  for (var key in result) {
    var topic = result[key]["http://rdfs.org/sioc/ns#topic"][0].value;
    var description = result[key]["http://rdfs.org/sioc/ns#description"][0].value;
    var image = result[key]["http://rdfs.org/sioc/ns#attachment"][0].value;
  }
  var output = 'result,' + topic + ',' + image + ',' + description;
  //MyLog("parseResult", "var output", output);
  return output;
}

function deleteOldUUID(regId) {
  // find and delete old entries
  var entries = db.query({"regId": regId});
  while (entries.hasNext()) {
    var current = entries.next();
    if (current["uuid"] != undefined) {
      db.remove(current);
      var queryurl = SERVER_URL + current["uuid"];
      var response = deleteRequest(queryurl);
    }
  }
}

function addNewUUID(regId, new_uuid,query_id) {
  // save new entry
  db.save({"regId" : regId,
           "uuid" : new_uuid,
           "queryId" : query_id
  });
}