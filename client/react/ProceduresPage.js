import { CardText, CardTitle } from 'material-ui/Card';
import {Tab, Tabs} from 'material-ui/Tabs';
import { GlassCard, VerticalCanvas, FullPageCanvas, Glass } from 'meteor/clinical:glass-ui';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import ProcedureDetail from './ProcedureDetail';
import ProceduresTable from './ProceduresTable';

import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';

Session.setDefault('selectedProcedureId', false);
Session.setDefault('fhirVersion', 'v1.0.2');

export class ProceduresPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        tab: {
          borderBottom: '1px solid lightgray',
          borderRight: 'none'
        }
      },
      tabIndex: Session.get('procedurePageTabIndex'),
      procedureSearchFilter: Session.get('procedureSearchFilter'),
      selectedProcedureId: Session.get('selectedProcedureId'),
      fhirVersion: Session.get('fhirVersion'),
      selectedProcedure: false
    };

    if (Session.get('selectedProcedureId')){
      data.selectedProcedure = Procedures.findOne({_id: Session.get('selectedProcedureId')});
    } else {
      data.selectedProcedure = false;
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    return data;
  }
  onInsert(procedureId){
    HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Procedures", recordId: procedureId});
    Session.set('procedurePageTabIndex', 1);
    Session.set('selectedProcedureId', false);
  }
  onUpdate(procedureId){
    HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Procedures", recordId: procedureId});
    Session.set('procedurePageTabIndex', 1);
    Session.set('selectedProcedureId', false);
}
  onRemove(procedureId){
    HipaaLogger.logEvent({eventType: "delete", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Procedures", recordId: procedureId});
    Session.set('procedurePageTabIndex', 1);
    Session.set('selectedProcedureId', false);
  }
  onCancel(){
    Session.set('procedurePageTabIndex', 1);
  }

  handleTabChange(index){
    Session.set('procedurePageTabIndex', index);
  }

  onNewTab(){
    Session.set('selectedProcedureId', false);
    Session.set('procedureUpsert', false);
  }

  render() {
    if(process.env.NODE_ENV === "test") console.log('In ProceduresPage render');
    return (
      <div id='proceduresPage'>
        <FullPageCanvas>
          <GlassCard height='auto'>
            <CardTitle title='Procedures' />
            <CardText>
              <Tabs id="proceduresPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}>
               <Tab className='newProcedureTab' label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0}>
                 <ProcedureDetail 
                  id='newProcedure' 
                  fhirVersion={ this.data.fhirVersion }
                  procedure={ this.data.selectedProcedure }
                  procedureId={ this.data.selectedProcedureId } 
                  showDatePicker={true} 
                  onInsert={ this.onInsert }
                />
               </Tab>
               <Tab className="procedureListTab" label='Procedures' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                <ProceduresTable 
                  noDataMessagePadding={100}
                  // hideIdentifier={true} 
                  displayDates={true} />
               </Tab>
               <Tab className="procedureDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                 <ProcedureDetail 
                  id='procedureDetails'
                  showDatePicker={true} 
                  fhirVersion={ this.data.fhirVersion }
                  procedure={ this.data.selectedProcedure }
                  procedureId={ this.data.selectedProcedureId } 
                  onInsert={ this.onInsert }
                  onUpdate={ this.onUpdate }
                  onRemove={ this.onRemove }
                  onCancel={ this.onCancel }
                  />  
               </Tab>
             </Tabs>
            </CardText>
          </GlassCard>
        </FullPageCanvas>
      </div>
    );
  }
}

ReactMixin(ProceduresPage.prototype, ReactMeteorData);

export default ProceduresPage;