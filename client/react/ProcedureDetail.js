import { CardActions, CardText, DatePicker, RaisedButton, TextField, Toggle } from 'material-ui';
import { Row, Col } from 'react-bootstrap';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { browserHistory } from 'react-router';
import { get, set } from 'lodash';
import PropTypes from 'prop-types';


const styles = {
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginTop: 16,
  },
  thumbOff: {
    backgroundColor: '#ffcccc',
  },
  trackOff: {
    backgroundColor: '#ff9d9d',
  },
  thumbSwitched: {
    backgroundColor: 'red',
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d',
  },
  labelStyle: {
    color: 'red',
  },
};


export class ProcedureDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      procedureId: false,
      procedure: {
        resourceType: 'Procedure',
        identifier: [{
          type: {
            coding: [
              {
                system: "",
                code: ""
              }
            ],
            text: "Serial Number"
          },
          value: ""
        }],
        status: 'unknown',
        notPerformed: false,
        identifier: [{
          use: 'official',
          value: ''
        }],
        subject: {
          reference: '',
          display: ''
        },
        performer:{
          reference: '',
          display: ''
        },
        bodySite:{
          reference: '',
          display: ''
        },
        code: {
          text: '',
          coding: [{
            system: '',
            code: '',
            display: ''
          }]
        },
        category: {
          text: '',
          coding: [{
            system: '',
            code: '',
            display: ''
          }]
        },
        notes: [{
          time: null,
          text: ''
        }]
      },
      form: {
        identifier: '',
        categoryCode: '',
        categoryDisplay: '',
        procedureCode: '',
        procedureCodeDisplay: '',
        bodySiteDisplay: '',
        bodySiteReference: '',
        performedDate: null,
        performedTime: null,
        notPerformed: false,
        performerDisplay: '',
        performerReference: '',
        subjectDisplay: '',
        subjectReference: '',
        noteTime: '',
        noteText: ''
      }
    }
  }
  dehydrateFhirResource(procedure) {
    let formData = Object.assign({}, this.state.form);

    formData.identifier = get(procedure, 'identifier[0].value')
    formData.categoryCode = get(procedure, 'category.coding[0].code')
    formData.categoryDisplay = get(procedure, 'category.coding[0].display')    
    formData.procedureCode = get(procedure, 'code.coding[0].code')
    formData.procedureCodeDisplay = get(procedure, 'code.coding[0].display')
    formData.bodySiteDisplay = get(procedure, 'bodySite.display')
    formData.bodySiteReference = get(procedure, 'bodySite.reference')
    formData.performedDate = get(procedure, 'performedDate')
    formData.performedTime = get(procedure, 'performedTime')
    formData.notPerformed = get(procedure, 'notPerformed')
    formData.performerDisplay = get(procedure, 'performer.display')
    formData.performerReference = get(procedure, 'performer.reference')
    formData.subjectDisplay = get(procedure, 'subject.display')
    formData.subjectReference = get(procedure, 'subject.reference')
    formData.noteTime = get(procedure, 'notes[0].time')
    formData.noteText = get(procedure, 'notes[0].text')

    return formData;
  }
  shouldComponentUpdate(nextProps){
    process.env.NODE_ENV === "test" && console.log('ProcedureDetail.shouldComponentUpdate()', nextProps, this.state)
    let shouldUpdate = true;

    // both false; don't take any more updates
    if(nextProps.procedure === this.state.procedure){
      shouldUpdate = false;
    }

    // received an procedure from the table; okay lets update again
    if(nextProps.procedureId !== this.state.procedureId){
      this.setState({procedureId: nextProps.procedureId})
      
      if(nextProps.procedure){
        this.setState({procedure: nextProps.procedure})     
        this.setState({form: this.dehydrateFhirResource(nextProps.procedure)})       
      }
      shouldUpdate = true;
    }
 
    return shouldUpdate;
  }
  getMeteorData() {
    let data = {
      procedureId: this.state.procedureId,
      procedure: false,
      showDatePicker: false
    };

    if(this.props.showDatePicker){
      data.showDatePicker = this.props.showDatePicker
    }

    if(this.props.procedure){
      data.procedure = this.props.procedure;
    }  

    return data;
  }

  renderDatePicker(showDatePicker, datePickerValue){
    if (showDatePicker) {
      return (
        <DatePicker 
          name='performedDateTime'
          hintText="Performed Date/Time" 
          container="inline" 
          mode="landscape"
          value={ datePickerValue ? datePickerValue : ''}    
          onChange={ this.changeState.bind(this, 'performedDateTime')}      
          />
      );
    }
  }

  render() {
    if(process.env.NODE_ENV === "test") console.log('ProcedureDetail.render()', this.state)
    let formData = this.state.form;

    return (
      <div id={this.props.id} className="procedureDetail">
        <CardText>
          <Row>
            <Col md={4}>
              <TextField
                id='identifierInput'
                ref='identifier'
                name='identifier'
                floatingLabelText='Identifier'
                value={  get(formData, 'identifier') }
                onChange={ this.changeState.bind(this, 'identifier')}
                hintText='IR-28376481'
                floatingLabelFixed={true}
                fullWidth
                /><br/>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <TextField
                id='categoryDisplayInput'
                ref='categoryDisplay'
                name='categoryDisplay'
                floatingLabelText='Procedure Category'
                value={  get(formData, 'categoryDisplay') }
                onChange={ this.changeState.bind(this, 'categoryDisplay')}
                hintText='Interventional Radiology'
                floatingLabelFixed={true}
                fullWidth
                /><br/>
            </Col>
            <Col md={2}>
              <TextField
                id='categoryCodeInput'
                ref='categoryCode'
                name='categoryCode'
                floatingLabelText='Category Code'
                value={  get(formData, 'categoryCode') }
                onChange={ this.changeState.bind(this, 'categoryCode')}
                hintText='240917005'
                floatingLabelFixed={true}
                fullWidth
                /><br/>
            </Col>
            <Col md={4}>
              <TextField
                id='procedureCodeDisplayInput'
                ref='procedureCodeDisplay'
                name='procedureCodeDisplay'
                floatingLabelText='Procedure'
                value={  get(formData, 'procedureCodeDisplay') }
                onChange={ this.changeState.bind(this, 'procedureCodeDisplay')}
                hintText='Biliary drainage intervention'
                floatingLabelFixed={true}
                fullWidth
                /><br/>
            </Col>
            <Col md={2}>
              <TextField
                id='procedureCodeInput'
                ref='procedureCode'
                name='procedureCode'
                floatingLabelText='Procedure Code'
                value={  get(formData, 'procedureCode') }
                onChange={ this.changeState.bind(this, 'procedureCode')}
                hintText='277566006'
                floatingLabelFixed={true}
                fullWidth
                /><br/>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <TextField
                id='subjectDisplayInput'
                ref='subjectDisplay'
                name='subjectDisplay'
                floatingLabelText='Subject'
                value={  get(formData, 'subjectDisplay') }
                onChange={ this.changeState.bind(this, 'subjectDisplay')}
                hintText='Jane Doe'
                floatingLabelFixed={true}
                fullWidth
                /><br/>
            </Col>
            <Col md={2}>
              <TextField
                id='subjectReferenceInput'
                ref='subjectReference'
                name='subjectReference'
                floatingLabelText='Subject Reference'
                value={  get(formData, 'subjectReference') }
                onChange={ this.changeState.bind(this, 'subjectReference')}
                hintText='Patient/12345'
                floatingLabelFixed={true}
                fullWidth
                /><br/>
            </Col>

            <Col md={4}>
              <TextField
                id='bodySiteDisplayInput'
                ref='bodySiteDisplay'
                name='bodySiteDisplay'
                floatingLabelText='Body Site'
                value={  get(formData, 'bodySiteDisplay') }
                onChange={ this.changeState.bind(this, 'bodySiteDisplay')}
                hintText='Billiary Ducts'
                floatingLabelFixed={true}
                fullWidth
                /><br/>
            </Col>
            <Col md={2}>
              <TextField
                id='bodySiteReferenceInput'
                ref='bodySiteReference'
                name='bodySiteReference'
                floatingLabelText='Body Site Reference'
                value={  get(formData, 'bodySiteReference') }
                onChange={ this.changeState.bind(this, 'bodySiteReference')}
                hintText='BodySite/222244'
                floatingLabelFixed={true}
                fullWidth
                /><br/>
            </Col>

          </Row>
          <Row>
            <Col md={4}>
              <TextField
                id='performerDisplayInput'
                ref='performerDisplay'
                name='performerDisplay'
                floatingLabelText='Performed By'
                value={  get(formData, 'performerDisplay') }
                onChange={ this.changeState.bind(this, 'performerDisplay')}
                floatingLabelFixed={true}
                hintText='Chris Taub'
                fullWidth
                /><br/>
            </Col>
            <Col md={2}>
              <TextField
                id='performerReferenceInput'
                ref='performerReference'
                name='performerReference'
                floatingLabelText='Performer Reference'
                value={  get(formData, 'performerReference') }
                onChange={ this.changeState.bind(this, 'performerReference')}
                hintText='Practitioner/77777'
                floatingLabelFixed={true}
                fullWidth
                /><br/>
            </Col>
            <Col md={2}>
              <TextField
                id='performedDateInput'
                ref='performedDate'
                name='performedDate'
                type='date'
                floatingLabelText='Performed Date'
                value={  get(formData, 'performedDate') }
                onChange={ this.changeState.bind(this, 'performedDate')}
                floatingLabelFixed={true}
                fullWidth
                /><br/>
            </Col>
            <Col md={2}>
              <TextField
                id='performedTimeInput'
                ref='performedTime'
                name='performedTime'
                type='time'
                floatingLabelText='Performed Date'
                value={  get(formData, 'performedTime') }
                onChange={ this.changeState.bind(this, 'performedTime')}
                floatingLabelFixed={true}
                fullWidth
                /><br/>
            </Col>      
            <Col md={2} >
              <br />
              <Toggle
                label="Not Performed"
                labelPosition="right"
                defaultToggled={false}
                style={styles.toggle}
              />
            </Col>      
          </Row>
          <Row>
            <Col md={2}>
              <TextField
                id='noteTimeInput'
                ref='noteTime'
                name='noteTime'
                type='date'
                floatingLabelText='Time'
                value={  get(formData, 'noteTime') }
                onChange={ this.changeState.bind(this, 'noteTime')}
                floatingLabelFixed={true}
                fullWidth
                /><br/>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <TextField
                id='noteTextInput'
                ref='noteText'
                name='noteText'
                floatingLabelText='Subject Reference'
                value={  get(formData, 'noteText') }
                onChange={ this.changeState.bind(this, 'noteText')}
                floatingLabelFixed={true}
                hintText='Routine follow-up.  No complications.'
                multiLine={true}          
                rows={5}
                fullWidth
                /><br/>  
            </Col>
          </Row>


          <a href='http://browser.ihtsdotools.org/?perspective=full&conceptId1=404684003&edition=us-edition&release=v20180301&server=https://prod-browser-exten.ihtsdotools.org/api/snomed&langRefset=900000000000509007'>Lookup codes with the SNOMED CT Browser</a>

            <br/>
          { this.renderDatePicker(this.data.showDatePicker, get(this, 'data.procedure.performedDateTime') ) }
          <br/>

        </CardText>
        <CardActions>
          { this.determineButtons(this.data.procedureId) }
        </CardActions>
      </div>
    );
  }


 
  determineButtons(procedureId){
    if (procedureId) {
      return (
        <div>
          <RaisedButton id="updateProcedureButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} style={{marginRight: '20px'}}  />
          <RaisedButton id="deleteProcedureButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <RaisedButton id="saveProcedureButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }


  updateFormData(formData, field, textValue){
    if(process.env.NODE_ENV === "test") console.log("PatientDetail.updateFormData", formData, field, textValue);

    switch (field) {
      case "identifier":
        set(formData, 'identifier', textValue)
        break;
      case "categoryCode":
        set(formData, 'categoryCode', textValue)
        break;
      case "categoryDisplay":
        set(formData, 'categoryDisplay', textValue)
        break;        
      case "procedureCode":
        set(formData, 'procedureCode', textValue)
        break;
      case "procedureCodeDisplay":
        set(formData, 'procedureCodeDisplay', textValue)
        break;
      case "bodySiteDisplay":
        set(formData, 'bodySiteDisplay', textValue)
        break;
      case "bodySiteReference":
        set(formData, 'bodySiteReference', textValue)
        break;
      case "notPerformed":
        set(formData, 'notPerformed', textValue)
        break;
      case "performerDisplay":
        set(formData, 'performerDisplay', textValue)
        break;
      case "performerReference":
        set(formData, 'performerReference', textValue)
        break;
      case "subjectDisplay":
        set(formData, 'subjectDisplay', textValue)
        break;
      case "subjectReference":
        set(formData, 'subjectReference', textValue)
        break;
      case "noteTime":
        set(formData, 'noteTime', textValue)
        break;
      case "noteText":
        set(formData, 'noteText', textValue)
        break;
    }

    if(process.env.NODE_ENV === "test") console.log("formData", formData);
    return formData;
  }

  updateProcedure(procedureData, field, textValue){
    if(process.env.NODE_ENV === "test") console.log("PatientDetail.updateProcedure", procedureData, field, textValue);

    let telecomArray = get(procedureData, 'telecom');

    switch (field) {
      case "identifier":
        set(procedureData, 'identifier[0].value', textValue)
        break;
      case "categoryCode":
        set(procedureData, 'category.coding[0].code', textValue)
        break;
      case "categoryDisplay":
        set(procedureData, 'category.coding[0].display', textValue)
        break;        
      case "procedureCode":
        set(procedureData, 'code.coding[0].code', textValue)
        break;
      case "procedureCodeDisplay":
        set(procedureData, 'code.coding[0].display', textValue)
        break;
      case "bodySiteDisplay":
        set(procedureData, 'bodySite.display', textValue)
        break;
      case "bodySiteReference":
        set(procedureData, 'bodySite.reference', )
        break;
      case "notPerformed":
        set(procedureData, 'notPerformed', textValue)
        break;
      case "performerDisplay":
        set(procedureData, 'performer.display', textValue)
        break;
      case "performerReference":
        set(procedureData, 'performer.reference', textValue)
        break;
      case "subjectDisplay":
        set(procedureData, 'subject.display', textValue)
        break;
      case "subjectReference":
        set(procedureData, 'subject.reference', textValue)
        break;
      case "noteTime":
        set(procedureData, 'notes[0].time', textValue)
        break;
      case "noteText":
        set(procedureData, 'notes[0].text', textValue)
        break;
    }
    return procedureData;
  }

  changeState(field, event, textValue){

    if(process.env.NODE_ENV === "test") console.log("   ");
    if(process.env.NODE_ENV === "test") console.log("ProcedureDetail.changeState", field, textValue);
    if(process.env.NODE_ENV === "test") console.log("this.state", this.state);

    let formData = Object.assign({}, this.state.form);
    let procedureData = Object.assign({}, this.state.procedure);

    formData = this.updateFormData(formData, field, textValue);
    procedureData = this.updateProcedure(procedureData, field, textValue);

    if(process.env.NODE_ENV === "test") console.log("procedureData", procedureData);
    if(process.env.NODE_ENV === "test") console.log("formData", formData);

    this.setState({procedure: procedureData})
    this.setState({form: formData})
  }


  handleSaveButton(){
    if(process.env.NODE_ENV === "test") console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^&&')
    console.log('Saving a new Procedure...', this.state)

    let self = this;
    let fhirProcedureData = Object.assign({}, this.state.procedure);

    if(process.env.NODE_ENV === "test") console.log('fhirProcedureData', fhirProcedureData);


    let procedureValidator = ProcedureSchema.newContext();
    procedureValidator.validate(fhirProcedureData)

    console.log('IsValid: ', procedureValidator.isValid())
    console.log('ValidationErrors: ', procedureValidator.validationErrors());


    if (this.state.procedureId) {
      if(process.env.NODE_ENV === "test") console.log("Updating Procedure...");
      delete fhirProcedureData._id;

      // not sure why we're having to respecify this; fix for a bug elsewhere
      fhirProcedureData.resourceType = 'Procedure';

      Procedures._collection.update(
        {_id: this.state.procedureId}, {$set: fhirProcedureData }, function(error, result) {
          if (error) {
            console.log("error", error);

            Bert.alert(error.reason, 'danger');
          }
          if (result) {
            HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Procedures", recordId: self.state.procedureId });
            Session.set('procedurePageTabIndex', 1);
            Session.set('selectedProcedureId', false);
            Session.set('procedureUpsert', false);
            Bert.alert('Procedure updated!', 'success');
          }
        });
    } else {

      if(process.env.NODE_ENV === "test") console.log("create a new procedure", fhirProcedureData);

      Procedures._collection.insert(fhirProcedureData, function(error, result) {
        if (error) {
          console.log("error", error);
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Procedures", recordId: self.state.procedureId });
          Session.set('procedurePageTabIndex', 1);
          Session.set('selectedProcedureId', false);
          Session.set('procedureUpsert', false);
          Bert.alert('Procedure added!', 'success');
        }
      });
    }
  }

  handleCancelButton(){
    Session.set('procedurePageTabIndex', 1);
  }

  handleDeleteButton(){
    let self = this;
    Procedures.remove({_id: this.state.procedureId}, function(error, result){
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      if (result) {
        HipaaLogger.logEvent({eventType: "delete", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Procedures", recordId: self.state.procedureId});
        Session.set('procedurePageTabIndex', 1);
        Session.set('selectedProcedureId', false);
        Bert.alert('Procedure removed!', 'success');
      }
    });
  }
}


ProcedureDetail.propTypes = {
  id: PropTypes.string,
  fhirVersion: PropTypes.string,
  procedureId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  procedure: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
};
ReactMixin(ProcedureDetail.prototype, ReactMeteorData);
export default ProcedureDetail;