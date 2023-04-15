import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PlatesModule } from "./car.module";
import { PersonModule } from "./person.module";

@Module({
  imports: [PersonModule, PlatesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
