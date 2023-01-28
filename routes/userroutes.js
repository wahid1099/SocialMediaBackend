const router = require("express").Router();
const User = require("../models/UserMode");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/users", async (req, res) => {
  console.log("Request", req.body);
  console.log("url hitted");
  try {
    const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
    const insertResult = await User.create({
      username: req.body.username,
      password: hashedPwd,
    });
    res.send(insertResult);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log(user);
    if (user) {
      const cmp = await bcrypt.compare(req.body.password, user.password);
      if (cmp) {
        //   ..... further code to maintain authentication like jwt or sessions
        res.send("Auth Successful");
      } else {
        res.send("Wrong username or password.");
      }
    } else {
      res.send("Wrong username or password.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
});

router.get("/users/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  res.send(user);
});

router.get("/alluser", async (req, res) => {
  const alluser = await User.find({});
  res.send(alluser);
});

router.get("/users/:username/followers", (req, res) => {
  User.findOne({ username: req.params.username })
    .populate("followers")
    .exec((err, user) => {
      if (err) {
        return res.status(500).send("Error retrieving followers");
      }
      if (!user) {
        return res.status(404).send("User not found");
      }
      return res.status(200).json(user.followers);
    });
});

router.get("/users/:username/following", (req, res) => {
  User.findOne({ username: req.params.username })
    .populate("followers")
    .exec((err, user) => {
      if (err) {
        return res.status(500).send("Error retrieving followers");
      }
      if (!user) {
        return res.status(404).send("User not found");
      }
      return res.status(200).json(user.followers);
    });
});

router.put("/users/:username/follow", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const currentUser = await User.findById(req.body.userId);

    await user.updateOne({ $push: { followers: req.body.userId } });
    await currentUser.updateOne({
      $push: { followings: req.params.id },
    });
    res.status(200).json("user has been followed");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
