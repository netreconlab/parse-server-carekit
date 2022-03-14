const ParseAuditor = require('parse-auditor');

/**
 * @class CareKitServer
 * @description Adds the necessary Parse classes, fields, and indexes to make your
 * parse-server compatable with clients using [CareKit](https://github.com/carekit-apple/CareKit) and
 * [ParseCareKit](https://github.com/netreconlab/ParseCareKit).
 */
class CareKitServer {

  constructor(server, delayForCreatingIndexes = 3000) {

    this.server = server;

    /* Fire after some delay to allow _User class to be created */
    setTimeout(async function() {
      await ensureClassDefaultFieldsForParseCareKit();
      await setAuditClassLevelPermissions();    
      await createIndexes();
    }, delayForCreatingIndexes);
  }

  /**
   * @function ensureClassDefaultFieldsForParseCareKit
   * @description Creates default Parse classes and fields.
   * @returns {Promise<Any>} The resolved promise.
  */
  async ensureClassDefaultFieldsForParseCareKit() {
    const clp = {
      get: { requiresAuthentication: true },
      find: { requiresAuthentication: true },
      create: { requiresAuthentication: true },
      update: { requiresAuthentication: true },
      delete: { requiresAuthentication: true },
      addField: { },
      protectedFields: { }
    };

    const patientSchema = new Parse.Schema('Patient');
    try {
      await patientSchema.get();
    } catch(error) {
      try {
        await patientSchema
        .addString('entityId')
        .addDate('createdDate')
        .addDate('updatedDate')
        .addDate('deletedDate')
        .addDate('effectiveDate')
        .addNumber('logicalClock')
        .addObject('timezone')
        .addObject('name')
        .addString('sex')
        .addDate('birthday')
        .addArray('allergies')
        .addString('groupIdentifier')
        .addArray('tags')
        .addString('source')
        .addString('asset')
        .addArray('notes')
        .addString('remoteID')
        .addObject('userInfo')
        .addObject('schemaVersion')
        .addArray('previousVersionUUIDs')
        .addArray('nextVersionUUIDs')
        .setCLP(clp)
        .save();
        console.log("***Success: Patient class created with default fields. Ignore any previous errors about this class***");
      } catch(error) { console.log(error); }
    }
    
    const carePlanSchema = new Parse.Schema('CarePlan');
    try {
      await carePlanSchema.get();
    } catch(error) {
      try {
        await carePlanSchema
        .addString('entityId')
        .addDate('createdDate')
        .addDate('updatedDate')
        .addDate('deletedDate')
        .addDate('effectiveDate')
        .addNumber('logicalClock')
        .addObject('timezone')
        .addString('title')
        .addString('patientUUID')
        .addPointer('patient', 'Patient')
        .addString('groupIdentifier')
        .addArray('tags')
        .addString('source')
        .addString('asset')
        .addArray('notes')
        .addString('remoteID')
        .addObject('userInfo')
        .addObject('schemaVersion')
        .addArray('previousVersionUUIDs')
        .addArray('nextVersionUUIDs')
        .setCLP(clp)
        .save();
        console.log("***Success: CarePlan class created with default fields. Ignore any previous errors about this class***");
      } catch(error) { console.log(error); }
    }
    
    const contactSchema = new Parse.Schema('Contact');
    try {
      await contactSchema.get();
    } catch(error) {
      try {
        await contactSchema
        .addString('entityId')
        .addDate('createdDate')
        .addDate('updatedDate')
        .addDate('deletedDate')
        .addDate('effectiveDate')
        .addNumber('logicalClock')
        .addObject('timezone')
        .addObject('name')
        .addString('title')
        .addString('role')
        .addString('organization')
        .addString('category')
        .addArray('emailAddresses')
        .addArray('messagingNumbers')
        .addArray('otherContactInfo')
        .addArray('phoneNumbers')
        .addObject('address')
        .addString('carePlanUUID')
        .addPointer('carePlan', 'CarePlan')
        .addString('groupIdentifier')
        .addArray('tags')
        .addString('source')
        .addString('asset')
        .addArray('notes')
        .addString('remoteID')
        .addObject('userInfo')
        .addObject('schemaVersion')
        .addArray('previousVersionUUIDs')
        .addArray('nextVersionUUIDs')
        .setCLP(clp)
        .save();
        console.log("***Success: Contact class created with default fields. Ignore any previous errors about this class***");
      } catch(error) { console.log(error); }
    }

    const taskSchema = new Parse.Schema('Task');
    try {
      await taskSchema.get();
    }catch(error) {
      try {
        await taskSchema
        .addString('entityId')
        .addDate('createdDate')
        .addDate('updatedDate')
        .addDate('deletedDate')
        .addDate('effectiveDate')
        .addNumber('logicalClock')
        .addObject('timezone')
        .addString('title')
        .addString('instructions')
        .addBoolean('impactsAdherence')
        .addObject('schedule')
        .addArray('elements')
        .addString('carePlanUUID')
        .addPointer('carePlan', 'CarePlan')
        .addString('groupIdentifier')
        .addArray('tags')
        .addString('source')
        .addString('asset')
        .addArray('notes')
        .addString('remoteID')
        .addObject('userInfo')
        .addObject('schemaVersion')
        .addArray('previousVersionUUIDs')
        .addArray('nextVersionUUIDs')
        .setCLP(clp)
        .save();
        console.log("***Success: Task class created with default fields. Ignore any previous errors about this class***");
      } catch(error) { console.log(error); }
    }

    const healthKitTaskSchema = new Parse.Schema('HealthKitTask');
    try {
      await healthKitTaskSchema.get();
    }catch(error) {
      try {
        await healthKitTaskSchema
        .addString('entityId')
        .addDate('createdDate')
        .addDate('updatedDate')
        .addDate('deletedDate')
        .addDate('effectiveDate')
        .addNumber('logicalClock')
        .addObject('timezone')
        .addString('title')
        .addString('instructions')
        .addBoolean('impactsAdherence')
        .addObject('schedule')
        .addArray('elements')
        .addString('carePlanUUID')
        .addPointer('carePlan', 'CarePlan')
        .addString('groupIdentifier')
        .addArray('tags')
        .addString('source')
        .addString('asset')
        .addArray('notes')
        .addString('remoteID')
        .addObject('userInfo')
        .addObject('schemaVersion')
        .addObject('healthKitLinkage')
        .addArray('previousVersionUUIDs')
        .addArray('nextVersionUUIDs')
        .setCLP(clp)
        .save();
        console.log("***Success: HealthKitTask class created with default fields. Ignore any previous errors about this class***");
      } catch(error) { console.log(error); }
    }

    const outcomeSchema = new Parse.Schema('Outcome');
    try {
      await outcomeSchema.get();
    } catch(error) {
      try {
        await outcomeSchema
        .addString('entityId')
        .addDate('createdDate')
        .addDate('updatedDate')
        .addDate('effectiveDate')
        .addDate('deletedDate')
        .addNumber('logicalClock')
        .addObject('timezone')
        .addDate('startDate')
        .addDate('endDate')
        .addNumber('taskOccurrenceIndex')
        .addArray('values')
        .addString('taskUUID')
        .addPointer('task', 'Task')
        .addString('groupIdentifier')
        .addArray('tags')
        .addString('source')
        .addString('asset')
        .addArray('notes')
        .addString('remoteID')
        .addObject('userInfo')
        .addObject('schemaVersion')
        .addArray('previousVersionUUIDs')
        .addArray('nextVersionUUIDs')
        .setCLP(clp)
        .save();
        console.log("***Success: Outcome class created with default fields. Ignore any previous errors about this class***");
      } catch(error) { console.log(error); }
    }

    const healthKitOutcomeSchema = new Parse.Schema('HealthKitOutcome');
    try {
      await healthKitOutcomeSchema.get();
    } catch(error) {
      try {
        await healthKitOutcomeSchema
        .addString('entityId')
        .addDate('createdDate')
        .addDate('updatedDate')
        .addDate('effectiveDate')
        .addDate('deletedDate')
        .addNumber('logicalClock')
        .addObject('timezone')
        .addDate('startDate')
        .addDate('endDate')
        .addNumber('taskOccurrenceIndex')
        .addArray('values')
        .addString('taskUUID')
        .addPointer('task', 'HealthKitTask')
        .addString('groupIdentifier')
        .addArray('tags')
        .addString('source')
        .addString('asset')
        .addArray('notes')
        .addString('remoteID')
        .addObject('userInfo')
        .addBoolean('isOwnedByApp')
        .addObject('schemaVersion')
        .addArray('previousVersionUUIDs')
        .addArray('nextVersionUUIDs')
        .setCLP(clp)
        .save();
        console.log("***Success: Outcome class created with default fields. Ignore any previous errors about this class***");
      } catch(error) { console.log(error); }
    }
    
    const clockSchema = new Parse.Schema('Clock');
    try {
      await clockSchema.get();
    } catch(error) {
      try {
        await clockSchema
        .addString('uuid')
        .addString('vector')
        .setCLP(clp)
        .save();
        console.log("***Success: Clock class created with default fields. Ignore any previous errors about this class***");
      } catch(error) { console.log(error); }
    }
  }

  /**
   * @function setAuditClassLevelPermissions
   * @description Creates default Parse classes and fields.
   * @returns {Promise<Any>} The resolved promise.
  */
  async setAuditClassLevelPermissions() {
    const auditCLP = {
      get: { requiresAuthentication: true },
      find: { requiresAuthentication: true },
      create: { },
      update: { requiresAuthentication: true },
      delete: { requiresAuthentication: true },
      addField: { },
      protectedFields: { }
    };
    // Don't audit '_Role' as it doesn't work.
    const modifiedClasses = ['_User', '_Installation', '_Audience', 'Clock', 'Patient', 'CarePlan', 'Contact', 'Task', 'HealthKitTask', 'Outcome', 'HealthKitOutcome'];
    const accessedClasses = ['_User', '_Installation', '_Audience', 'Clock', 'Patient', 'CarePlan', 'Contact', 'Task', 'HealthKitTask', 'Outcome', 'HealthKitOutcome'];
    ParseAuditor(modifiedClasses, accessedClasses, { classPostfix: '_Audit', useMasterKey: true, clp: auditCLP });
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
