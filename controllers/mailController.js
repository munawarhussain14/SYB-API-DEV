const List = require("../models/listing");
const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/ApiFeatures");
const sendEmail = require("../utils/sendEmail");

// Register a user => /api/v1/register
exports.sendMail = catchAsyncError(async (req, res, next) => {
  const { user_id, list_id, message } = req.body;
  console.log(message);
  console.log("==============");
  const user = await User.findById(user_id);
  const list = await List.findById(list_id);

  if (!user) {
    return next(new ErrorHandler("Invalid User", 400));
  }

  if (!list) {
    return next(new ErrorHandler("Invalid Business", 400));
  }
  const issues = [
    { issues: { issuesList: JSON.stringify(message) } },
    ...list.issues,
  ];

  await list.updateOne({
    $push: {
      issues: { issuesList: JSON.stringify(message) },
    },
  });

  let body = "<div style='text-align:left'>";
  for (var key in message) {
    body += `<h2>${message[key].name}</h2>\n`;
    if (message[key].issues && message[key].issues.length > 0) {
      body += `<h4>Issues</h4>\n`;
      body += `<ul>`;
      message[key].issues.map((e) => {
        body += `<li>${e}</li>`;
      });
      body += `</ul>`;
    }
    if (message[key].comment) {
      body += `<h4>Special Comment</h4>\n`;
      body += `<p>${message[key].comment}</p>`;
    }
    body += "</hr>";
  }

  /*
  await sendEmail({
    email: user.email,
    subject: "Business Listing Issues",
    message: body,
  });*/

  res.status(200).json({
    success: true,
    message: `Email sent to: ${user.email}`,
  });
});
