import app from "./app";
import db from "./db/models";
import {initializeSocket} from "./socket/index.js";
import { createServer } from "http";


let port  = process.env.PORT

const initializeServer = async() => {
  try {
    await db.sequelize.authenticate()
    const httpServer = createServer(app)
    const socketServer = initializeSocket(httpServer)
    app.set("io",socketServer)
    httpServer.listen(port,()=>{
      console.log('app running at port', port);
    })
  }catch (err){
    console.log(err);
  }
}

initializeServer()