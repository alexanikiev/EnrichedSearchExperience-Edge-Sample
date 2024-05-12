import React, { Component } from 'react';
import { Modal, Icon, Button } from 'semantic-ui-react';

interface ITopicViewerProps {
    topic: { id: string, name: string, description: string, tags: string[], hierarchies: string[] }
}

interface ITopicViewerState {
}

class TopicViewer extends Component<ITopicViewerProps, ITopicViewerState> {
    
    constructor(props: ITopicViewerProps) {
        super(props);

        this.readData = this.readData.bind(this);
    }

    readData() {
        fetch(`http://${window.location.hostname}:30990/mongo/topic/${this.props.topic.id}`)
        .then(() => { })
        .catch(error => console.log(error));
    }

    render() {
        return (
            <Modal closeOnDimmerClick={false} closeIcon trigger={<Button>View</Button>} onOpen={this.readData} >
                <Modal.Header>
                    <Icon name='pencil' />
                    {this.props.topic.name}
                </Modal.Header>
                <Modal.Content>
                    {this.props.topic.description}
                    <br/><br/>
                    Hierarchies:&nbsp;{this.props.topic.hierarchies.length}
                    <br/>
                    {this.props.topic.hierarchies.map(h =>
                        <div>{h}&nbsp;;&nbsp;</div>
                    )}
                    <br/><br/>
                    Tags:&nbsp;{this.props.topic.tags.length}
                    <br/>
                    {this.props.topic.tags.map(t =>
                        <div>{t}&nbsp;;&nbsp;</div>
                    )}
                </Modal.Content>
            </Modal>
        );
    }  
}

export default TopicViewer;