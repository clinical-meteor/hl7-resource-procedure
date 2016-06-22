
// create the object using our BaseModel
Procedure = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Procedure.prototype._collection = Procedures;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
Procedures = new Mongo.Collection('Procedures');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Procedures._transform = function (document) {
  return new Procedure(document);
};


if (Meteor.isClient){
  Meteor.subscribe("Procedures");
}

if (Meteor.isServer){
  Meteor.publish("Procedures", function (argument){
    if (this.userId) {
      return Procedures.find();
    } else {
      return [];
    }
  });
}



ProcedureSchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "Procedure"
  },

  "identifier" : {
    optional: true,
    type: [ IdentifierSchema ]
  }, // External Identifiers for this procedure
  "subject" : {
    optional: true,
    type: ReferenceSchema
  }, // R!  Who the procedure was performed on
  "status" : {
    optional: true,
    type: Code
  }, // R!  in-progress | aborted | completed | entered-in-error
  "category" : {
    optional: true,
    type: CodeableConceptSchema
  }, // Classification of the procedure
  "code" : {
    optional: true,
    type: CodeableConceptSchema
  }, // R!  Identification of the procedure
  "notPerformed" : {
    optional: true,
    type: Boolean
  }, // True if procedure was not performed as scheduled
  "reasonNotPerformed" : {
    optional: true,
    type: [ CodeableConceptSchema ]
  }, // C? Reason procedure was not performed
  "bodySite" : {
    optional: true,
    type: [ CodeableConceptSchema ]
  }, // Target body sites
  "reasonCodeableConceptSchema" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "reasonReference" : {
    optional: true,
    type: ReferenceSchema
  },
  "performer.$.actor" : {
    optional: true,
    type: ReferenceSchema
  }, // The reference to the practitioner
  "performer.$.role" : {
    optional: true,
    type: CodeableConceptSchema
  }, // The role the actor was in
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
  }, // The encounter associated with the procedure
  "location" : {
    optional: true,
    type: ReferenceSchema
  }, // Where the procedure happened
  "outcome" : {
    optional: true,
    type: CodeableConceptSchema
  }, // The result of procedure
  "report" : {
    optional: true,
    type: [ ReferenceSchema ]
  }, // Any report resulting from the procedure
  "complication" : {
    optional: true,
    type: [ CodeableConceptSchema ]
  }, // Complication following the procedure
  "followUp" : {
    optional: true,
    type: [ CodeableConceptSchema ]
  }, // Instructions for follow up
  "request" : {
    optional: true,
    type: ReferenceSchema
  }, // A request for this procedure
  "notes" : {
    optional: true,
    type: [ AnnotationSchema ]
  }, // Additional information about the procedure
  "focalDevice.$.action" : {
    optional: true,
    type: CodeableConceptSchema
  }, // Kind of change to device
  "focalDevice.$.manipulated" : {
    optional: true,
    type: ReferenceSchema
  }, // R!  Device that was changed
  "used" : {
    optional: true,
    type: [ ReferenceSchema ]
  } // Items used during procedure
});
Procedures.attachSchema(ProcedureSchema);
