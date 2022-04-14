export default ctx => {
  const token = ctx.$cookies.get("token");
  ctx.$repository.request.setToken(token, "Bearer");
};
