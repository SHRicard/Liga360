import { Meteor } from 'meteor/meteor';
import { LogHelper } from '/imports/api/helpers/log.helper';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const LOG_RETENTION_DAYS = 90;

Meteor.startup(() => {
  // Limpiar logs mayores a 90 días, cada 24h
  Meteor.setInterval(async () => {
    try {
      const removed = await LogHelper.cleanOldLogs(LOG_RETENTION_DAYS);
      console.log(`[CRON] Logs antiguos eliminados: ${removed}`);
    } catch (error) {
      console.error('[CRON] Error al limpiar logs:', error);
    }
  }, ONE_DAY_MS);
});
