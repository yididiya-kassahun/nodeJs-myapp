const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>My Form</title></head>");
    res.write(
      "<body><form method='POST' action='/message'> <input type='text' name='message'><button type='submit'>Sumbit</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const data = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      data.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(data).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
      console.log(message);
    });
  }

  res.write("<html>");
  res.write("<head><tclitle>This is my first Node JS</title></head>");
  res.write("<body>  Hello From Node JS Server </body>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;
