function createPreconfiguredDashboardPayload(name = 'Default Dashboard', widgets = []) {
  return {
    name,
    description: `description of a dashboard: ${name}`,
    config: {
      widgets: widgets.map((widget, index) => ({
        widgetObject: {
          widgetName: widget.widgetName || `Widget ${index + 1}`,
          widgetId: widget.widgetId || index + 1,
          widgetType: widget.widgetType || 'launchStatistics',
          widgetSize: widget.widgetSize || { width: 2, height: 2 },
          widgetPosition: widget.widgetPosition || { positionX: 0, positionY: 0 },
          widgetOptions: widget.widgetOptions || {}
        },
        widgetResource: {
          description: widget.description || 'Widget',
          owner: widget.owner || 'Autotest',
          id: widget.id || 100 + index,
          name: widget.name || `Resource ${index + 1}`,
          widgetType: widget.widgetType || 'launchStatistics',
          contentParameters: widget.contentParameters || {
            contentFields: ['statistics$executions$total'],
            itemsCount: 10,
            widgetOptions: {}
          },
          appliedFilters: widget.appliedFilters || [],
          content: widget.content || {}
        }
      }))
    }
  };
}

module.exports = { createPreconfiguredDashboardPayload };
