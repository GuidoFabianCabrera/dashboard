import Repository from "../libs/repository";

class LocationRepository extends Repository {
  constructor({ request }) {
    super({ request, resource: "/locations" });
  }
}

export default LocationRepository;
