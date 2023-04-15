import { NestFactory } from "@nestjs/core";
import mongoose from "mongoose";
import helmet from "helmet";
import { AppModule } from "./app.module";
import "dotenv/config";
import * as morgan from "morgan";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 5000;

  app.enableCors();
  app.use(helmet());
  app.use(morgan("combined"));

  mongoose.connect(process.env.MONGO_URI, () => {
    console.log("Connected to the database!");
  });

  await app.listen(port);
}

bootstrap();
