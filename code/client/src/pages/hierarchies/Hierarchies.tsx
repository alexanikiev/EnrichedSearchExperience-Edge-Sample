import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { readHierarchies } from '../../actions/HierarchyActions';
import HierarchyList from './HierarchyList';

interface IHierarchiesProps {
    hierarchies: { id: string, name: string, description: string, children: object[] }[],
    loading: boolean,
    error: object,
    timestamp: number,
    readHierarchies: (force: boolean) => void
}

interface IHierarchiesState {
}

interface IAppEntitiesState {
    items: { id: string, name: string, description: string, children: object[] }[],
    loading: boolean,
    error: object,
    timestamp: number
}

interface IAppState {
    hierarchies: IAppEntitiesState
}

class Hierarchies extends Component<IHierarchiesProps, IHierarchiesState> {
    
    constructor(props: IHierarchiesProps) {
        super(props);

        this.refreshHierarchies = this.refreshHierarchies.bind(this);
    }

    componentDidMount() {
        this.props.readHierarchies(false);
    }

    refreshHierarchies() {
        this.props.readHierarchies(true);
    }

    render() {
        return (
            <Container>
                <HierarchyList 
                    hierarchies={this.props.hierarchies} 
                    loading={this.props.loading} 
                    error={this.props.error} 
                    timestamp={this.props.timestamp} 
                    onRefreshHierarchies={this.refreshHierarchies} 
                    hierarchiespagenum={5} /> 
            </Container>
        );
    } 
}

const mapStateToProps = (state: IAppState) => ({
    hierarchies: state.hierarchies.items,
    loading: state.hierarchies.loading,
    error: state.hierarchies.error,
    timestamp: state.hierarchies.timestamp
});

export default connect(mapStateToProps, { readHierarchies })(Hierarchies);