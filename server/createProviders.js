import mongoose from "mongoose";
import bcrypt from "bcrypt"
import Provider from "./model/provider.model.js";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(
  process.env.MONGO_URI
);


async function createData(){

try{
await Provider.deleteMany({});
console.log("Old data removed");
const hashedPassword = await bcrypt.hash("123456",10);


let providers = [];


for(let i=1;i<=30000;i++){

providers.push({

name:`Provider ${i}`,

status: "approved",

mobile:`9${String(100000000 + i)}`,

email:`provider${i}@gmail.com`,

password:hashedPassword,


service:
i%2===0 
? "plumber"
: "electrician",


experience:
Math.floor(Math.random()*10),


priceRange:
"500-1000",


location:{

address:`Rajkot Area ${i}`,

city:"Rajkot",

state:"Gujarat",

pincode:"360001",


coordinates:{

type:"Point",

coordinates:[

72.8777 + Math.random()/100,

21.1702 + Math.random()/100

]

}

},


isAvailable:true

});


}


// insert all at once

await Provider.insertMany(
 providers,
 {
  ordered:false
 }
);


console.log(
"10000 providers inserted"
);


process.exit();


}

catch(err){

console.log(err);

process.exit();

}

}


createData();