const logger = require('../../utils/logger');
const Ajv = require('ajv');
const ajv = new Ajv();

function validateSchema(data, schema) {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) {
    logger.error('Schema validation failed:', validate.errors);
    throw new Error('Schema validation error');
  }
}
module.exports = validateSchema;
