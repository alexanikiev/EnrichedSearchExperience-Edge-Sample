import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';
import mongodb_logo from '../../logos/mongodb/MongoDB_Logo_FullColorBlack_RGB.svg';

interface IHomeSearchResultHelpProps {
}

interface IHomeSearchResultHelpState {
}

class HomeSearchResultHelp extends Component<IHomeSearchResultHelpProps, IHomeSearchResultHelpState> {
    
    constructor(props: IHomeSearchResultHelpProps) {
        super(props);
    }

    render() {
        return (
            <div>
                HomeSearchResultHelp: Page is under construction
                <br/>
                <img src={mongodb_logo} alt="MongoDB_Logo_FullColorBlack_RGB" width="150" height="75" />
                <br/>
                https://www.elastic.co/brand
                https://www.mongodb.com/brand-resources
                https://www.apache.org/foundation/marks/pmcs
            </div>
        );
    } 
}

export default HomeSearchResultHelp;