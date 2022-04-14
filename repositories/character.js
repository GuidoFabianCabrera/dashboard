import Repository from "../libs/repository";

class CharacterRepository extends Repository {
  constructor({ request }) {
    super({ request, resource: "/characters" });
  }
}

export default CharacterRepository;
