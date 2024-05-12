import React, { Component } from 'react';
import { Divider, Icon, Flag, FlagNameValues } from 'semantic-ui-react';
import * as Countries from "../../Countries";

interface IHierarchyElementProps {
    id: string,
    name: string,
    description: string,
    children: object[],
    master?: boolean
}

interface IHierarchyElementState {
    visible: boolean
}

class HierarchyElement extends Component<IHierarchyElementProps, IHierarchyElementState> {
    
    constructor(props: IHierarchyElementProps) {
        super(props);

        this.state = {
            visible: true
        };
    }

    render(): any {
        var flag = '';
        var countryIndex = Countries.countries.map((country: any) => country.name).indexOf(this.props.name);
        if (countryIndex !== -1) {
            flag = Countries.countries[countryIndex].flag;
        }

        var children;
        var className;

        if (this.props.children !== undefined && 
            this.props.children.length > 0) {
            children = this.props.children.map((element: any) =>
                <HierarchyElement 
                    id={element.id}
                    name={element.name} 
                    description={''}
                    children={element.children}
                    master={false} />
            );
  
            className = 'togglable';
            if (this.state.visible) {
                className += ' minus square icon';
            } else {
                className += ' plus square icon';
            }
        }
        else {
            //leaf level, no children (or children property is an empty array)
            className = 'square outline icon';
        }

        var style;
        if (!this.state.visible) {
            style = {display: "none"};
        }

        return (
            <div>
                <div className="item">
                    <i className={className} onClick={this.toggleElement}></i>
                    { this.props.master ? 
                    <span>
                        {this.props.name}
                        &nbsp;
                        <small>(#elems:&nbsp;{this.props.children !== undefined ? 
                            this.props.children.length : 0 })</small>
                    </span> :
                    <span>
                        {(flag !== '') ?
                            <Flag name={flag as FlagNameValues} /> :
                            <Icon name={"tag"} />
                        }
                        {this.props.name}
                    </span> }
                    <br/>
                </div>
                <ul style={style}>
                    {children}
                </ul>
            </div>
        );
    } 

    toggleElement = () => {
        this.setState({
            visible: !this.state.visible
        });
    }
}

export default HierarchyElement;