
class DashboardAPI {
  constructor(apiClient, projectName) {
    this.apiClient = apiClient;
    this.projectName = projectName;
  }

  async getAllDashboards(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `/api/v1/${this.projectName}/dashboard` + (queryString ? `?${queryString}` : '');
    return this.apiClient.get(url);
  }

  async getDashboard(dashboardId) {
    return this.apiClient.get(`/api/v1/${this.projectName}/dashboard/${dashboardId}`);
  }

  async createDashboard(payload) {
    return this.apiClient.post(`/api/v1/${this.projectName}/dashboard`, payload);
  }

  async createPreconfiguredDashboard(payload) {
    return this.apiClient.post(`/api/v1/${this.projectName}/dashboard/preconfigured`, payload);
  }

  async updateDashboard(dashboardId, payload) {
    return this.apiClient.put(`/api/v1/${this.projectName}/dashboard/${dashboardId}`, payload);
  }

  async deleteDashboard(dashboardId) {
    return this.apiClient.delete(`/api/v1/${this.projectName}/dashboard/${dashboardId}`);
  }

  async addWidget(dashboardId, payload) {
    return this.apiClient.put(`/api/v1/${this.projectName}/dashboard/${dashboardId}/add`, payload);
  }

  async getDashboardConfig(dashboardId) {
    return this.apiClient.get(`/api/v1/${this.projectName}/dashboard/${dashboardId}/config`);
  }

  async deleteWidget(dashboardId, widgetId) {
    return this.apiClient.delete(`/api/v1/${this.projectName}/dashboard/${dashboardId}/${widgetId}`);
  }
}

module.exports = { DashboardAPI };
