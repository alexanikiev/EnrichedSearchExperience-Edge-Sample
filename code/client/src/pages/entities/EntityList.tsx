import React, { Component, Suspense } from 'react';
import { Container, Search, Label, Button, List, Pagination, PaginationProps, Divider, Image, Grid } from 'semantic-ui-react';
import Entity from './Entity';
import ErrorBoundary from '../errors/ErrorBoundary';
const EntityHelp = React.lazy(() => import("./EntityHelp"));

interface IEntityListProps {
    entities: { id: string, name: string, description: string, tags: string[], hierarchies: string[] }[],
    loading: boolean,
    error: object,
    timestamp: number,
    onRefreshEntities: () => void,
    entitiespagenum: number
}

interface IEntityListState {
    entities: { id: string, name: string, description: string, tags: string[], hierarchies: string[] }[],
    _entities: { id: string, name: string, description: string, tags: string[], hierarchies: string[] }[],
    search: string,
    pagenum: number,
    pagesnum: number,
    entitiesnum: number
}

class EntityList extends Component<IEntityListProps, IEntityListState> {
    
    constructor(props: IEntityListProps) {
        super(props);

        this.state = {
            entities: this.props.entities,
            _entities: [],
            search: '',
            pagenum: 1,
            pagesnum: 0,
            entitiesnum: 0
        }

        this.refreshEntities = this.refreshEntities.bind(this);

        this.searchChange = this.searchChange.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    componentWillReceiveProps(props: IEntityListProps) {
        let entities: any[] = [];
        entities = this.searchEntities(props.entities, '');
        let _entities = this.pageEntities(entities, this.state.pagenum);
        this.setState({
            entities: props.entities,
            _entities: _entities,
            pagesnum: Math.ceil(entities.length / this.props.entitiespagenum),
            entitiesnum: entities.length
        });
    }

    refreshEntities() {
        this.props.onRefreshEntities();
    }

    searchChange(event: any) {
        let entities = [];
        entities = this.searchEntities(this.state.entities, event.target.value); 
        let _entities = this.pageEntities(entities, 1);
        this.setState({ 
            search: event.target.value,
            _entities : _entities,
            pagenum: 1,
            pagesnum: Math.ceil(entities.length / this.props.entitiespagenum),
            entitiesnum: entities.length
        });
    }

    pageChange(event: any, props: PaginationProps) {
        let entities = [];
        entities = this.searchEntities(this.state.entities, this.state.search); 
        let _entities = this.pageEntities(entities, props.activePage as number);
        this.setState({  
            _entities: _entities,
            pagenum: props.activePage as number 
        });
    }

    render() {
        let placeholdersnum = this.props.entitiespagenum - this.state._entities.length;
        placeholdersnum = placeholdersnum > 0 ? placeholdersnum : 0;

        let pager = (this.state.pagesnum <= 1) ? '' : 
            <Pagination totalPages={this.state.pagesnum} 
                        activePage={this.state.pagenum} 
                        onPageChange={this.pageChange} 
                        pointing
                        secondary />;

        return (
            <Container>
                <Grid columns={2}>
                    <Grid.Column textAlign='left'>
                        <Search value={this.state.search} onSearchChange={this.searchChange} showNoResults={false} placeholder="Search entities..." />
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                        <ErrorBoundary>
                            <Suspense fallback={<div>Loading ...</div>}>
                                <EntityHelp />
                            </Suspense>
                        </ErrorBoundary>
                    </Grid.Column>
                </Grid>
                <br/>
                <small>Number of entities:&nbsp;{this.state.entitiesnum}/{this.state.entities.length}</small>
                <Divider hidden />
                { this.props.error ? <Label>{this.props.error}</Label> : '' }
                { this.props.loading ? <Label>Loading ...</Label> : '' }
                {pager}
                <hr color="grey" />
                <List relaxed>
                    {(this.state._entities.length === 0) ?
                        <p>No entities here. (Sync an entity or change a filter)</p> :
                        this.state._entities.map(entity =>
                            <Entity entity={entity} />
                        )
                    }
                    {[...Array(placeholdersnum)].map(x => 
                    <div>
                        <Divider hidden />
                            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' disabled />
                        <Divider hidden />
                    </div>
                    )}
                </List>
                {pager}
                <Divider hidden />
                <small>{this.props.timestamp}</small>
            </Container>
        );
    }
    
    searchEntities(entities: any[], search: string) {
        if (search !== '') {
            return entities.filter(entity => {
                    return entity.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
                }
            );  
        } 
        return entities;
    }

    pageEntities(entities: any[], pagenum: number) {
        let start = (pagenum - 1) * this.props.entitiespagenum;
        let end = start + this.props.entitiespagenum;
        return entities.slice(start, end);
    }
}

export default EntityList;

/*
&nbsp;
<Button type="button" value="Refresh" onClick={this.refreshEntities} />
<Divider hidden />
*/