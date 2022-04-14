class Repository {
  constructor({ request, resource }) {
    this._request = request;
    this._resource = resource;
  }

  search() {
    return this._request.$get(`${this._resource}/`);
  }

  findOne(filterKey) {
    return this._request.$get(`${this._resource}/${filterKey}`);
  }

  createOne(payload) {
    return this._request.$post(`${this._resource}`, payload);
  }

  updateOne(filterKey, payload) {
    return this._request.$put(`${this._resource}/${filterKey}`, payload);
  }

  deleteOne(filterKey) {
    return this._request.$delete(`${this._resource}/${filterKey}`);
  }
}

export default Repository;
