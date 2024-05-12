import React, { Component, Suspense } from 'react';
import { Container, Divider, Embed } from 'semantic-ui-react';
import ErrorBoundary from '../errors/ErrorBoundary';
import mscontainerinstances_logo from '../../logos/microsoft/Container Instances.svg';
import mskubernetesservices_logo from '../../logos/microsoft/Kubernetes Services.svg';
import docker_logo from '../../logos/docker/Docker_(container_engine)_logo.svg';
import kubernetes_logo from '../../logos/kubernetes/Kubernetes_logo.svg';
const DocumentHelp = React.lazy(() => import("../documents/DocumentHelp"));
const EntityHelp = React.lazy(() => import("../entities/EntityHelp"));
const TopicHelp = React.lazy(() => import("../topics/TopicHelp"));
const HierarchyHelp = React.lazy(() => import("../hierarchies/HierarchyHelp"));
const InsightHelp = React.lazy(() => import("../insights/InsightHelp"));
const DocSearchResultHelp = React.lazy(() => import("../docsearch/DocSearchResultHelp"));
const TextSearchResultHelp = React.lazy(() => import("../textsearch/TextSearchResultHelp"));
const GraphSearchResultHelp = React.lazy(() => import("../graphsearch/GraphSearchResultHelp"));

interface IHelpProps {
}

interface IHelpState {
}

class Help extends Component<IHelpProps, IHelpState> {
    
    constructor(props: IHelpProps) {
        super(props);
    }

    render() {
        return (
            <Container>
                <h1>HELP</h1>
                &nbsp;
                <ErrorBoundary>
                    <Suspense fallback={<div>Loading ...</div>}>
                        <DocumentHelp />
                    </Suspense>
                </ErrorBoundary>
                <ErrorBoundary>
                    <Suspense fallback={<div>Loading ...</div>}>
                        <EntityHelp />
                    </Suspense>
                </ErrorBoundary>
                <ErrorBoundary>
                    <Suspense fallback={<div>Loading ...</div>}>
                        <TopicHelp />
                    </Suspense>
                </ErrorBoundary>
                <ErrorBoundary>
                    <Suspense fallback={<div>Loading ...</div>}>
                        <HierarchyHelp />
                    </Suspense>
                </ErrorBoundary>
                <ErrorBoundary>
                    <Suspense fallback={<div>Loading ...</div>}>
                        <InsightHelp />
                    </Suspense>
                </ErrorBoundary>
                <ErrorBoundary>
                    <Suspense fallback={<div>Loading ...</div>}>
                        <DocSearchResultHelp />
                    </Suspense>
                </ErrorBoundary>
                <ErrorBoundary>
                    <Suspense fallback={<div>Loading ...</div>}>
                        <TextSearchResultHelp />
                    </Suspense>
                </ErrorBoundary>
                <ErrorBoundary>
                    <Suspense fallback={<div>Loading ...</div>}>
                        <GraphSearchResultHelp />
                    </Suspense>
                </ErrorBoundary>
                <br/><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;Enriched Search Experience (ESE) Edge is a part of an AI-powered analytical research platform called Enriched Search Experience (ESE).&nbsp;
                The main idea behind ESE Edge is to bring analytical research capabilities to the tactical edge in a disconnected or partially connected mode, while ESE Cloud aims to provide a broader set of capabilities for strategic research in a connected mode by leveraging an ample storage and compute in the cloud.&nbsp;
                As an end-to-end solution ESE Edge allows analysts to perform research in the field effectively and efficiently based on the array of the assets (documents) on-hand.&nbsp; 
                This includes the initial documents ingest and cracking, extraction of information, traditional and non-traditional methods of searching, maintenance of a knowledge base and more.&nbsp; 
                When there is a connectivity ESE Edge can be synchronized with ESE Cloud for information exchange according to the communication interfaces.
                <br/>
                &nbsp;&nbsp;&nbsp;&nbsp;Needless to say that dealing with large arrays of data while doing research in a specific problem domain is a big data problem.&nbsp;
                We believe that the cornerstone aspect in solving this problem is to be able to search for information efficiently and effectively in an iterative manner.&nbsp;
                When during research you have a hypothesis you'd like to validate or an idea you'd like to assess, you will be able to search for information on different levels of detail (documents or statements in documents), drill-down to the source, leverage visual exploration capability by traversing a graph, take advantage of visual dashboards displaying aggregated statistics, better explore your problem domain by searching across multiple collections of documents, and more.&nbsp;
                There is no single set recipe about using the ESE solution, because arguably the analytical research process is a combination of art and science, that's why creative You brings in the art of solving problems and finding solutions, and ESE assists with the science based on the best-in-class technology available today. 
                <Divider/>  
                <img src={mscontainerinstances_logo} alt="Container Instances" width="100" height="50" />
                <img src={mskubernetesservices_logo} alt="Kubernetes Services" width="100" height="50" />
                <img src={docker_logo} alt="Docker_(container_engine)_logo" width="100" height="35" />
                <img src={kubernetes_logo} alt="Kubernetes_logo" width="100" height="50" />
                <br/>
                <small>Microsoft logo is used according to the official guidelines posted <a href="https://www.mongodb.com/brand-resources">here</a></small>
                <Divider/>
                The following brief tutorial video introduces the ESE Edge
                <br/><br/>
                <Embed
                    icon='right circle arrow'
                    placeholder='/images/image-16by9.png'
                    url='https://esestoragepilot.blob.core.windows.net/help/ESE_Video%20Series_1_Intro.mp4?sp=r&st=2019-11-12T07:26:07Z&se=2020-11-12T15:26:07Z&spr=https&sv=2019-02-02&sr=b&sig=e6VVqOXg4WwfdMBSL1tlTN3JTvZJ%2BqvPzQqvzDPINuc%3D'
                />
            </Container>);
    }
}

export default Help;