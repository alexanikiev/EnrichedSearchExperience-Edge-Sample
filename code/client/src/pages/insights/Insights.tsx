import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { readInsights } from '../../actions/InsightActions';
import AddInsight from './AddInsight';
import InsightList from './InsightList';

interface IInsightsProps {
    insights: { id: string, name: string, description: string, notes: string, tags: string[], hierarchies: string[] }[],
    loading: boolean,
    error: object,
    timestamp: number,
    readInsights: (force: boolean) => void
}

interface IInsightsState {
}

interface IAppInsightsState {
    items: { id: string, name: string, description: string, notes: string, tags: string[], hierarchies: string[] }[],
    loading: boolean,
    error: object,
    timestamp: number
}

interface IAppState {
    insights: IAppInsightsState
}

class Insights extends Component<IInsightsProps, IInsightsState> {
    
    constructor(props: IInsightsProps) {
        super(props);

        this.refreshInsights = this.refreshInsights.bind(this);
    }

    componentDidMount() {
        this.props.readInsights(false);
    }

    refreshInsights() {
        this.props.readInsights(true);
    }

    render() {
        return (
            <Container>
                <InsightList 
                    insights={this.props.insights} 
                    loading={this.props.loading} 
                    error={this.props.error} 
                    timestamp={this.props.timestamp} 
                    onRefreshInsights={this.refreshInsights} 
                    insightspagenum={5} /> 
            </Container>
        );
    } 
}
  
const mapStateToProps = (state: IAppState) => ({
    insights: state.insights.items,
    loading: state.insights.loading,
    error: state.insights.error,
    timestamp: state.insights.timestamp
});
  
export default connect(mapStateToProps, { readInsights })(Insights);