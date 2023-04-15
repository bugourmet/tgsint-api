import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  sendStatus(): string {
    return "ok";
  }
}
