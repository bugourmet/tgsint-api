import { Module } from "@nestjs/common";
import { PersonController } from "./controllers/person.controller";
import { PersonService } from "./services/person.service";

@Module({
  imports: [],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
