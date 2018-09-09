import SimpleSchema from 'simpl-schema';

// create the object using our BaseModel
Procedure = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Procedure.prototype._collection = Procedures;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');

if(typeof Procedures === 'undefined'){
  if(Package['clinical:autopublish']){
    Procedures = new Mongo.Collection('Procedures');
  } else if(Package['clinical:desktop-publish']){    
    Procedures = new Mongo.Collection('Procedures');
  } else {
    Procedures = new Mongo.Collection('Procedures', {connection: null});
  }
}


//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Procedures._transform = function (document) {
  return new Procedure(document);
};


ProcedureSchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "Procedure"
  },

  "identifier" : {
    optional: true,
    type:  Array
    },
  "identifier.$" : {
    optional: true,
    type:  IdentifierSchema 
    },
  "subject" : {
    optional: true,
    type: ReferenceSchema
  },
  "status" : {
    optional: true,
    type: Code,
    allowedValues: [ 'preparation', 'in-progress', 'suspended', 'aborted', 'completed', 'entered-in-error', 'unknown']
  },
  "category" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "code" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "notPerformed" : {
    optional: true,
    type: Boolean
  },
  "reasonNotPerformed" : {
    optional: true,
    type: Array
  },
  "reasonNotPerformed.$" : {
    optional: true,
    type: CodeableConceptSchema 
  },
  "bodySite" : {
    optional: true,
    type: Array
  },
  "bodySite.$" : {
    optional: true,
    type: CodeableConceptSchema 
  },
  "reasonCodeableConceptSchema" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "reasonReference" : {
    optional: true,
    type: ReferenceSchema
  },
  "performer" : {
    optional: true,
    type:  Array
    },
  "performer.$" : {
    optional: true,
    type:  Object 
    },  
  "performer.$.actor" : {
    optional: true,
    type: ReferenceSchema
  },
  "performer.$.role" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "performedDateTime" : {
    optional: true,
    type: Date
  },
  "performedPeriod" : {
    optional: true,
    type: PeriodSchema
  },
  "encounter" : {
    optional: true,
    type: ReferenceSchema
  },
  "location" : {
    optional: true,
    type: ReferenceSchema
  },
  "outcome" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "report" : {
    optional: true,
    type: Array
  },
  "report.$" : {
    optional: true,
    type: ReferenceSchema 
  },
  "complication" : {
    optional: true,
    type: Array
  },
  "complication.$" : {
    optional: true,
    type: CodeableConceptSchema 
  },
  "followUp" : {
    optional: true,
    type: Array
  },
  "followUp.$" : {
    optional: true,
    type: CodeableConceptSchema 
  },
  "request" : {
    optional: true,
    type: ReferenceSchema
  },
  "notes" : {
    optional: true,
    type: Array
  },
  "notes.$" : {
    optional: true,
    type: AnnotationSchema 
  },
  "focalDevice" : {
    optional: true,
    type:  Array
    },
  "focalDevice.$" : {
    optional: true,
    type:  Object 
    },  
  "focalDevice.$.action" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "focalDevice.$.manipulated" : {
    optional: true,
    type: ReferenceSchema
  },
  "used" : {
    optional: true,
    type: Array
  },
  "used.$" : {
    optional: true,
    type: ReferenceSchema 
  }
});

BaseSchema.extend(ProcedureSchema);
DomainResourceSchema.extend(ProcedureSchema);

Procedures.attachSchema(ProcedureSchema);

export default { Procedure, Procedures, ProcedureSchema };