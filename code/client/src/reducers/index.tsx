import { combineReducers } from 'redux';
import collectionReducer from './CollectionReducer';
import docSearchReducer from './DocSearchReducer';
import documentReducer from './DocumentReducer';
import entityReducer from './EntityReducer';
import graphSearchReducer from './GraphSearchReducer';
import hierarchyReducer from './HierarchyReducer';
import homeReducer from './HomeReducer';
import homeSearchReducer from './HomeSearchReducer';
import insightReducer from './InsightReducer';
import textSearchReducer from './TextSearchReducer';
import topicReducer from './TopicReducer';
import userReducer from './UserReducer';

export default combineReducers({
    collections: collectionReducer, 
    docsearchresults: docSearchReducer,
    documents: documentReducer,
    entities: entityReducer,
    graphsearchresults: graphSearchReducer,
    hierarchies: hierarchyReducer,
    homesearchresults: homeSearchReducer,
    home: homeReducer,
    insights: insightReducer,
    textsearchresults: textSearchReducer,
    topics: topicReducer,
    users: userReducer
});