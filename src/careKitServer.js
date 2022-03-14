
/**
 * @class CareKitServer
 * @description An analytics adapter for Parse Server using the
 * [Analytics](https://github.com/DavidWells/analytics) package.
 */
class CareKitServer {

    constructor(server, setUserCLP, delayForCreatingIndexes = 3000) {
            
        this.server = server;
        Parse.Cloud.run('ensureClassDefaultFieldsForParseCareKit');

        /* Fire after some delay to allow _User class to be created */
        setTimeout(async function() {

            if(setUserCLP) {
                await Parse.Cloud.run('setParseClassLevelPermissions');
            }
            await Parse.Cloud.run('setAuditClassLevelPermissions');    
            await createIndexes();
        }, delayForCreatingIndexes); 
    }

    /**
     * @function createIndexes
     * @description Creates default indexes.
     * @returns {Promise<Any>} The resolved promise.
    */
    async createIndexes() {
        const adapter = this.server.config.databaseController.adapter;
        const indexEntityIdPostfix = '_entityId';
        const indexRemoteIdPostfix = '_remoteId';
        const indexEffectiveDatePostfix = '_effectiveDate';
        const indexUpdatedDatePostfix = '_updatedDate';
        const indexCreatedAtPostfix = '_createdAt';
        const indexLogicalClockPostfix = '_logicalClock';
      
        const parseSchema = {
          fields: {
            createdAt: { type: 'Date' }
          },
        };
      
        const schema = {
          fields: {
            uuid: { type: 'String' },
            createdAt: { type: 'Date' }
          },
        };
        
        const versionedSchema = {
          fields: {
            entityId: { type: 'String' },
            remoteID: { type: 'String' },
            effectiveDate: { type: 'Date' },
            updatedDate: { type: 'Date' },
            createdAt: { type: 'Date' },
            logicalClock: { type: 'Number' }
          },
        };
      
        try {
          await adapter.ensureIndex('Patient', versionedSchema, ['entityId'], 'Patient'+indexEntityIdPostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('Patient', versionedSchema, ['remoteID'], 'Patient'+indexRemoteIdPostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('Patient', versionedSchema, ['effectiveDate'], 'Patient'+indexEffectiveDatePostfix, false)
        } catch(error) { console.log(error); } 
      
        try {
          await adapter.ensureIndex('Patient', versionedSchema, ['updatedDate'], 'Patient'+indexUpdatedDatePostfix, false)
        } catch(error) { console.log(error); } 
      
        try {
          await adapter.ensureIndex('Patient', versionedSchema, ['createdAt'], 'Patient'+indexCreatedAtPostfix, false)
        } catch(error) { console.log(error); } 
      
        try {
          await adapter.ensureIndex('Patient', versionedSchema, ['logicalClock'], 'Patient'+indexLogicalClockPostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('Patient_Audit', schema, ['createdAt'], 'Patient_Audit'+indexCreatedAtPostfix, false)
        } catch(error) { console.log(error); } 
      
        try {
          await adapter.ensureIndex('Contact', versionedSchema, ['entityId'], 'Contact'+indexEntityIdPostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('Contact', versionedSchema, ['effectiveDate'], 'Contact'+indexEffectiveDatePostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('Contact', versionedSchema, ['updatedDate'], 'Contact'+indexUpdatedDatePostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('Contact', versionedSchema, ['createdAt'], 'Contact'+indexCreatedAtPostfix, false)
        } catch(error) { console.log(error); } 
      
        try {
          await adapter.ensureIndex('Contact', versionedSchema, ['logicalClock'], 'Contact'+indexLogicalClockPostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('Contact_Audit', schema, ['createdAt'], 'Contact_Audit'+indexCreatedAtPostfix, false)
        } catch(error) { console.log(error); }
          
        try {
          await adapter.ensureIndex('CarePlan', versionedSchema, ['entityId'], 'CarePlan'+indexEntityIdPostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('CarePlan', versionedSchema, ['effectiveDate'], 'CarePlan'+indexEffectiveDatePostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('CarePlan', versionedSchema, ['updatedDate'], 'CarePlan'+indexUpdatedDatePostfix, false)
        } catch(error) { console.log(error); } 
      
        try {
          await adapter.ensureIndex('CarePlan', versionedSchema, ['createdAt'], 'CarePlan'+indexCreatedAtPostfix, false)
        } catch(error) { console.log(error); } 
      
        try {
          await adapter.ensureIndex('CarePlan', versionedSchema, ['logicalClock'], 'CarePlan'+indexLogicalClockPostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('CarePlan_Audit', schema, ['createdAt'], 'CarePlan_Audit'+indexCreatedAtPostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('Task', versionedSchema, ['entityId'], 'Task'+indexEntityIdPostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('Task', versionedSchema, ['effectiveDate'], 'Task'+indexEffectiveDatePostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('Task', versionedSchema, ['updatedDate'], 'Task'+indexUpdatedDatePostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('Task', versionedSchema, ['createdAt'], 'Task'+indexCreatedAtPostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('Task', versionedSchema, ['logicalClock'], 'Task'+indexLogicalClockPostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('Task_Audit', schema, ['createdAt'], 'Task_Audit'+indexCreatedAtPostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('HealthKitTask', versionedSchema, ['entityId'], 'HealthKitTask'+indexEntityIdPostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('HealthKitTask', versionedSchema, ['effectiveDate'], 'HealthKitTask'+indexEffectiveDatePostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('HealthKitTask', versionedSchema, ['updatedDate'], 'HealthKitTask'+indexUpdatedDatePostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('HealthKitTask', versionedSchema, ['createdAt'], 'HealthKitTask'+indexCreatedAtPostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('HealthKitTask', versionedSchema, ['logicalClock'], 'HealthKitTask'+indexLogicalClockPostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('HealthKitTask_Audit', schema, ['createdAt'], 'HealthKitTask_Audit'+indexCreatedAtPostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('Outcome', versionedSchema, ['entityId'], 'Outcome'+indexEntityIdPostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('Outcome', versionedSchema, ['updatedDate'], 'Outcome'+indexUpdatedDatePostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('Outcome', versionedSchema, ['createdAt'], 'Outcome'+indexCreatedAtPostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('Outcome', versionedSchema, ['logicalClock'], 'Outcome'+indexLogicalClockPostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('Outcome_Audit', schema, ['createdAt'], 'Outcome_Audit'+indexCreatedAtPostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureUniqueness('Clock', schema, ['uuid'])
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('Clock', schema, ['createdAt'], 'Outcome'+indexCreatedAtPostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('Clock_Audit', schema, ['createdAt'], 'Clock_Audit'+indexCreatedAtPostfix, false)
        } catch(error) { console.log(error); }
      
        try {
          await adapter.ensureIndex('_User', schema, ['createdAt'], '_User'+indexCreatedAtPostfix, false)
        } catch(error) { console.log(error); }

        return Promise.resolve({});
    }
}
