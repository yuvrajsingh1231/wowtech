const mongoose = require("mongoose");
const url = process.env.DATABASE_URL || "mongodb://localhost:27017/users"; 
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true,
    
}).then(() => {
    console.log("connect sucessful")
}).catch((error) => {
    console.log(error);
});

