public class SFSJsonCallOut {
    
    // Pass in the endpoint to be used using the string url
	@AuraEnabled
    public static List<Object> getCalloutResults() {
        //get EndPoint
        String endPoint ='https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json';
        
        // Instantiate a new http object
		Http h = new Http();
 
		// Instantiate a new HTTP request, specify the method (GET) as well as the endpoint
		HttpRequest req = new HttpRequest();
		req.setEndpoint(endPoint);
		req.setMethod('GET');
 
		// Send the request, and return a response
		HttpResponse res = h.send(req);
		System.debug('response:--> ' + res.getBody());
              
        return (List<Object>)Json.deserializeUntyped(res.getBody());
    }
}