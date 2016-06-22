Package.describe({
  name: 'clinical:hl7-resource-procedure',
  version: '1.3.0',
  summary: 'HL7 FHIR Resource - Procedure',
  git: 'https://github.com/clinical-meteor/hl7-resource-procedure',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.3');

  api.use('meteor-platform');
  api.use('mongo');

  api.use('grove:less@0.1.1');

  api.use('aldeed:simple-schema@1.3.3');
  api.use('aldeed:collection2@2.3.3');

  api.use('simple:json-routes@2.1.0');
  api.use('prime8consulting:meteor-oauth2-server@0.0.2');

  api.addFiles('lib/hl7-resource-procedure.js', ['client', 'server']);
  api.addFiles('server/rest.js', 'server');
  api.addFiles('server/initialize.js', 'server');

  api.use('clinical:base-model@1.3.5');
  api.use('clinical:hl7-resource-datatypes@0.4.4');

    // api.addFiles('client/components/procedureUpsertPage/procedureUpsertPage.html', ['client']);
    // api.addFiles('client/components/procedureUpsertPage/procedureUpsertPage.js', ['client']);
    // api.addFiles('client/components/procedureUpsertPage/procedureUpsertPage.less', ['client']);
    //
    // api.addFiles('client/components/proceduresTablePage/proceduresTablePage.html', ['client']);
    // api.addFiles('client/components/proceduresTablePage/proceduresTablePage.js', ['client']);
    // api.addFiles('client/components/proceduresTablePage/proceduresTablePage.less', ['client']);
    // api.addFiles('client/components/proceduresTablePage/jquery.tablesorter.js', ['client']);
    //
    // api.addFiles('client/components/procedurePreviewPage/procedurePreviewPage.html', ['client']);
    // api.addFiles('client/components/procedurePreviewPage/procedurePreviewPage.js', ['client']);
    // api.addFiles('client/components/procedurePreviewPage/procedurePreviewPage.less', ['client']);
    //
    // api.addFiles('client/components/proceduresListPage/proceduresListPage.html', ['client']);
    // api.addFiles('client/components/proceduresListPage/proceduresListPage.js', ['client']);
    // api.addFiles('client/components/proceduresListPage/proceduresListPage.less', ['client']);

  api.export('Procedure');
  api.export('Procedures');
  api.export('ProcedureSchema');
});
