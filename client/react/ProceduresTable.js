import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';
import Toggle from 'material-ui/Toggle';
import { get } from 'lodash';

export default class ProceduresTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      procedures: [],
      displayToggle: false,
      displayDates: false
    }

    if(this.props.displayToggles){
      data.displayToggle = this.props.displayToggles;
    }
    if(this.props.displayDates){
      data.displayDates = this.props.displayDates;
    }
    if(this.props.data){
      data.procedures = this.props.data;
    } else {
      if(Procedures.find().count() > 0){
        data.procedures = Procedures.find().fetch();
      }  
    }

    if(process.env.NODE_ENV === "test") console.log("ProceduresTable[data]", data);
    return data;
  };

  renderTogglesHeader(displayToggle){
    if (displayToggle) {
      return (
        <th className="toggle">toggle</th>
      );
    }
  }
  renderToggles(displayToggle, patientId ){
    if (displayToggle) {
      return (
        <td className="toggle">
            <Toggle
              defaultToggled={true}
              //style={styles.toggle}
            />
          </td>
      );
    }
  }
  renderDateHeader(displayDates){
    if (displayDates) {
      return (
        <th className='performedDate'>Date</th>
        // <th className='performedTime'>Time</th>
      );
    }
  }
  renderDate(displayDates, performedDate, performedTime ){
    if (displayDates) {
      return (
        // <td className='date'>{ moment(performedDate).format('YYYY-MM-DD') }</td>
        // <td className='time'>{ moment(newDate).format('YYYY-MM-DD') }</td>
        <td className='date'>{ performedDate }</td>
        // <td className='time'>{ performedTime }</td>
      );
    }
  }
  rowClick(id){
    Session.set('proceduresUpsert', false);
    Session.set('selectedProcedureId', id);
    Session.set('procedurePageTabIndex', 2);
  };
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.procedures.length; i++) {
      var newRow = {
        identifier: '',
        status: '',
        code: ''        
      };
      newRow.identifier = get(this.data.procedures[i], 'identifier[0].value');
      newRow.categoryDisplay = get(this.data.procedures[i], 'category.coding[0].display')    
      newRow.procedureCode = get(this.data.procedures[i], 'code.coding[0].code');
      newRow.procedureCodeDisplay = get(this.data.procedures[i], 'code.coding[0].display');
      newRow.performedDate = get(this.data.procedures[i], 'performedDate');
      newRow.performedTime = get(this.data.procedures[i], 'performedTime');
      newRow.subjectDisplay = get(this.data.procedures[i], 'subject.display');
      newRow.subjectReference = get(this.data.procedures[i], 'subject.reference');
      newRow.performerDisplay = get(this.data.procedures[i], 'performer.display');
      newRow.performerReference = get(this.data.procedures[i], 'performer.reference');
      newRow.bodySiteDisplay = get(this.data.procedures[i], 'bodySite.display');

      let notes = get(this.data.procedures[i], 'notes')
      newRow.notesCount = notes.length;

      console.log('newRow', newRow)

      
      tableRows.push(
        <tr key={i} className="procedureRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.procedures[i]._id)} >
          { this.renderToggles(this.data.displayToggle, this.data.procedures[i]) }
          <td className='identifier'>{ newRow.identifier }</td>
          <td className='categoryDisplay'>{ newRow.categoryDisplay }</td>
          <td className='procedureCodeDisplay'>{ newRow.procedureCodeDisplay }</td>
          <td className='procedureCode'>{ newRow.procedureCode }</td>
          <td className='subjectDisplay'>{ newRow.subjectDisplay }</td>
          <td className='performerDisplay'>{ newRow.performerDisplay }</td>
          <td className='bodySiteDisplay'>{ newRow.bodySiteDisplay }</td>
          { this.renderDate(this.data.displayDates, newRow.performedDate, newRow.performedTime) }
          <td className='notesCount'>{ newRow.notesCount }</td>
        </tr>
      )
    }

    return(
      <Table id='proceduresTable' hover >
        <thead>
          <tr>
            { this.renderTogglesHeader(this.data.displayToggle) }
            <th className='identifier'>Identifier</th>
            <th className='categoryDisplay'>Category</th>
            <th className='procedureCodeDisplay'>Procedure</th>
            <th className='procedureCode'>Code</th>
            <th className='subjectDisplay'>Subject</th>
            <th className='performerDisplay'>Performer</th>
            <th className='bodySiteDisplay'>Body Site</th>

            { this.renderDateHeader(this.data.displayDates) }
            <th className='notesCount'>Notes</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>
    );
  }
}


ReactMixin(ProceduresTable.prototype, ReactMeteorData);