import { Controller, Get, Query, BadRequestException } from "@nestjs/common";
import { PersonService } from "../services/person.service";

@Controller("person")
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get("/phone")
  public async findByPhone(@Query("number") number: string): Promise<any> {
    if (!number) {
      throw new BadRequestException("Could not complete the request", {
        description: "Missing number!",
      });
    }
    const result = await this.personService.findByNumber(number);

    return { result };
  }

  @Get("/find")
  public async findByName(
    @Query() query: { name: string; surname: string }
  ): Promise<any> {
    const { name, surname } = query;
    if (!name || !surname) {
      throw new BadRequestException("Could not complete the request", {
        description: "Missing params!",
      });
    }

    const result = await this.personService.findByName(name, surname);

    return { result };
  }
}
