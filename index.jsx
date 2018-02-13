

import ProceduresPage from './client/react/ProceduresPage';
import ProceduresTable from './client/react/ProceduresTable';
import { Procedure, Procedures, ProcedureSchema } from './lib/Procedures';

var DynamicRoutes = [{
  'name': 'ProceduresPage',
  'path': '/procedures',
  'component': ProceduresPage,
  'requireAuth': true
}];

var SidebarElements = [{
  'primaryText': 'Procedures',
  'to': '/procedures',
  'href': '/procedures'
}];

export { 
  SidebarElements, 
  DynamicRoutes, 

  ProceduresPage,
  ProceduresTable,

  Procedure,
  Procedures,
  ProcedureSchema
};


