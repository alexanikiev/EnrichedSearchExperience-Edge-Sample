import React, { Component } from 'react';
import { Container, Label, Icon, Image } from 'semantic-ui-react';
import { ForceGraph2D } from 'react-force-graph';

import * as Nodes from "./utils/Nodes";
import * as Links from "./utils/Links";
import * as Icons from "./utils/Icons";
import * as Flags from "./utils/Flags";

import * as Persons from "./utils/Persons";
import * as Organizations from "./utils/Organizations";
import * as Locations from "./utils/Locations";
import * as Topics from "./utils/Topics";
import * as Countries from "./utils/Countries";

import * as Details from "./utils/Details";

var selectednodeid: any = undefined;

interface IGraphSearchResultProps {
    graphsearchresults: { id: string; subject: string; predicate: string; object: string; document: string; }[],
    onAppendGraphSearchResults: (search: string) => Promise<{ triples: { id: string; subject: string; predicate: string; object: string; document: string; }[]}>,
    onSelectGraphSearchResult: (search: string, results: { id: string; subject: string; predicate: string; object: string; document: string; }[] ) => void,
    longtriples: boolean
}

interface IGraphSearchResultState {
    nodes: any,
    links: any,
    //aggregated results
    graphsearchresults: { id: string; subject: string; predicate: string; object: string; document: string; }[]
}

class GraphSearchResult extends Component<IGraphSearchResultProps, IGraphSearchResultState> {
    constructor(props: IGraphSearchResultProps) {
        super(props);

        this.state = {
            nodes: [], //Nodes.nodes,
            links: [], //Links.links
            graphsearchresults: []
        };

        this.nodeClick = this.nodeClick.bind(this);
        this.nodeRightClick = this.nodeRightClick.bind(this);
        this.backgroundClick = this.backgroundClick.bind(this);
    }

    componentWillReceiveProps(props: IGraphSearchResultProps) {
        if (props.graphsearchresults !== undefined && props.graphsearchresults.length > 0 && 
            props.graphsearchresults.length !== this.props.graphsearchresults.length /* results changed */ ) {
            /* todo: introduce search session id for every new search */
            var nodes: any[] = [];
            var links: any[] = [];
            var nodeids: string[] = [];
            var linkids: string[] = [];
            var graphsearchresults = props.graphsearchresults.slice();
            props.graphsearchresults.forEach((r: { id: string; subject: string; predicate: string; object: string; document: string; }) => {
                var longtriple = r.subject.length + r.predicate.length + r.object.length > 50 || 
                r.subject.length > 25 || r.predicate.length > 25 || r.object.length > 25;
                if (props.longtriples || (!props.longtriples && !longtriple)) {
                    [r.subject, r.predicate, r.object].forEach((nodeid: string) => {
                        if (!nodeids.includes(nodeid)) {
                            var node = this.state.nodes.find((n: any) => n.id === nodeid);

                            let info = "No additional information available.";
                            let details = Details.info.find(x => x.name === nodeid);
                            if (details !== undefined) info = details.description;

                            let triples: any[] = [];
                            graphsearchresults.forEach(r2 => {
                                if (r2.subject == nodeid || r2.predicate == nodeid || r2.object == nodeid)
                                triples.push({ id: "", subject: r2.subject, predicate: r2.predicate, object: r2.object, document: "" });
                            });

                            nodes.push({ id: nodeid, name: `<div style='text-align: center'>
                            <b><u>${nodeid}</u></b><br/>
                            <small>${info}</small>
                            <hr/>
                            ${triples.slice(0, 5).map(triple => {
                                return "<small>(S) " + triple.subject + " (P) " + triple.predicate + " (O) " + triple.object + "</small><br/>";           
                            }).join("")}
                            ${triples.length > 5 ? 
                                '<small>... more triples here (' + (triples.length - 5)  + ')</small>' : '' }
                            </div>`, val: 1, 
                            fx: node !== undefined ? node.fx : undefined, 
                            fy: node !== undefined ? node.fy : undefined });
                            nodeids.push(nodeid);
                        }
                    });
                    if (!linkids.includes(`${r.subject}-${r.predicate}`)) {
                        links.push({ source: r.subject, target: r.predicate});
                        linkids.push(`${r.subject}-${r.predicate}`);
                    }
                    if (!linkids.includes(`${r.predicate}-${r.object}`)) {
                        links.push({ source: r.predicate, target: r.object});
                        linkids.push(`${r.predicate}-${r.object}`);
                    }
                }
            });
            this.setState({
                nodes,
                links,
                graphsearchresults: props.graphsearchresults
            });
        }
    }

    selectGraphSearchResult(search: string, results: { id: string; subject: string; predicate: string; object: string; document: string; }[] ) {
        return this.props.onSelectGraphSearchResult(search, results);
    }

    render() {
        return (
            <Container>
                {this.props.graphsearchresults.length > 0 ?  
                <ForceGraph2D 
                    graphData={{nodes: this.state.nodes, links: this.state.links}}
                    backgroundColor="#f5f5f5" 
                    width={1125}
                    height={575} 
                    nodeCanvasObject={(node, ctx, globalScale) => {
                        const size = 12;
                        const label = node.id;
                        const fontSize = 12/globalScale;
                        ctx.font = `${fontSize}px Sans-Serif`;
                        let flag = this.getFlag(label as string);
                        ctx.drawImage(flag >= 0 ? Flags.imgs[flag] : Icons.imgs[this.getIcon(label as string, (selectednodeid !== undefined && selectednodeid == node.id))], 
                                      node.x ? node.x - size / 2 : 6, 
                                      node.y ? node.y - size / 2 : 6, 
                                      size - 1, 
                                      size);
                        ctx.textAlign = 'center';
                        ctx.fillText(label as string, node.x ? node.x : 0, node.y ? node.y + 12 : 0);
                    }} 
                    onNodeClick={this.nodeClick} 
                    onNodeRightClick={this.nodeRightClick}
                    onNodeDragEnd={this.nodeDragEnd} 
                    onBackgroundClick={this.backgroundClick} 
                    linkDirectionalArrowLength={3.5}
                    linkDirectionalArrowRelPos={0.5}
                    linkCurvature={0.1} /> :
                <Image src='./img/graph.png' size='massive' centered disabled />
                }
            </Container>
        );
    }

    getIcon(name: string, mark: boolean) {
        let icon = 0;
        if (Persons.persons.includes(name)) {
            icon = 1;
        }
        else if (Organizations.organizations.includes(name)) {
            icon = 2;
        }
        else if (Locations.locations.includes(name)) {
            icon = 3;
        }
        else if (Topics.topics.includes(name)) {
            icon = 4;
        }
        return icon + (mark ? 5 : 0);
    }

    getFlag(name: string) {
        return Countries.countries.indexOf(name);
    }

    nodeDragEnd(node: any) {
        node.fx = node.x;
        node.fy = node.y;
    }

    nodeClick(node: any, event: any) {
        if (selectednodeid === undefined || selectednodeid !== node.id) {
            selectednodeid = node.id;
            var selectedgraphsearchresults = this.state.graphsearchresults.filter(graphsearchresult => 
               graphsearchresult.subject === selectednodeid || 
               graphsearchresult.predicate === selectednodeid || 
               graphsearchresult.object === selectednodeid);
            this.selectGraphSearchResult(selectednodeid, selectedgraphsearchresults);
        }
        else {
            //Ala Double-click
            this.props.onAppendGraphSearchResults(selectednodeid)
            .then((data: any) => {
                var nodes: any[] = [];
                var links: any[] = [];
                var nodeids = this.state.nodes.map((node: any) => node.id);
                var linkids = this.state.links.map((link: any) => `${link.source}-${link.target}`);
                var graphsearchresults: { id: string; subject: string; predicate: string; object: string; document: string; }[] = [];
                data.triples.forEach((t: any, idx: any) => {
                    var longtriple = t.subject.length + t.predicate.length + t.object.length > 50 || 
                    t.subject.length > 25 || t.predicate.length > 25 || t.object.length > 25;
                    if (this.props.longtriples || (!this.props.longtriples && !longtriple)) {
                        [t.subject, t.predicate, t.object].forEach((nodeid: string) => {
                            if (!nodeids.includes(nodeid)) {
                                var node = this.state.nodes.find((n: any) => n.id === nodeid);
                                nodes.push({ id: nodeid, name: `<div style='text-align: center'>
                                <b><u>${nodeid}</u></b><br/>
                                <small>No additional information available.</small>
                                </div>`, val: 1, 
                                fx: node !== undefined ? node.fx : undefined, 
                                fy: node !== undefined ? node.fy : undefined });
                                nodeids.push(nodeid);
                            }
                        });
                        if (!linkids.includes(`${t.subject}-${t.predicate}`))
                            links.push({ source: t.subject, target: t.predicate});
                        if (!linkids.includes(`${t.predicate}-${t.object}`))
                            links.push({ source: t.predicate, target: t.object});
                        graphsearchresults.push({ id: "", subject: t.subject, predicate: t.predicate, object: t.object, document: "" });
                    }
                });
                this.setState({
                    nodes: [...this.state.nodes, ...nodes],
                    links: [...this.state.links, ...links],
                    graphsearchresults: [...this.state.graphsearchresults, ...graphsearchresults]
                });

                return Promise.resolve(true);
            })
            .then(() => { 
                var selectedgraphsearchresults = this.state.graphsearchresults.filter(graphsearchresult => 
                    graphsearchresult.subject === selectednodeid || 
                    graphsearchresult.predicate === selectednodeid || 
                    graphsearchresult.object === selectednodeid);
                this.selectGraphSearchResult(selectednodeid, selectedgraphsearchresults);
            });
        }
    }

    nodeRightClick(node: any, event: any) {
        //todo: decremental logic
        if (selectednodeid !== undefined && selectednodeid === node.id) {
            var nodes: any[] = [];
            var links: any[] = [];
            var nodeids: any[] = [];
            var linkids: any[] = [];
            var graphsearchresults = this.state.graphsearchresults.slice(0);
            graphsearchresults.length > 0 && graphsearchresults.forEach((graphsearchresult, idx, obj) => {
                if (graphsearchresult.subject === selectednodeid || 
                    graphsearchresult.predicate === selectednodeid || 
                    graphsearchresult.object === selectednodeid) {
                    if (!nodeids.includes(graphsearchresult.subject))
                        nodeids.push(graphsearchresult.subject);
                    if (!nodeids.includes(graphsearchresult.predicate))
                        nodeids.push(graphsearchresult.predicate);
                    if (!nodeids.includes(graphsearchresult.object))
                        nodeids.push(graphsearchresult.object);
                    if (!linkids.includes(`${graphsearchresult.subject}-${graphsearchresult.predicate}`))
                        linkids.push(`${graphsearchresult.subject}-${graphsearchresult.predicate}`);
                    if (!linkids.includes(`${graphsearchresult.predicate}-${graphsearchresult.object}`))
                        linkids.push(`${graphsearchresult.predicate}-${graphsearchresult.object}`);
                    obj.splice(idx, 1);
                }
            });
            nodes = this.state.nodes.filter((n: any) => !nodeids.includes(n.id));
            links = this.state.links.filter((l: any) => !linkids.includes(`${l.source.id}-${l.target.id}`));
            this.setState({
                nodes: nodes,
                links: links,
                graphsearchresults: graphsearchresults
            });
            selectednodeid = undefined;
            this.selectGraphSearchResult('', []);
        }
    }

    backgroundClick(event: any) {
        selectednodeid = undefined;
        this.selectGraphSearchResult('', []);
    }
}

export default GraphSearchResult;