Meteor.methods({
  createProcedure:function(procedureObject){
    check(procedureObject, Object);

    if (process.env.NIGHTWATCH || this.userId) {
        console.log('Creating Procedure...');
        Procedures.insert(procedureObject, function(error, result){
        if (error) {
            console.log(error);
        }
        if (result) {
            console.log('Procedure created: ' + result);
        }
        });
    } else {
        console.log('Not authorized.  Try logging in or setting NIGHTWATCH=true')
    }
  },
  initializeProcedure:function(){
    console.log('Initializing procedures...');

    if (process.env.NIGHTWATCH || this.userId) {

        if (Procedures.find({'code.text': 'MRI BRAIN W/WO CONTRAST'}).count() === 0) {
            console.log('No records found in Procedures collection.  Lets create some...');

            var defaultProcedure = {
            resourceType: 'Procedure',
            status: 'unknown',
            nodeDone: false,
            code: {
                text: 'MRI BRAIN W/WO CONTRAST'
            }
            };

            // if (this.userId) {
            //   let user = Meteor.users.findOne({_id: this.userId});
            //   if (user && user.profile && user.profile.name && user.profile.name.text) {

            //     //   display: Patients.findByUserId(this.userId).fullName(),
            //     //   reference: 'Patients/' + Patients.findByUserId(this.userId).patientId()

            //     defaultProcedure.subject.display = user.profile.name.text;
            //     defaultProcedure.subject.reference = 'Meteor.users/' + this.userId;

            //     defaultProcedure.performer.display = user.profile.name.text;
            //     defaultProcedure.performer.reference = 'Meteor.users/' + this.userId;
            //   }
            // }

            Meteor.call('createProcedure', defaultProcedure);
        } else {
            console.log('Procedures already exist.  Skipping.');
        }
    } else {
        console.log('Try running with the NIGHTWATCH environment variable.');
    }
  },
  removeProcedureById: function(procedureId){
    check(procedureId, String);
    if (process.env.NIGHTWATCH || this.userId) {
        console.log('-----------------------------------------');
        console.log('Removing procedure... ');
        Procedures.remove({_id: procedureId});
    } else {
        console.log('Not authorized.  Try logging in or setting NIGHTWATCH=true')
    }
  },
  dropProcedures: function(){
    if (process.env.NIGHTWATCH || this.userId) {
        console.log('-----------------------------------------');
        console.log('Dropping procedures... ');
        Procedures.remove({});
    } else {
        console.log('Not authorized.  Try logging in or setting NIGHTWATCH=true')
    }
  }
});
    



