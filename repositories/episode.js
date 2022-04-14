import Repository from "../libs/repository";

class EpisodeRepository extends Repository {
  constructor({ request }) {
    super({ request, resource: "/episodes" });
  }
}

export default EpisodeRepository;
