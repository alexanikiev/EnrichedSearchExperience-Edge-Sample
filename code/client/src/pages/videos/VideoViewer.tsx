import React, { Component } from 'react';
import { Modal, Icon, Button, Label, Input } from 'semantic-ui-react';

interface IVideoViewerProps {
    video: { id: string, name: string, description: string, tags: string[], collections: string[] }
}

interface IVideoViewerState {
}

class VideoViewer extends Component<IVideoViewerProps, IVideoViewerState> {
    
    constructor(props: IVideoViewerProps) {
        super(props);

        this.readData = this.readData.bind(this);
    }

    readData() {
    }

    render() {
        return (
            <Modal closeOnDimmerClick={false} closeIcon trigger={<Button>View</Button>} onOpen={this.readData} >
                <Modal.Header>
                    <Icon name='book' />
                    {this.props.video.name}
                </Modal.Header>
                <Modal.Content>
                </Modal.Content>
            </Modal>
        );
    } 
}

export default VideoViewer;