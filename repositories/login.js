import Repository from "../libs/repository";

class LoginRepository extends Repository {
  constructor({ request }) {
    super({ request, resource: "/auth/login" });
  }
}

export default LoginRepository;
