({
    //On Page Load
	doInit : function(component, event, helper) {
        component.set('v.mycolumns', [
            //{label: 'id', fieldName: 'id', type: 'number'},
            {label: 'Creditor', fieldName: 'creditorName', type: 'text'},
            {label: 'First Name', fieldName: 'firstName', type: 'text'},
            {label: 'Last Name', fieldName: 'lastName', type: 'text'},
            {label: 'Min Pay%', fieldName: 'minPaymentPercentage', type: 'Decimal'},
            {label: 'Balance', fieldName: 'balance', type: 'Decimal'}
        ]);
        
        // create a server side action.       
        var action = component.get("c.getCalloutResults");
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('==>'+JSON.stringify(response.getReturnValue()));
            if (state === "SUCCESS") {
                var records = response.getReturnValue();
                // set the ListResult attribute on component.           
                component.set("v.ListResults", records);
                component.set("v.initialCount", records.length);
                helper.sumBalance(component, event, helper);
            }
        });
        $A.enqueueAction(action);
    },
    
    //Get Selected Rows
    handleSelect : function(component, event, helper) {
        
        var selectedRows = event.getParam('selectedRows'); 
        var setRows = [];
        var setKeys = [];
        var selBalance = 0.00;
        for ( var i = 0; i < selectedRows.length; i++ ) {
            setRows.push(selectedRows[i]);
            setKeys.push(selectedRows[i].id);
            selBalance = selBalance+selectedRows[i].balance;
		}
        component.set("v.selectedRecords", setRows);
        component.set("v.selectedKeys", setKeys);
        component.set("v.selBalance", selBalance);
        //alert(selBalance);
    },
    
    //Add New Row To JSON
    addRow : function(component, event, helper) {
        var getId = component.get("v.initialCount")+1;
        var addBalance = 100.00;
        var addRec = {'id' : getId,'creditorName' : 'Discover','firstName':'Gagan','lastName':'Sharma','minPaymentPercentage':'2.0','balance':addBalance };
        var existingRecords = component.get("v.ListResults");
        existingRecords.push(addRec);
        var sumBalance = component.get("v.sumBalance") + addBalance;
        component.set("v.ListResults", existingRecords);
        component.set("v.initialCount", getId);
        component.set("v.sumBalance", sumBalance);
        alert(JSON.stringify(addRec));
    },
    
    //Add New Row To JSON
    removeRow : function(component, event, helper) {
        var existingRecords = component.get("v.ListResults");
        var selKeys = component.get("v.selectedKeys");
        
        alert(selKeys+'<==keys++Length==>'+existingRecords.length);
        for ( var i = 0; i < existingRecords.length; i++ ) {
            alert(JSON.stringify(existingRecords[i]));
            if(selKeys.indexOf(existingRecords[i].id)>=0){
               alert('Remove==>'+existingRecords[i].id);
               existingRecords.splice(i,1); 
            }
        }
        component.set("v.ListResults", existingRecords);
    },
})