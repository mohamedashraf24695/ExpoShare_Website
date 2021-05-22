const mongoose = require ('mongoose'); 

const connectDB = async()=>{

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true ,
            useUnifiedTopology:true ,
            useFindAndModify:false , 
            useNewUrlParser: true
        })

        console.log("MongoDB Connected : " + conn.connection.host) ;

    }
    catch(err){
        console.log(err) ; 
        process.exit(1);

    }

}

module.exports = connectDB ;