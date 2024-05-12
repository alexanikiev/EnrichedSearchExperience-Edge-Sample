import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import HierarchyElement from './HierarchyElement';

interface IHierarchyProps {
    hierarchy: { id: string, name: string, description: string, children: object[] }
}

interface IHierarchyState {
    id: string,
    name: string,
    description: string,
    children: object[]

}

class Hierarchy extends Component<IHierarchyProps, IHierarchyState> {
    
    constructor(props: IHierarchyProps) {
        super(props);

        this.state = {
            id: props.hierarchy.id,
            name: props.hierarchy.name,
            description: props.hierarchy.description,
            children: props.hierarchy.children
        };
    }

    render() {
        return (
            <List.Item>
                <List.Content>
                    <HierarchyElement 
                        id={this.props.hierarchy.id}
                        name={this.props.hierarchy.name} 
                        description={this.props.hierarchy.description}
                        children={this.props.hierarchy.children}
                        master={true} />
                    <hr color="grey" />
                </List.Content>
            </List.Item>
        );
    }
}

export default Hierarchy;