// Setting the machine variable with properties from payload.
var machine = payload.get("machine");

// Below I will be using the readModel method to return the vCACEntity.  To better understand I am going to give each a parameter a meaningful variable.
var vmProps = new Properties(); //Initializing a new Object

vmProps.put("VirtualMachineID", machine.get("id"));  // Setting machineID properties
hostId = vCACHost.id;  //This the vCACHost in our case the web\model server iotvmmp81fw
modelName = "ManagementModelEntities.svc";  //vCAC IaaS extensibility meta-model
entitySetName = "VirtualMachines";  //This is an entity set within the model.  VirtualMachines are the the VMs deployed from blueprints
virtualMachineEntity = vCACEntityManager.readModelEntity(hostId, modelName, entitySetName, vmProps, null);  //Put it all together and create the virtualMachineEntity to create the vmProperties array
vmProperties = new Properties();  //Create vmProperties 

//Creating an array of all of the vm properties the virtualMachineEntity object 
var virtualMachinePropertiesEntities = virtualMachineEntity.getLink(vCACHost, "VirtualMachineProperties");

//Looping through entity properties to create vmProperties array with found properties
for each (var virtualMachinePropertiesEntity in virtualMachinePropertiesEntities) {
    var propertyName = virtualMachinePropertiesEntity.getProperty("PropertyName");
    var propertyValue = virtualMachinePropertiesEntity.getProperty("PropertyValue");
    System.debug("Found property "+propertyName + " =  " + propertyValue);
    vmProperties.put(propertyName, propertyValue);
}

//Workflow Inputs
var vmName = machine.get("name");
var networkAddress = vmProperties.get("VirtualMachine.Network0.Address");

// Logs
System.log("\n" + "Start Payload WF Input Logs");
System.log("vmName " + "  =>  " + vmName);
System.log("networkAddress " + "  =>  " + networkAddress);
System.log("\n");