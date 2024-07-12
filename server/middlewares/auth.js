exports.isAuthenticated = (req, res, next) => {
  const token = req.cookies['connect.sid'];
  console.log(token);
  if (!token) {
    res.json({
        success:false,
        message:'not Logged in'
    });
    return;
  }
  next();
};