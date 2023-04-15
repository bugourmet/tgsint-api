import { Module } from "@nestjs/common";
import { PlatesController } from "./controllers/plates.controller";
import PlatesService from "./services/plates.service";

@Module({
  imports: [],
  controllers: [PlatesController],
  providers: [PlatesService],
})
export class PlatesModule {}
