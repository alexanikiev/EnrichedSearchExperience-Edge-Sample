import React, { Component } from 'react';

import * as Constants from "./Constants";
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Icon, Popup, List, Checkbox, Label } from 'semantic-ui-react';

interface IHeaderProps {
}

interface IHeaderState {
  statusDocument: boolean,
  statusGraph: boolean,
  statusText: boolean,
  page: string
}

class Header extends Component<IHeaderProps, IHeaderState> {
    constructor(props: IHeaderProps) {
        super(props);

        this.state = {
            statusDocument: false,
            statusGraph: false,
            statusText: false,
            page: this.linkChange(window.location.pathname)
        }

        this.linkChange = this.linkChange.bind(this);
    }

    readMongoTestDocument() {
        return fetch(`http://${window.location.hostname}:30990/mongo/document/test1`)
        .then(response => response.json());
    }

    readElasticSearchTestDocument() {
        /*return fetch(`http://${window.location.hostname}:30990/elasticsearch/document/test1`)
        .then(response => response.json());*/
        return Promise.resolve(true);
    }

    readSqlTestDocument() {
        return fetch(`http://${window.location.hostname}:30990/sql/document/test1`)
        .then(response => response.json());
    }

    componentDidMount() {
        Promise.all([this.readMongoTestDocument(), 
                     this.readElasticSearchTestDocument(),
                     this.readSqlTestDocument()])
        .then(data => {
            this.setState({
                statusDocument: data !== undefined && data[0] !== undefined,
                statusGraph: data !== undefined && data[1] !== undefined,
                statusText: data !== undefined && data[2] !== undefined
            });
        }).
        catch(error => console.log(error));
    }

    linkChange(route: string) {

        let page = '';
  
        switch(route) {
          case Constants.HOME_ROUTE:
            page = 'Home';
            break;
          case Constants.DOCUMENTS_ROUTE:
            page = 'Documents';
            break;
          case Constants.DOCSEARCH_ROUTE:
            page = 'Document Search';
            break;
          case Constants.GRAPHSEARCH_ROUTE:
            page = 'Graph Search';
            break;
          case Constants.TEXTSEARCH_ROUTE:
            page = 'Text Search';
            break;
          case Constants.ENTITIES_ROUTE:
            page = 'Entities';
            break;
          case Constants.TOPICS_ROUTE:
            page = 'Topics';
            break;
          case Constants.INSIGHTS_ROUTE:
            page = 'Insights';
            break;
          case Constants.HIERARCHIES_ROUTE:
            page = 'Hierarchies';
            break;
          case Constants.SETTINGS_ROUTE:
            page = 'Settings';
            break;
          case Constants.HELP_ROUTE:
            page = 'Help';
            break;
          case Constants.PICTURES_ROUTE:
            page = 'Images';
            break;
          case Constants.VIDEOS_ROUTE:
            page = 'Audios';
            break;
          default:
            page = 'Home';
        }
  
        this.setState({
          page: page
        });
  
        return page;
      }

    render() {
      return (
        <Menu>
          <Dropdown item icon='bars' simple>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={Constants.HOME_ROUTE} onClick={() => this.linkChange(Constants.HOME_ROUTE)} value={Constants.HOME_ROUTE}>Home</Dropdown.Item>
              <Dropdown.Item as={Link} to={Constants.DOCUMENTS_ROUTE} onClick={() => this.linkChange(Constants.DOCUMENTS_ROUTE)} value={Constants.DOCUMENTS_ROUTE}>Documents</Dropdown.Item>
              <Dropdown.Item as={Link} to={Constants.DOCSEARCH_ROUTE} onClick={() => this.linkChange(Constants.DOCSEARCH_ROUTE)} value={Constants.DOCSEARCH_ROUTE}>Document Search</Dropdown.Item>
              <Dropdown.Item as={Link} to={Constants.GRAPHSEARCH_ROUTE} onClick={() => this.linkChange(Constants.GRAPHSEARCH_ROUTE)} value={Constants.GRAPHSEARCH_ROUTE}>Graph Search</Dropdown.Item>
              <Dropdown.Item as={Link} to={Constants.TEXTSEARCH_ROUTE} onClick={() => this.linkChange(Constants.TEXTSEARCH_ROUTE)} value={Constants.TEXTSEARCH_ROUTE}>Text Search</Dropdown.Item>
              <Dropdown.Item as={Link} to={Constants.INSIGHTS_ROUTE} onClick={() => this.linkChange(Constants.INSIGHTS_ROUTE)} value={Constants.INSIGHTS_ROUTE}>Insights</Dropdown.Item>
              <Dropdown.Item as={Link} to={Constants.ENTITIES_ROUTE} onClick={() => this.linkChange(Constants.ENTITIES_ROUTE)} value={Constants.ENTITIES_ROUTE}>Entities</Dropdown.Item>
              <Dropdown.Item as={Link} to={Constants.TOPICS_ROUTE} onClick={() => this.linkChange(Constants.TOPICS_ROUTE)} value={Constants.TOPICS_ROUTE}>Topics</Dropdown.Item>
              <Dropdown.Item as={Link} to={Constants.HIERARCHIES_ROUTE} onClick={() => this.linkChange(Constants.HIERARCHIES_ROUTE)} value={Constants.HIERARCHIES_ROUTE}>Hierarchies</Dropdown.Item>
              <Dropdown.Item as={Link} to={Constants.SETTINGS_ROUTE} onClick={() => this.linkChange(Constants.SETTINGS_ROUTE)} value={Constants.SETTINGS_ROUTE}>Settings</Dropdown.Item>
              <Dropdown.Item as={Link} to={Constants.HELP_ROUTE} onClick={() => this.linkChange(Constants.HELP_ROUTE)} value={Constants.HELP_ROUTE}>Help</Dropdown.Item>
              <Dropdown.Item as={Link} to={Constants.PICTURES_ROUTE} onClick={() => this.linkChange(Constants.PICTURES_ROUTE)} value={Constants.PICTURES_ROUTE}>Images</Dropdown.Item>
              <Dropdown.Item as={Link} to={Constants.VIDEOS_ROUTE} onClick={() => this.linkChange(Constants.VIDEOS_ROUTE)} value={Constants.VIDEOS_ROUTE}>Audios</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item>
            <Icon name='microsoft' />
            <b>Enriched Search Experience Edge</b>
          </Menu.Item>
          <Menu.Item>
            {this.state.page}
          </Menu.Item>
          <Menu.Item>
            <Popup
                key='UserCollectionsPopup'
                trigger={<div><Icon name="folder" color="blue" disabled />&nbsp;3</div>}
                header="User collections"
                content={
                  <List>
                    <List.Item><Checkbox />&nbsp;alexani</List.Item>
                    <List.Item><Checkbox checked />&nbsp;coll1</List.Item>
                    <List.Item><Checkbox checked />&nbsp;coll2</List.Item>
                  </List>
                }
                flowing hoverable
            />
            &nbsp;|&nbsp;
            <Popup
                key='UserHierarchiesPopup'
                trigger={<div><Icon name="share alternate" color="blue" disabled />&nbsp;3</div>}
                header="User hierarchies"
                content={
                  <List>
                    <List.Item><Checkbox />&nbsp;alexani</List.Item>
                    <List.Item><Checkbox checked />&nbsp;Ebola outbreak 2016</List.Item>
                    <List.Item><Checkbox />&nbsp;hier2</List.Item>
                  </List>
                }
                flowing hoverable
            />
            &nbsp;|&nbsp;
            <Popup
                key='UserTagsPopup'
                trigger={<div><Icon name="tag" color="blue" disabled />&nbsp;2</div>}
                header="User tags"
                content={
                  <List>
                    <List.Item><Checkbox checked />&nbsp;tag1</List.Item>
                    <List.Item><Checkbox checked />&nbsp;tag2</List.Item>
                  </List>
                }
                flowing hoverable
            />
          </Menu.Item>
          <Menu.Item position="right">
            { false ? <Label circular color={this.state.statusDocument ? "red" : "green" } size="mini">D</Label> : '' }
            { false ? <Label circular color={this.state.statusGraph ? "red" : "green" } size="mini">G</Label> : '' }
            { false ? <Label circular color={this.state.statusText ? "red" : "green" } size="mini">T</Label> : '' }
            <Popup
                key='UserPopup'
                trigger={<Icon name="user circle" size="large" />}
                header="Alex Anikiiev"
                content="Edge user"
                flowing hoverable
            />
          </Menu.Item>
        </Menu>
      );
    }
  }

  export default Header;