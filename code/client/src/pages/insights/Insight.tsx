import React, { Component, Suspense } from 'react';
import { Container, Label, List, Icon } from 'semantic-ui-react';
import ErrorBoundary from '../errors/ErrorBoundary';
const InsightViewer = React.lazy(() => import("./InsightViewer"));

interface IInsightProps {
    insight: { id: string, name: string, description: string, notes: string, tags: string[], hierarchies: string[] }
}

interface IInsightState {
}

class Insight extends Component<IInsightProps, IInsightState> {
    
    constructor(props: IInsightProps) {
        super(props);
    }

    render() {
        return (
            <List.Item>
                <List.Content>
                    <Icon name='lightbulb' />
                    <b>{this.props.insight.name}</b>
                    <br/>
                    <i>{this.props.insight.description}</i>
                    <br/><br/>
                    <ErrorBoundary>
                        <Suspense fallback={<div>Loading ...</div>}>
                            <InsightViewer insight={this.props.insight} />
                        </Suspense>
                    </ErrorBoundary>
                    <br/><br/>
                    Hierarchies:<br/>
                    {this.props.insight.hierarchies.map(hierarchy => <Label simple>{hierarchy}</Label>)}
                    <br/>
                    Tags:<br/>
                    {this.props.insight.tags.map(tag => <Label simple>{tag}</Label>)}
                    <hr color="grey" />
                </List.Content>
            </List.Item>
        );
    }  
}

export default Insight;

/*
<br/>
<small>{this.props.insight.notes}</small>
*/