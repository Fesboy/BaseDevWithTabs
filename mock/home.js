const Mock = require("mockjs");

const username = Mock.mock("@name");

module.exports = {
  ["GET /api/user/name"](req, res) {
    res.status(200).json({
      status: true,
      message: "操作成功",
      body: {
        name: username
      }
    });
  }
};
