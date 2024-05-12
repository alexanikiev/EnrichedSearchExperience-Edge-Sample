import React, { Component } from 'react';
import { Modal, Icon, Button, Flag, FlagNameValues } from 'semantic-ui-react';

interface IEntityViewerProps {
    entity: { id: string, name: string, description: string, tags: string[], hierarchies: string[] },
    flag: string
}

interface IEntityViewerState {
}

class EntityViewer extends Component<IEntityViewerProps, IEntityViewerState> {
    
    constructor(props: IEntityViewerProps) {
        super(props);

        this.readData = this.readData.bind(this);
    }

    readData() {
        fetch(`http://${window.location.hostname}:30990/mongo/entity/${this.props.entity.id}`)
        .then(() => { })
        .catch(error => console.log(error));
    }

    render() {
        return (
            <Modal closeOnDimmerClick={false} closeIcon trigger={<Button>View</Button>} onOpen={this.readData} >
                <Modal.Header>
                    {(this.props.flag !== '') ?
                        <Flag name={this.props.flag as FlagNameValues} /> :
                        <Icon name={(this.props.entity.name === "Person") ? "address book" : 
                                    (this.props.entity.name === "Organization" ? "building" : 
                                    (this.props.entity.name === "Location" ? "map" : "tag"))} />
                    }
                    {this.props.entity.name}
                </Modal.Header>
                <Modal.Content>
                    {this.props.entity.description}
                    <br/><br/>
                    Hierarchies:&nbsp;{this.props.entity.hierarchies.length}
                    <br/>
                    {this.props.entity.hierarchies.map(h =>
                        <div>{h}&nbsp;;&nbsp;</div>
                    )}
                    <br/><br/>
                    Tags:&nbsp;{this.props.entity.tags.length}
                    <br/>
                    {this.props.entity.tags.map(t =>
                        <div>{t}&nbsp;;&nbsp;</div>
                    )}
                </Modal.Content>
            </Modal>
        );
    } 
}

export default EntityViewer;