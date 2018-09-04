/*
This action outputs the vm (VC:VirtualMachine) object from the vm name string

Inputs:
vmStr (case sensitive)
sdkConnection
datacenter

Output:
vm --> type VC:VirtualMachine

*/

//Adds DNS/domain suffix to vm name to use findByDnsName method.  vmBool set to trur for vm.
var dnsName = vmStr + ".state.in.us";
var vmBool =  true;

//Searches vCenter and designated datacenter for vm by name and returns VC:VirtualMachine
try {
	vm =  sdkConnection.searchIndex.findByDnsName(datacenter, dnsName, vmBool);
}
catch (err) {
System.error("VM not found check case");
System.error(err);
}

return vm;