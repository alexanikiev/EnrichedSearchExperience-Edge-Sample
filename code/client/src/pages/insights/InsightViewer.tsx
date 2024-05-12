import React, { Component } from 'react';
import { Modal, Icon, Button } from 'semantic-ui-react';

interface IInsightViewerProps {
    insight: { id: string, name: string, description: string, tags: string[], hierarchies: string[] }
}

interface IInsightViewerState {
}

class InsightViewer extends Component<IInsightViewerProps, IInsightViewerState> {
    
    constructor(props: IInsightViewerProps) {
        super(props);

        this.readData = this.readData.bind(this);
    }

    readData() {
        fetch(`http://${window.location.hostname}:30990/mongo/insight/${this.props.insight.id}`)
        .then(() => { })
        .catch(error => console.log(error));
    }

    render() {
        return (
            <Modal closeOnDimmerClick={false} closeIcon trigger={<Button>View</Button>} onOpen={this.readData} >
                <Modal.Header>
                    <Icon name='lightbulb' />
                    {this.props.insight.name}
                </Modal.Header>
                <Modal.Content>
                    {this.props.insight.description}
                    <br/><br/>
                    Hierarchies:&nbsp;{this.props.insight.hierarchies.length}
                    <br/>
                    {this.props.insight.hierarchies.map(h =>
                        <div>{h}&nbsp;;&nbsp;</div>
                    )}
                    <br/><br/>
                    Tags:&nbsp;{this.props.insight.tags.length}
                    <br/>
                    {this.props.insight.tags.map(t =>
                        <div>{t}&nbsp;;&nbsp;</div>
                    )}
                </Modal.Content>
            </Modal>
        );
    }  
}

export default InsightViewer;