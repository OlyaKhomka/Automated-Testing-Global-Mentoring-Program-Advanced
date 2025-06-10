
//Dashboard schemas to verify the Get Response 
const dashboardSchema = {
  type: 'object',
  required: ['description', 'owner', 'id', 'name', 'widgets'],
  properties: {
    description: { type: 'string' },
    owner: { type: 'string' },
    id: { type: 'number' },
    name: { type: 'string' },
    widgets: {
      type: 'array',
      items: {
        type: 'object',
        required: ['widgetName', 'widgetId', 'widgetType', 'widgetSize', 'widgetPosition', 'widgetOptions'],
        properties: {
          widgetName: { type: 'string' },
          widgetId: { type: 'number' },
          widgetType: { type: 'string' },
          widgetSize: {
            type: 'object',
            required: ['width', 'height'],
            properties: {
              width: { type: 'number' },
              height: { type: 'number' },
            },
          },
          widgetPosition: {
            type: 'object',
            required: ['positionX', 'positionY'],
            properties: {
              positionX: { type: 'number' },
              positionY: { type: 'number' },
            },
          },
          widgetOptions: {
            type: 'object',
            additionalProperties: true,
          },
        },
      },
    },
  },
};

module.exports = {dashboardSchema};