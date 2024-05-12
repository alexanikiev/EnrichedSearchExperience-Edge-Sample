import React, { Component, Suspense } from 'react';
import { Container, List, Icon, Divider, Search, Label, Button, Pagination, PaginationProps, Image, Grid } from 'semantic-ui-react';
import Hierarchy from './Hierarchy';
import ErrorBoundary from '../errors/ErrorBoundary';
const HierarchyHelp = React.lazy(() => import("./HierarchyHelp"));

interface IHierarchyListProps {
    hierarchies: { id: string, name: string, description: string, children: object[] }[],
    loading: boolean,
    error: object,
    timestamp: number,
    onRefreshHierarchies: () => void,
    hierarchiespagenum: number
}

interface IHierarchyListState {
    hierarchies: { id: string, name: string, description: string, children: object[] }[],
    _hierarchies: { id: string, name: string, description: string, children: object[] }[],
    search: string,
    pagenum: number,
    pagesnum: number,
    hierarchiesnum: number
}

class HierarchyList extends Component<IHierarchyListProps, IHierarchyListState> {
    
    constructor(props: IHierarchyListProps) {
        super(props);

        this.state = {
            hierarchies: this.props.hierarchies,
            _hierarchies: [],
            search: '',
            pagenum: 1,
            pagesnum: 0,
            hierarchiesnum: 0
        };

        this.refreshHierarchies = this.refreshHierarchies.bind(this);

        this.searchChange = this.searchChange.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    componentWillReceiveProps(props: IHierarchyListProps) {
        let hierarchies: any[] = [];
        hierarchies = this.searchHierarchies(props.hierarchies, '');
        let _hierarchies = this.pageHierarchies(hierarchies, this.state.pagenum);
        this.setState({
            hierarchies: props.hierarchies,
            _hierarchies: _hierarchies,
            pagesnum: Math.ceil(hierarchies.length / this.props.hierarchiespagenum),
            hierarchiesnum: hierarchies.length
        });
    }

    refreshHierarchies() {
        this.props.onRefreshHierarchies();
    }

    searchChange(event: any) {
        let hierarchies = [];
        hierarchies = this.searchHierarchies(this.state.hierarchies, event.target.value); 
        let _hierarchies = this.pageHierarchies(hierarchies, 1);
        this.setState({ 
            search: event.target.value,
            _hierarchies : _hierarchies,
            pagenum: 1,
            pagesnum: Math.ceil(hierarchies.length / this.props.hierarchiespagenum),
            hierarchiesnum: hierarchies.length
        });
    }

    pageChange(event: any, props: PaginationProps) {
        let hierarchies = [];
        hierarchies = this.searchHierarchies(this.state.hierarchies, this.state.search); 
        let _hierarchies = this.pageHierarchies(hierarchies, props.activePage as number);
        this.setState({  
            _hierarchies: _hierarchies,
            pagenum: props.activePage as number 
        });
    }

    render() {
        let placeholdersnum = this.props.hierarchiespagenum - this.state._hierarchies.length;
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
                        <Search value={this.state.search} onSearchChange={this.searchChange} showNoResults={false} placeholder="Search hierarchies..." />
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                        <ErrorBoundary>
                            <Suspense fallback={<div>Loading ...</div>}>
                                <HierarchyHelp />
                            </Suspense>
                        </ErrorBoundary>
                    </Grid.Column>
                </Grid>
                <br/>
                <small>Number of hierarchies:&nbsp;{this.state.hierarchiesnum}/{this.state.hierarchies.length}</small>
                <Divider hidden />
                { this.props.error ? <Label>{this.props.error}</Label> : '' }
                { this.props.loading ? <Label>Loading ...</Label> : '' }
                {pager}
                <hr color="grey" />
                <List relaxed>
                    {(this.state._hierarchies.length === 0) ?
                        <p>No hierarchies here. (Create and/or select a hierarchy or change a filter)</p> :
                        this.state._hierarchies.map(hierarchy =>
                            <Hierarchy hierarchy={hierarchy} />
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
            </Container>
        );
    } 

    searchHierarchies(hierarchies: any[], search: string) {
        if (search !== '') {
            return hierarchies.filter(hierarchy => {
                    return hierarchy.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
                }
            );  
        } 
        return hierarchies;
    }

    pageHierarchies(hierarchies: any[], pagenum: number) {
        let start = (pagenum - 1) * this.props.hierarchiespagenum;
        let end = start + this.props.hierarchiespagenum;
        return hierarchies.slice(start, end);
    }
}

export default HierarchyList;

/*
&nbsp;
<Button type="button" value="Refresh" onClick={this.refreshHierarchies} />
<Divider hidden />
*/