import axios from "axios";
import axiosHelpers from "axios-helpers";
import LocationRepository from "./location";
import EpisodeRepository from "./episode";
import CharacterRepository from "./character";
import LoginRepository from "./login";

class Repository {
  constructor({ baseURL }) {
    this.request = axiosHelpers(axios.create({ baseURL }));
    this.location = new LocationRepository({ request: this.request });
    this.episode = new EpisodeRepository({ request: this.request });
    this.character = new CharacterRepository({ request: this.request });
    this.login = new LoginRepository({ request: this.request });
  }
}

export default Repository;
