const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https =require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    const data = {
        members: [{
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }

            }

        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/cbdbb38dc0";
    const options = {
        method: "POST",
        auth: "atharva:aefff899b102d647d664fc86d17fbd86e-us21"
    }

    const request = https.request(url, options, function (response) {
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running at port 3000");
});


//api id
//efff899b102d647d664fc86d17fbd86e-us21
//list id
//cbdbb38dc0