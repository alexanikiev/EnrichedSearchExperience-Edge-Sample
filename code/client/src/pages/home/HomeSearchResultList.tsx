import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';
import ErrorBoundary from '../errors/ErrorBoundary';
const HomeSearchResultHelp = React.lazy(() => import("./HomeSearchResultHelp"));

interface IHomeSearchResultListProps {
}

interface IHomeSearchResultListState {
}

class HomeSearchResultList extends Component<IHomeSearchResultListProps, IHomeSearchResultListState> {
    
    constructor(props: IHomeSearchResultListProps) {
        super(props);
    }

    render() {
        return (
            <div>Home Search: Page is under construction</div>
        );
    } 
}

export default HomeSearchResultList;