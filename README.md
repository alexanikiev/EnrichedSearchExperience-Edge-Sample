# Introduction 
Based on the success of ESE (Enriched Search Experience) reference architecture implementation and as informed by the industry research, content cracking is a part of every knowledge mining solution when it comes to text (NLP), and there’s an interest in packaging an Edge Content Cracking Pipeline based on Elastic Search for reuse for the broader community.
Taking into account our previous experience on projects, there's a tendency towards extracting and leveraging the same set of elements from the corpus of text from documents. These elements are linked entities, key phrases and OpenIE triples – the foundational extracts. Leveraging these extracts multiple derived benefits may be observed downstream, namely, linked entities and key phrases may be utilized in emerging topics detection algorithms or triples may be utilized for opinion mining and other modeling scenarios.

Please review the following Medium articles for details about the design and implementation of Enriched Search Experience solution in the Cloud and on the Edge:

1. Building Kubernetes Applications for Azure Stack Edge: https://medium.com/@alexanikiev/building-kubernetes-applications-for-azure-stack-edge-be01666831e7
2. Deploying Kubernetes Applications on Azure Stack Edge: https://medium.com/@alexanikiev/deploying-kubernetes-applications-on-azure-stack-edge-73f64389a59a
3. Deploying Kubernetes Applications on Azure Stack Hub: https://medium.com/@alexanikiev/deploying-kubernetes-applications-on-azure-stack-hub-8ed1fbd5834
4. Building Kubernetes Applications for Azure Stack Edge Mini: https://medium.com/@alexanikiev/building-kubernetes-applications-for-azure-stack-edge-mini-2726978708b4
5. Building AI Application for Azure Cloud: https://medium.com/@alexanikiev/building-ai-applications-for-azure-cloud-65252b602042

Please watch a similar demo video [here](https://learn.microsoft.com/en-us/shows/it-ops-talk/knowledge-mining-on-azure-stack-edge) and read more about it [here](https://alexanikiev.medium.com/building-kubernetes-applications-for-azure-stack-edge-be01666831e7)

<a href="https://learn.microsoft.com/en-us/shows/it-ops-talk/knowledge-mining-on-azure-stack-edge" target="_blank"><img src="https://learn.microsoft.com/video/media/607ed043-222f-4d0f-b316-2f89299a2433/azurestackedge_960.jpg" alt="Knowledge Mining on Azure Stack Edge" width="560" height="315" border="10" /></a>

# Getting Started
In this repo we have packaged an Edge Content Cracking Pipeline for reuse. In the code base we’ve fully automated the process of standing up an Edge Content Cracking Pipeline on Azure Stack Edge (or Azure Stack Hub) based on Elastic Search with the help of Azure Arc for Kubernetes in Azure Cloud, GitOps-style CI&CD and Kubernetes objects fully scripted in yml representing the desired state of the cluster.

# Build and Test
The list of pre-requisites to successfully execute pipelines includes:
- Azure Stack Edge (or Azure Stack Hub)
- Azure Subscription
- Azure DevOps project w/ Service connection (Service principal)
- Azure DevOps free marketplace extension: Terraform by Microsoft DevLabs
- Azure Blob Storage account w/ container for Terraform AzureRM Backend configuration file

The pipelines execution flow looks like the following:
![pipelines](/images/pipelines.png?raw=true "pipelines")

The end result after execution pipelines looks like the following:
1. Platform infrastructure fully provisioned in the Cloud (2 Azure resources to support the pattern)

![cloudresources](/images/cloudresources.png?raw=true "cloudresources")

2. Platform infrastructure fully provisioned at the Edge (circa 30 Micro-services to support the pattern)

| Micro-service | Description | Category | Type | Port | Resource |
|---|---|---|---|---|---|
| elasticsearch | Elasticsearch Docker image | Data store (persistent, stateful) | Main | 9997 |   |
| kibana | Kibana Docker image | Misc | Debug | 9994 |   |
| mongo | MongoDB Docker image | Data store (persistent, stateful) | Main | 9993 |   |
| mongoexpress | Web-based MongoDB admin interface written with Node.js and express | Misc | Debug | 9992 |   |
| gremlinserver | Gremlin Server processes graph traversal requests over Apache TinkerPop-enabled graph (Strategic graph) | Data store (non-persistent, stateful) | Main | 9995 |   |
| gremlinconsole |   | Misc | Debug | 9996 |   |
| gremlingraphexp |   | Misc | Debug | 9996 |   |
| fuseki | SPARQL server with web UI backed by Apache Jena's TDB triple store (Tactical graph) | Data store (non-persistent, stateful) | Main | 9976 |   |
| fuseki2 | SPARQL server with web UI backed by Apache Jena's TDB triple store (Tactical graph) | Data store (persistent, stateful) | Main | 9977 |   |
| sql | Microsoft SQL Server Express Docker image | Data store (persistent, stateful) | Main | 9988 |   |
| tika | Apache Tika Server Docker image  | Operational (stateless) | Main | 9986 |   |
| ocr | Cognitive Services on-premises (Public Preview) | Operational (stateless) | Main | 9969 |   |
| stt | Cognitive Services on-premises (Public Preview) | Operational (stateless) | Main | 9968 |   |
| languagedetection | Cognitive Services on-premises | Operational (stateless) | Main | 9984 |   |
| translator1 | Cognitive Services on-premises (Private Preview) | Operational (stateless) | Main | 9951 |   |
| translator2 | Cognitive Services on-premises (Private Preview) | Operational (stateless) | Main | 9952 |   |
| translator3 | Cognitive Services on-premises (Private Preview) | Operational (stateless) | Main | 9953 |   |
| keyphraseextraction | Cognitive Services on-premises | Operational (stateless) | Main | 9985 |   |
| stanfordcorenlp | Stanford CoreNLP Server Docker image | Operational (stateless) | Main | 9987 |   |
| client | Purpose-built web client for content exploration | Operational (stateless) | Main | 9998 |   |
| server | Purpose-built web apis for content exploration | Operational (stateless) | Main | 9990 |   |
| pipeline | Purpose-built configurable pipeline(s) based on provided skillset(s) definition | Operational (stateless) | Main | 9991 |   |
| pipelinedocuments | Purpose-built configurable pipeline(s) based on provided skillset(s) definition | Operational (stateless) | Main | 9961 |   |
| pipelineimages | Purpose-built configurable pipeline(s) based on provided skillset(s) definition | Operational (stateless) | Main | 9962 |   |
| pipelineaudios | Purpose-built configurable pipeline(s) based on provided skillset(s) definition | Operational (stateless) | Main | 9963 |   |
| functions | Purpose-built orchestrator (indexer) for content cracking | Operational (stateless) | Main | 9972 |   |
| publisher | Purpose-built web apis (upload) for synchronization with Azure Stack Hub or Azure Cloud | Operational (stateless) | Main | 9980 |   |
| subscriber | Purpose-built web apis (download) for synchronization with Azure Stack Hub or Azure Cloud | Operational (stateless) | Main | 9981 |   |
| applicationinsights | Visual Studio Application Insights Docker image to help monitor containerized applications by collecting telemetry | Operational (stateless) | Main | 9940 |   |
| sentimentanalysis | Cognitive Services on-premises | Operational (stateless) | Main | 9941 |   |
| grafana | Grafana Docker image | Misc | Debug | 9942 |   |
| logstash | Logstash Docker image | Misc | Debug | 9943 |   |
| publisher* | Kafka producer (.NET Core Confluent library) | Misc | Debug | 9964 |   |
| subscriber* | Kafka consumer (.NET Core Confluent library) | Misc | Debug | 9965 |   |

![edgeresources](/images/edgeresources.png?raw=true "edgeresources")

The architecture for this pattern looks like the following:
![architecture](/images/architecture.png?raw=true "architecture")

3. Configuration for purpose-built components

| Micro-service | Variable | Description | Default |
|---|---|---|---|
| client | REACT_APP_SERVER_HOST | server IP address or name | server |
| client | REACT_APP_SERVER_PORT | server port | 9990 |
| client | REACT_APP_PIPELINE_HOST | pipeline IP address or name | pipeline |
| client | REACT_APP_PIPELINE_PORT | pipeline port | 9991 |
| server | MONGO_HOST | mongo IP address or name | mongo |
| server | MONGO_PORT | mongo port | 9993 |
| server | MONGO_DB | mongo database name | ese |
| server | ELASTICSEARCH_HOST | elasticsearch IP address or name | elasticsearch |
| server | ELASTICSEARCH_PORT | elasticsearch port | 9997 |
| server | ELASTICSEARCH_INDEX | elasticsearch index name | ese |
| server | GREMLINSERVER_HOST | gremlinserver IP address or name | gremlinserver |
| server | GREMLINSERVER_PORT | gremlinserver port | 9995 |
| server | OCR_HOST | ocr IP address or name | ocr |
| server | OCR_PORT | ocr port | 9969 |
| server | STANFORDCORENLP_LOGIN | stanfordcorenlp service account name | abc |
| server | STANFORDCORENLP_PASSWORD | stanfordcorenlp service account password | abc |
| server | STANFORDCORENLP_HOST | stanfordcorenlp IP address or name | stanfordcorenlp |
| server | STANFORDCORENLP_PORT | stanfordcorenlp port | 9987 |
| server | FUSEKI_HOST | fuseki IP address or name | fuseki |
| server | FUSEKI_PORT | fuseki port | 9976 |
| server | FUSEKI_DS | fuseki dataset name | ese |
| server | STT_HOST | stt IP address or name | stt |
| server | STT_PORT | stt port | 9968 |
| server | TIKA_HOST | tika IP address or name | tika |
| server | TIKA_PORT | tika IP address or name | 9986 |
| server | LANGUAGEDETECTION_HOST | languagedetection IP address or name | languagedetection |
| server | LANGUAGEDETECTION_PORT | languagedetection port | 9984 |
| server | KEYPHRASEEXTRACTION_HOST | keyphraseextraction IP address or name | keyphraseextraction |
| server | KEYPHRASEEXTRACTION_PORT | keyphraseextraction port | 9985 |
| server | SQL_LOGIN | sql service account name | sa |
| server | SQL_PASSWORD | sql service account password | abc |
| server | SQL_HOST | sql IP address or name | sql |
| server | SQL_PORT | sql port | 9988 |
| server | SQL_DB | sql database name | ese |
| pipeline | SERVER_HOST | server IP address or name | server |
| pipeline | SERVER_PORT | server port | 9990 |
| functions | SERVER_HOST | server IP address or name | server |
| functions | SERVER_PORT | server port | 9990 |
| functions | PIPELINE_HOST | pipeline IP address or name | pipeline |
| functions | PIPELINE_PORT | pipeline port | 9991 |

Consistency of implementation between Edge (Elastic Search) and Cloud (Microsoft Azure AI Search)
![configuration](/images/configuration.png?raw=true "configuration")

The initial resource allocation for Kubernetes cluster resources on Azure Stack Edge is the following:
![resources](/images/resources.png?raw=true "resources")

All the necessary operational logic is encapsulated in the server component and accompanied by documentation (api-docs):
![apidocs](/images/apidocs.png?raw=true "apidocs")
Reference: http://server:port/api-docs/

MVP UX (User experience) provided with this pattern is encapsulated in the client component and it was built based on the following structure of a React component:
![reactcomponent](/images/reactcomponent.png?raw=true "reactcomponent")

To speed up the development effort and for the best user experience the following native React components were leveraged in this reference implementation for the pattern:

| Component | GitHub | Purpose |
|---|---|---|
| react-force-graph: React component for 2D, 3D, VR and AR force directed graphs | https://github.com/vasturiano/react-force-graph | Graph visualization |
| react-d3-components: D3 Components for React | https://github.com/codesuki/react-d3-components | Dashboard visualization |
| react-wordcloud: Simple React + D3 wordcloud component with powerful features | https://github.com/chrisrzhou/react-wordcloud | Word cloud visualization |
| react-image-mapper: React Component to highlight interactive zones in images | https://github.com/coldiary/react-image-mapper | Image bounding boxes |
| react-audio-player: A simple React wrapper on the HTML5 audio tag | https://github.com/justinmc/react-audio-player | Embedded audio player |

Private GitHub repo + Azure Arc for Kubernetes setup:
![gitops](/images/gitops.png?raw=true "gitops")

# Engineering Fundamentals
To ensure the quality of the code base the following engineering fundamentals have been addressed:
- Automated testing and CI/CD
- Security (Identity on the Edge)
- Observability and monitoring

# Pattern Pillars
To ensure the adoption of the pattern the following pillars have been addressed which also correspond to the Engineering Fundamentals described in the section above:
- Ease of deployment
- Ease of use 
- Telemetry (Application Insights)

# Limitations
Currently there's a number of limitations which prevents from running the solution in a fully disconnected mode:
- Cognitive Services on-premises Billing endpoint 
- Functions AzureWebJobsStorage setting (Connection string)

# Todos
To continue the progress there’re a few items to be addressed in the code base:
- Finish a detailed documentation (work in progress)
- Automatic provisioning of the required Azure Cloud resources (Azure Stack Edge, Azure Arc for Kubernetes, ACR, Key Vault)
- Automatic creation of local file shares on Azure Stack Edge (or Azure Stack Hub)
- Automatic provisioning of SQL database based on provided DLL
- Automatic provisioning of Gremlin graph
- Automatic provisioning of Fuseki data set
- Automatic Azure Stack Edge Compute configuration
- Leverage ACR Permission tokens (Preview) instead of Admin credentials
- Handle secrets when building Docker images (arguments input is evaluated for all commands except buildAndPush)

# Detailed Instructions

**Notes**

- Azure 'Cognitive Services' resource is required for Cognitive Services containers billing (keyphraseextraction, languagedetection)
- Azure 'Computer Vision' resource is requred for Computer Vision container billing (ocr) 
- Azure 'Storage account' resource is requred for Azure Functions container jobs logging (functions) 
- Azure Functions container CORS configuration not enabled (workaround: use nginx as a reverse proxy or temporarily bypass with CORS web browser plugin, for example, `Moesif Origin & CORS Changer` or `Allow-Control-Allow-Origin`). For the current state of the code we use a basic request to Azure Functions container which doesn't require CORS.

**Out of scope**

- Corrupted, virus-infected and/or password-protected files: In case your file(s) fall into one of the abovementioned categories the ingest process for those will likely fail which is expected, please consider prepare your file(s) as/if necessary before ingest
- Translator containers
- STT (Speech-to-text) container

**Data persistance**

- Elasticsearch data is persistent and associated with elasticsearchsmb Azure Stack Edge share (persistent volume) which you set up in Azure portal (as a Local share or Cloud share)
- SQL data is persistent and associated with sqlsmb Azure Stack Edge share (persistent volume) which you set up in Azure portal (as a Local share or Cloud share)
- Mongo data is tied to the lifecycle of the host and set up as a HostPath on Kubernetes cluster, alternatively we could have set it up with Azure Stack Edge share (persistent volume) but Azure Stack Edge currently doesn't support POSIX compatible storage required by Mongo container
- Fuseki data was originally not persistent and associated with In-Memory dataset in Fuseki container. However, with `fuseki2` configuration we've changed Fuseki to a persistent state which is associated with fusekismb Azure Stack Edge share (persistent volume) which you set up in Azure portal (as a Local share or Cloud share) 
- Files data (source documents and images) is persistent and associated with serversmb Azure Stack Edge share (persistent volume) which is set up in Azure portal (as a Local share or Cloud share)   

**Build**

- Azure Functions container code is built using `tsc` command to generate JS from TSX
- Azure Functions container uses `"AzureWebJobsStorage": "UseDevelopmentStorage=true"` value in `local.setting.json` for local development and troubleshooting which brings in Azure 'Storage account' dependency, to remove this dependency please change the value to `false` or an empty string `"AzureWebJobsStorage": ""`

**Pre-configuration**

`$ip = "IP of the device";`

`Set-Item WSMan:\localhost\Client\TrustedHosts $ip -Force`

`$minishellSession= New-PSSession -ComputerName $ip -ConfigurationName "Minishell" -Credential ~\EdgeUser`

`Invoke-Command -Session $minishellSession -ScriptBlock { Enable-HcsSupportAccess }`

***

`Enter-PSSession -ComputerName $ip -Credential ~\EdgeSupport -ConfigurationName SupportSession`

***

Azure Stack Edge: `c$\ClusterStorage\HcsInternal\hcsInternal\.kube\config`

Windows: `%USERPROFILE%/.kube/config` | Mac: `~.\kube\config`

**Installation**

`kubectl create namespace eseedge`

`kubectl create secret docker-registry regcred --namespace=eseedge --docker-server=eseregistryedge.azurecr.io --docker-username=eseregistryedge --docker-password=*** --docker-email=your_email@your_domain.com`

`kubectl create -f ./EnrichedSearchExperience-Edge-Sample-main --namespace=eseedge`

Please change the default dummy illustrative credentials (username & password) for micro-services per below:

- SQL: username=sa, password=your_password
- StanfordCoreNLP: username=admin, password=your_password
- Fuseki: username=admin, password=your_password 

**Post-configuration**

- SQL Express database `ese`. SQL data can be explored in Azure Data Studio or in the command line of sqlcmd

`kubectl exec -it sqlcmd-xyz -n eseedge /bin/bash`

`# sqlcmd -S tcp:$SQL_SERVICE_HOST,$SQL_SERVICE_PORT -U sa -P your_password -i eseedge.sql`

- Fuseki dataset `ese` (in case not already provided as an env variable FUSEKI_DATASET_1 via configmap). Fuseki data can be explored in the built-in GUI inside of fuseki

`kubectl exec -it fuseki-xyz -n eseedge /bin/bash`

`# curl 'http://localhost:3030/$/datasets' -H "Authorization: Basic $(echo -n admin:your_password | base64)" -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' --data 'dbName=ese&dbType=tdb'`

- Mongo database `ese` gets created automatically upon the first interaction (for example, Postman POST request). Mongo data is ready for exploration immediately in MongoExpress

- Elasticsearch index `ese` gets created automatically upon the first interaction (for example, Postman POST request). When exploring Elasticsearch data using Kibana please  create an Index pattern `ese*` in Kibana first

**Ingest (Master data)**

Please find a list of suggested json files for master data in `data` folder. The master data for the demo is comprised of collections, hierarchies, entities, topics & insights. The ingest process for the master data can be performed using Postman. 

- Collections: file=`collections.json`. Each individual collection record (json array element) may be ingested into the system via Postman POST request as depicted below

`http://10.0.0.241:30990/mongo/collection`, please substitute `10.0.0.241` with your Host IP 

Headers={'Content-Type': 'application/json', 'Accept': 'application/json'}, Body(raw)=`individual collection record`

- Hierarchies: file=`hierarchies.json`. Each individual hierarchy record (json array element) may be ingested into the system via Postman POST request as depicted below

`http://10.0.0.241:30990/mongo/hierarchy`, please substitute `10.0.0.241` with your Host IP

Headers={'Content-Type': 'application/json', 'Accept': 'application/json'}, Body(raw)=`individual hierarchy record`

- Entities: file=`entities.json`. Each individual entity record (json array element) may be ingested into the system via Postman POST request as depicted below

`http://10.0.0.241:30990/mongo/entity`, please substitute `10.0.0.241` with your Host IP

Headers={'Content-Type': 'application/json', 'Accept': 'application/json'}, Body(raw)=`individual entity record`

- Topics: file=`topics.json`. Each individual topic record (json array element) may be ingested into the system via Postman POST request as depicted below

`http://10.0.0.241:30990/mongo/topic`, please substitute `10.0.0.241` with your Host IP

Headers={'Content-Type': 'application/json', 'Accept': 'application/json'}, Body(raw)=`individual topic record`

- Insights: file=`insights.json`. Each individual insight record (json array element) may be ingested into the system via Postman POST request as depicted below

`http://10.0.0.241:30990/mongo/insight`, please substitute `10.0.0.241` with your Host IP

Headers={'Content-Type': 'application/json', 'Accept': 'application/json'}, Body(raw)=`individual insight record`

**Ingest (Transactional data)**

Please find all the files which support the demo in `files` folder in `data` folder of this repo.

- Documents are cracked asynchronously (Submit step & Process step)

To ingest documents for the demo please first navigate to the Home page, then select the left icon (from 3) under Submit Content, then choose your file with Choose Files dialog (we recommend to ingest around 5 files at the time to avoid clogging in case of unexpected issues), then press Submit button (and wait until the spinning wheel finishes) and finally press Process button under Process Content to crack your files open (and wait until the spinning wheel finishes). Please repeat this procedure for the next batch of document files as necessary.

- Images are cracked synchronously upon Submit and their textual representation `.txt` is cracked asynchronously (Process step)

To ingest images for the demo please first navigate to the Home page, then select the middle icon (from 3) under Submit Content, then choose your file with Choose Files dialog (we recommend to ingest around 5 files at the time to avoid clogging in case of unexpected issues), then press Submit button (and wait until the spinning wheel finishes) and finally press Process button under Process Content to crack your files open (and wait until the spinning wheel finishes). Please repeat this procedure for the next batch of image files as necessary.  

**Troubleshooting**

In case your files (documents or images) ingest is failing you can verify that in your web browser Dev Tools on the Network tab. Should this (clogging) happen you can unclog the ingest pipeline by purging the stuck files by means of Postman POST request as shown below:

`http://10.0.0.241:30990/storage/purge`, please substitute `10.0.0.241` with your Host IP 

After unclogging you may proceed with the next batch of files to ingest as described in the sections above 

**Resetting demo data**

- Delete all files (documents and images): You can remove all files from the server side storage by means of Postman POST request as shown below:

`http://10.0.0.241:30990/storage/empty`, please substitute `10.0.0.241` with your Host IP

- Delete SQL data: You can remove SQL data by recreating the database using command line interface, this will drop the database if it already exists and recreate a new one with no data

`kubectl exec -it sqlcmd-xyz -n eseedge /bin/bash`

`# sqlcmd -S tcp:$SQL_SERVICE_HOST,$SQL_SERVICE_PORT -U sa -P your_password -i eseedge.sql`

- Delete Mongo data: You can remove Mongo database/collections in Mongoexpress GUI, in case you need to remove individual documents and/or collections you can also do it in Mongoexpress GUI

- Delete Elasticsearch data: You can remove Elasticsearch index in Kibana GUI 

- Delete Fuseki data: You can remove Fuseki dataset on Manage datasets page `http://10.0.0.241:30977/manage.html?tab=datasets` or by using the command line interface, please substitute `10.0.0.241` with your Host IP

`kubectl exec -it fuseki-xyz -n eseedge /bin/bash`

`# curl -X DELETE http://localhost:3030/$/datasets/ese -H "Authorization: Basic $(echo -n admin:your_password | base64)"`

**Uninstallation**

`kubectl delete -f ./EnrichedSearchExperience-Edge-Sample-main --namespace=eseedge`

`kubectl delete secret regcred --namespace=eseedge`

`kubectl delete namespace eseedge`

**References**

- Azure Functions container CORS issue: https://docs.microsoft.com/en-us/answers/questions/180713/azure-functions-on-aks-cors-issue.html (you can avoid this issue altogether by using anonymous functions and submitting a basic request from the client to functions bypassing CORS (aka Process button))
- Fuseki Data persistance: https://hub.docker.com/r/stain/jena-fuseki (Data persistance section). `dbType=mem` means In-memory, `dbType=tdb` means Persistent and `dbType=tdb2` means Persistent (TDB2). Fuseki file system layout: https://jena.apache.org/documentation/fuseki2/fuseki-layout.html. By default Fuseki databases are stored at `${FUSEKI_BASE}/databases` (`/fuseki/databases`)
- Fuseki Data persistance: https://hub.docker.com/r/secoresearch/fuseki
