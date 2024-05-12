# Define variables

$subscriptionId = $(az account show --query 'id' -o json)
$resourceGroup = "$($env:NAME)-$($env:ENVIRONMENT)-rg"
$dataBoxEdgeDeviceName = "$($env:NAME)$($env:ENVIRONMENT)edge"
$apiVersion = "$($env:MGMTAPIVERSION)"

$userName = "eseadmin"

$elasticsearchShareName = "elasticsearchsmb"
$sqlShareName = "sqlsmb"
$serverShareName = "serversmb"

# Create admin user
# todo (current assumption: admin user has been already pre-created)

# Add Azure Stack Edge (Data Box Gateway) shares:

# elasticsearch smb share
$(az rest --method put --uri "https://management.azure.com/subscriptions/$subscriptionId/resourceGroups/$resourceGroup/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/$dataBoxEdgeDeviceName/shares/$elasticsearchShareName/?api-version=$apiVersion" `
--headers "Content-Type=application/json" `
--body "{'id':'/subscriptions/$subscriptionId/resourcegroups/$resourceGroup/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/$dataBoxEdgeDeviceName/shares/$elasticsearchShareName','name':'$elasticsearchShareName','type':'Microsoft.DataBoxEdge/dataBoxEdgeDevices/shares','properties':{'description':'','shareStatus':'Online','monitoringStatus':'Enabled','allowedHostIPs':null,'accessProtocol':'SMB','dataPolicy':'Local','azureContainerInfo':null,'clientAccessRights':[],'userAccessRights':[{'userId':'/subscriptions/$subscriptionId/resourcegroups/$resourceGroup/providers/microsoft.databoxedge/databoxedgedevices/$dataBoxEdgeDeviceName/users/$userName','accessType':'Change'}],'refreshDetails':{'inProgressRefreshJobId':null,'lastCompletedRefreshJobTimeInUTC':null}}}")

# sql smb share
$(az rest --method put --uri "https://management.azure.com/subscriptions/$subscriptionId/resourceGroups/$resourceGroup/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/$dataBoxEdgeDeviceName/shares/$sqlShareName/?api-version=$apiVersion" `
--headers "Content-Type=application/json" `
--body "{'id':'/subscriptions/$subscriptionId/resourcegroups/$resourceGroup/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/$dataBoxEdgeDeviceName/shares/$sqlShareName','name':'$sqlShareName','type':'Microsoft.DataBoxEdge/dataBoxEdgeDevices/shares','properties':{'description':'','shareStatus':'Online','monitoringStatus':'Enabled','allowedHostIPs':null,'accessProtocol':'SMB','dataPolicy':'Local','azureContainerInfo':null,'clientAccessRights':[],'userAccessRights':[{'userId':'/subscriptions/$subscriptionId/resourcegroups/$resourceGroup/providers/microsoft.databoxedge/databoxedgedevices/$dataBoxEdgeDeviceName/users/$userName','accessType':'Change'}],'refreshDetails':{'inProgressRefreshJobId':null,'lastCompletedRefreshJobTimeInUTC':null}}}")

# server smb share
$(az rest --method put --uri "https://management.azure.com/subscriptions/$subscriptionId/resourceGroups/$resourceGroup/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/$dataBoxEdgeDeviceName/shares/$serverShareName/?api-version=$apiVersion" `
--headers "Content-Type=application/json" `
--body "{'id':'/subscriptions/$subscriptionId/resourcegroups/$resourceGroup/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/$dataBoxEdgeDeviceName/shares/$serverShareName','name':'$serverShareName','type':'Microsoft.DataBoxEdge/dataBoxEdgeDevices/shares','properties':{'description':'','shareStatus':'Online','monitoringStatus':'Enabled','allowedHostIPs':null,'accessProtocol':'SMB','dataPolicy':'Local','azureContainerInfo':null,'clientAccessRights':[],'userAccessRights':[{'userId':'/subscriptions/$subscriptionId/resourcegroups/$resourceGroup/providers/microsoft.databoxedge/databoxedgedevices/$dataBoxEdgeDeviceName/users/$userName','accessType':'Change'}],'refreshDetails':{'inProgressRefreshJobId':null,'lastCompletedRefreshJobTimeInUTC':null}}}")