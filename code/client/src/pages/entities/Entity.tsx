import React, { Component, Suspense } from 'react';
import { Container, Label, List, Icon, Flag, FlagNameValues } from 'semantic-ui-react';
import ErrorBoundary from '../errors/ErrorBoundary';
import * as Countries from "../../Countries";
const EntityViewer = React.lazy(() => import("./EntityViewer"));

interface IEntityProps {
    entity: { id: string, name: string, description: string, tags: string[], hierarchies: string[] }
}

interface IEntityState {
}

class Entity extends Component<IEntityProps, IEntityState> {
    
    constructor(props: IEntityProps) {
        super(props);
    }

    render() {
        var flag = '';
        var countryIndex = Countries.countries.map((country: any) => country.name).indexOf(this.props.entity.name);
        if (countryIndex !== -1) {
            flag = Countries.countries[countryIndex].flag;
        }

        return (
            <List.Item>
                <List.Content>
                    {(flag !== '') ?
                        <Flag name={flag as FlagNameValues} /> :
                        <Icon name={(this.props.entity.name === "Person") ? "address book" : 
                                    (this.props.entity.name === "Organization" ? "building" : 
                                    (this.props.entity.name === "Location" ? "map" : "tag"))} />
                    }
                    <b>{this.props.entity.name}</b>
                    <br/>
                    <i>{this.props.entity.description}</i>
                    <br/><br/>
                    <ErrorBoundary>
                        <Suspense fallback={<div>Loading ...</div>}>
                            <EntityViewer 
                                entity={this.props.entity} 
                                flag={flag} />
                        </Suspense>
                    </ErrorBoundary>
                    <br/><br/>
                    Hierarchies:<br/>
                    {this.props.entity.hierarchies.map(hierarchy => <Label simple>{hierarchy}</Label>)}
                    <br/>
                    Tags:<br/>
                    {this.props.entity.tags.map(tag => <Label simple>{tag}</Label>)}
                    <hr color="grey" />
                </List.Content>
            </List.Item>
        );
    } 
}

export default Entity;