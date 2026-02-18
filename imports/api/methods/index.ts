// Importar métodos para registrarlos en Meteor
import './user.methods';
import './logs.methods';

// Exportar métodos para uso directo
export { updateUserRole } from './user.methods';
export {
  getUserLogs,
  getLogsByAction,
  getAllLogs,
  createLog,
} from './logs.methods';
