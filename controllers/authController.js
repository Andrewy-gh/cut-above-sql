/**
 * @description login user
 * @route /login
 * @method POST
 * @returns {Response | Error} 204 for successful response
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  req.session.user = email;
  // add username and password validation logic here if you want.If user is authenticated send the response as success
  res.status(204).end();
};

/**
 * @description get account details from session
 * @route /account
 * @method GET
 * @returns {Session}
 */
export const getAccount = async (req, res) => {
  res.json(req.session);
};
