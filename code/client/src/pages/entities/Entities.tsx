import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { readEntities } from '../../actions/EntityActions';
import EntityList from './EntityList';

interface IEntitiesProps {
    entities: { id: string, name: string, description: string, tags: string[], hierarchies: string[] }[],
    loading: boolean,
    error: object,
    timestamp: number,
    readEntities: (force: boolean) => void
}

interface IEntitiesState {
}

interface IAppEntitiesState {
    items: { id: string, name: string, description: string, tags: string[], hierarchies: string[] }[],
    loading: boolean,
    error: object,
    timestamp: number
}

interface IAppState {
    entities: IAppEntitiesState
}

class Entities extends Component<IEntitiesProps, IEntitiesState> {
    
    constructor(props: IEntitiesProps) {
        super(props);

        this.refreshEntities = this.refreshEntities.bind(this);
    }

    componentDidMount() {
        this.props.readEntities(false);
    }

    refreshEntities() {
        this.props.readEntities(true);
    }

    render() {
        return (
            <Container>
                <EntityList 
                    entities={this.props.entities} 
                    loading={this.props.loading} 
                    error={this.props.error} 
                    timestamp={this.props.timestamp} 
                    onRefreshEntities={this.refreshEntities} 
                    entitiespagenum={5} /> 
            </Container>
        );
    }
}

const mapStateToProps = (state: IAppState) => ({
    entities: state.entities.items,
    loading: state.entities.loading,
    error: state.entities.error,
    timestamp: state.entities.timestamp
});

export default connect(mapStateToProps, { readEntities })(Entities);