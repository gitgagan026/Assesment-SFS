({
	sumBalance : function(component, event, helper) {
		var totalBalance = 0;
        var existingRecords = component.get("v.ListResults");
        
        for ( var i = 0; i < existingRecords.length; i++ ) {
            //alert(totalBalance + '<==>'+existingRecords[i].balance);
            totalBalance = totalBalance + existingRecords[i].balance;
        }
        component.set("v.sumBalance", totalBalance);
	}
})