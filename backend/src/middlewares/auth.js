const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  setTimeout(() => {
    try {
      const whiteLists = ["/", "/login", "/register"];
      if (
        whiteLists.find((item) => "/v1/api" + item === req.baseUrl + req.path)
      ) {
        next();
        return;
      }
      if (req.headers.authorization?.split(" ")?.[1]) {
        const accessToken = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded;
      } else {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
      next();
    } catch (error) {
      // Kiểm tra loại lỗi JWT
      if (error.name === "TokenExpiredError") {
        console.log("Token đã hết hạn");
        return res.status(401).json({
          message: "Token đã hết hạn",
          error: "TokenExpiredError",
        });
      } else if (error.name === "JsonWebTokenError") {
        console.log("Token không hợp lệ");
        return res.status(401).json({
          message: "Token không hợp lệ",
          error: "JsonWebTokenError",
        });
      } else {
        console.log("Lỗi xác thực:", error.message);
        return res.status(401).json({
          message: "Lỗi xác thực",
          error: error.message,
        });
      }
    }
  }, 2000);
};
module.exports = { auth };
