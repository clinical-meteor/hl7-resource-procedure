import { Card, CardActions, CardMedia, CardText, CardTitle, Checkbox } from 'material-ui';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';
import { get } from 'lodash';
import { moment } from 'meteor/momentjs:moment';
import PropTypes from 'prop-types';

import { FaTags, FaCode, FaPuzzlePiece, FaLock  } from 'react-icons/fa';
import { GoTrashcan } from 'react-icons/go'

export class ProceduresTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      procedures: [],
      displayCheckbox: false,
      displayDates: false
    }

    if(this.props.displayCheckboxs){
      data.displayCheckbox = this.props.displayCheckboxs;
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

    // if(get(Meteor, 'settings.public.logging') === "debug") console.log("ProceduresTable[data]", data);
    return data;
  };
  displayOnMobile(width){
    let style = {};
    if(['iPhone'].includes(window.navigator.platform)){
      style.display = "none";
    }
    if(width){
      style.width = width;
    }
    return style;
  }
  renderCheckboxHeader(){
    if (!this.props.hideCheckboxes) {
      return (
        <th className="toggle" style={{width: '60px'}} >Checkbox</th>
      );
    }
  }
  renderCheckbox(patientId ){
    if (!this.props.hideCheckboxes) {
      return (
        <td className="toggle">
            <Checkbox
              defaultCheckbox={true}
              //style={styles.toggle}
            />
          </td>
      );
    }
  }
  renderDateHeader(){
    if (!this.props.hidePerformedDate) {
      return (
        <th className='performedDate'>Date</th>
        // <th className='performedTime'>Time</th>
      );
    }
  }
  renderDate(performedDate, performedTime ){
    if (!this.props.hidePerformedDate) {
      return (
        // <td className='date'>{ moment(performedDate).format('YYYY-MM-DD') }</td>
        // <td className='time'>{ moment(newDate).format('YYYY-MM-DD') }</td>
        <td className='date'>{ performedDate }</td>
        // <td className='time'>{ performedTime }</td>
      );
    }
  }
  renderIdentifierHeader(){
    if (!this.props.hideIdentifier) {
      return (
        <th className='identifier'>Identifier</th>
      );
    }
  }
  renderIdentifier(identifier ){
    if (!this.props.hideIdentifier) {
      return (
        <td className='identifier'>{ identifier }</td>
      );
    }
  } 
  renderActionIconsHeader(){
    if (!this.props.hideActionIcons) {
      return (
        <th className='actionIcons' style={{width: '100px'}}>Actions</th>
      );
    }
  }
  removeRecord(_id){
    console.log('Remove procedure ', _id)
    Procedures._collection.remove({_id: _id})
  }
  showSecurityDialog(procedure){
    console.log('showSecurityDialog', procedure)

    Session.set('securityDialogResourceJson', Procedures.findOne(get(procedure, '_id')));
    Session.set('securityDialogResourceType', 'Procedure');
    Session.set('securityDialogResourceId', get(procedure, '_id'));
    Session.set('securityDialogOpen', true);
  }
  renderActionIcons( procedure ){
    if (!this.props.hideActionIcons) {

      let iconStyle = {
        marginLeft: '4px', 
        marginRight: '4px', 
        marginTop: '4px', 
        fontSize: '120%'
      }

      return (
        <td className='actionIcons' style={{minWidth: '120px'}}>
          <FaTags style={iconStyle} onClick={this.showSecurityDialog.bind(this, procedure)} />
          <GoTrashcan style={iconStyle} onClick={this.removeRecord.bind(this, procedure._id)} />  
        </td>
      );
    }
  } 
  renderCategoryHeader(){
    if (!this.props.hideCategory) {
      return (
        <th className="categoryDisplay">Category</th>
      );
    }
  }
  renderCategory(category ){
    if (!this.props.hideCategory) {
      return (
        <td className='categoryDisplay'>{ category }</td>       );
    }
  }
  renderIdentifierHeader(){
    if (!this.props.hideIdentifier) {
      return (
        <th className='identifier'>Identifier</th>
      );
    }
  }
  renderIdentifier(identifier ){
    if (!this.props.hideIdentifier) {
      return (
        <td className='identifier'>{ identifier }</td>
      );
    }
  } 
  renderCategoryHeader(){
    if (!this.props.hideCategory) {
      return (
        <th className="categoryDisplay">Category</th>
      );
    }
  }
  renderCategory(category ){
    if (!this.props.hideCategory) {
      return (
        <td className='categoryDisplay'>{ category }</td>       );
    }
  }
  renderPerformerHeader(){
    if (!this.props.hideCategory) {
      return (
        <th className="performerDisplay">Performer</th>
      );
    }
  }
  renderPerformer(bodysite ){
    if (!this.props.hideCategory) {
      return (
        <td className='performerDisplay'>{ bodysite }</td>       );
    }
  }
  renderBodySiteHeader(){
    if (!this.props.hideCategory) {
      return (
        <th className="bodySiteDisplay">Body Site</th>
      );
    }
  }
  renderBodySite(bodySite ){
    if (!this.props.hideCategory) {
      return (
        <td className='bodySiteDisplay'>{ bodySite }</td>       );
    }
  }
  renderSubjectHeader(){
    if (!this.props.hideSubject) {
      return (
        <th className='subjectDisplay'>patient</th>
      );
    }
  }
  renderSubject(subject ){
    if (!this.props.hideSubject) {
      return (
        <td className='subjectDisplay' style={{minWidth: '140px'}}>{ subject }</td>
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

      newRow.performedDate = get(this.data.procedures[i], 'performedDateTime');      
      newRow.performedTime = get(this.data.procedures[i], 'performedTime');
      newRow.subjectDisplay = get(this.data.procedures[i], 'subject.display');
      newRow.subjectReference = get(this.data.procedures[i], 'subject.reference');
      newRow.performerDisplay = get(this.data.procedures[i], 'performer.display');
      newRow.performerReference = get(this.data.procedures[i], 'performer.reference');
      newRow.bodySiteDisplay = get(this.data.procedures[i], 'bodySite.display');

      let notes = get(this.data.procedures[i], 'notes')
      if(notes && notes.length){
        newRow.notesCount = notes.length;
      } else {
        newRow.notesCount = 0;
      }

      // console.log('newRow', newRow)

      
      tableRows.push(
        <tr key={i} className="procedureRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.procedures[i]._id)} >
          { this.renderCheckbox() }
          { this.renderActionIcons(this.data.procedures[i]) }
          { this.renderIdentifier(newRow.identifier ) }
          { this.renderCategory(newRow.categoryDisplay) }
          {/* <td className='categoryDisplay'>{ newRow.categoryDisplay }</td> */}
          <td className='procedureCodeDisplay'>{ newRow.procedureCodeDisplay }</td>
          <td className='procedureCode'>{ newRow.procedureCode }</td>
          {/* <td className='subjectDisplay' style={this.displayOnMobile()} >{ newRow.subjectDisplay }</td> */}
          {/* <td className='performerDisplay' style={this.displayOnMobile()} >{ newRow.performerDisplay }</td>
          <td className='bodySiteDisplay' style={this.displayOnMobile()} >{ newRow.bodySiteDisplay }</td> */}
          { this.renderSubject( newRow.subjectDisplay ) } 
          { this.renderPerformer(newRow.performerDisplay) }
          { this.renderBodySite(newRow.bodySiteDisplay) }
          { this.renderDate(newRow.performedDate, newRow.performedTime) }
          <td className='notesCount'>{ newRow.notesCount }</td>
        </tr>
      )
    }

    return(
      <Table id='proceduresTable' hover >
        <thead>
          <tr>
            { this.renderCheckboxHeader() }
            { this.renderActionIconsHeader() }
            { this.renderIdentifierHeader() }
            { this.renderCategoryHeader() }
            {/* <th className='categoryDisplay'>Category</th> */}
            <th className='procedureCodeDisplay'>Procedure</th>
            <th className='procedureCode'>Code</th>
            {/* <th className='subjectDisplay' style={this.displayOnMobile()} >Subject</th> */}
            {/* <th className='performerDisplay' style={this.displayOnMobile()} >Performer</th>
            <th className='bodySiteDisplay' style={this.displayOnMobile()} >Body Site</th> */}

            { this.renderSubjectHeader() }
            { this.renderPerformerHeader() }
            { this.renderBodySiteHeader() }
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


ProceduresTable.propTypes = {
  data: PropTypes.array,
  query: PropTypes.object,
  paginationLimit: PropTypes.number,
  hidePerformedDate: PropTypes.bool,
  hideIdentifier: PropTypes.bool,
  hideCheckboxes: PropTypes.bool,
  hideActionIcons: PropTypes.bool,
  hideSubject: PropTypes.bool,
  hidePerformer: PropTypes.bool,
  hideBodySite: PropTypes.bool,
  enteredInError: PropTypes.bool
};
ReactMixin(ProceduresTable.prototype, ReactMeteorData);
export default ProceduresTable;