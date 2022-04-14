import Repositories from "../repositories";

export default (ctx, inject) => {
  inject("repository", new Repositories({ baseURL: process.env.baseURL }));
};
