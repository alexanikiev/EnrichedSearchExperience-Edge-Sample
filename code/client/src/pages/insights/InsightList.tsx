import React, { Component, Suspense } from 'react';
import { Container, Search, Label, Button, List, Pagination, PaginationProps, Divider, Image, Grid } from 'semantic-ui-react';
import Insight from './Insight';
import ErrorBoundary from '../errors/ErrorBoundary';
const InsightHelp = React.lazy(() => import("./InsightHelp"));

interface IInsightListProps {
    insights: { id: string, name: string, description: string, notes: string, tags: string[], hierarchies: string[] }[],
    loading: boolean,
    error: object,
    timestamp: number,
    onRefreshInsights: () => void,
    insightspagenum: number
}

interface IInsightListState {
    insights: { id: string, name: string, description: string, notes: string, tags: string[], hierarchies: string[] }[],
    _insights: { id: string, name: string, description: string, notes: string, tags: string[], hierarchies: string[] }[],
    search: string,
    pagenum: number,
    pagesnum: number,
    insightsnum: number
}

class InsightList extends Component<IInsightListProps, IInsightListState> {
    
    constructor(props: IInsightListProps) {
        super(props);

        this.state = {
            insights: this.props.insights,
            _insights: [],
            search: '',
            pagenum: 1,
            pagesnum: 0,
            insightsnum: 0
        }

        this.refreshInsights = this.refreshInsights.bind(this);

        this.searchChange = this.searchChange.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    componentWillReceiveProps(props: IInsightListProps) {
        let insights: any[] = [];
        insights = this.searchInsights(props.insights, '');
        let _insights = this.pageInsights(insights, this.state.pagenum);
        this.setState({
            insights: props.insights,
            _insights: _insights,
            pagesnum: Math.ceil(insights.length / this.props.insightspagenum),
            insightsnum: insights.length
        });
    }

    refreshInsights() {
        this.props.onRefreshInsights();
    }

    searchChange(event: any) {
        let insights = [];
        insights = this.searchInsights(this.state.insights, event.target.value); 
        let _insights = this.pageInsights(insights, 1);
        this.setState({ 
            search: event.target.value,
            _insights : _insights,
            pagenum: 1,
            pagesnum: Math.ceil(insights.length / this.props.insightspagenum),
            insightsnum: insights.length
        });
    }

    pageChange(event: any, props: PaginationProps) {
        let insights = [];
        insights = this.searchInsights(this.state.insights, this.state.search); 
        let _insights = this.pageInsights(insights, props.activePage as number);
        this.setState({  
            _insights: _insights,
            pagenum: props.activePage as number 
        });
    }

    render() {
        let placeholdersnum = this.props.insightspagenum - this.state._insights.length;
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
                        <Search value={this.state.search} onSearchChange={this.searchChange} showNoResults={false} placeholder="Search insights..." />
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                        <ErrorBoundary>
                        <Suspense fallback={<div>Loading ...</div>}>
                            <InsightHelp />
                        </Suspense>
                    </ErrorBoundary>
                    </Grid.Column>
                </Grid>
                <br/>
                <small>Number of insights:&nbsp;{this.state.insightsnum}/{this.state.insights.length}</small>
                <Divider hidden />
                { this.props.error ? <Label>{this.props.error}</Label> : '' }
                { this.props.loading ? <Label>Loading ...</Label> : '' }
                {pager}
                <hr color="grey" />
                <List relaxed>
                    {(this.state._insights.length === 0) ?
                        <p>No insights here. (Sync an insight or change a filter)</p> :
                        this.state._insights.map(insight =>
                            <Insight insight={insight} />
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

    searchInsights(insights: any[], search: string) {
        if (search !== '') {
            return insights.filter(insight => {
                    return insight.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
                }
            );  
        } 
        return insights;
    }

    pageInsights(insights: any[], pagenum: number) {
        let start = (pagenum - 1) * this.props.insightspagenum;
        let end = start + this.props.insightspagenum;
        return insights.slice(start, end);
    }
}

export default InsightList;

/*
&nbsp;
<Button type="button" value="Refresh" onClick={this.refreshInsights} />
<Divider hidden />
*/