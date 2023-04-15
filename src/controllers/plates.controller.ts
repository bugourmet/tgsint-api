import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import PlatesService from "src/services/plates.service";

@Controller("carlookup")
export class PlatesController {
  constructor(private readonly platesService: PlatesService) {}

  @Get("/hr")
  public async hrCheck(@Query() query: { plates: string }): Promise<any> {
    const { plates } = query;
    if (!plates) {
      throw new BadRequestException("Request rejected", {
        description: "Missing plates!",
      });
    }
    const result = await this.platesService.croCheck(plates);

    return { result };
  }

  @Get("/bih")
  public async bihCheck(@Query() query: { plates: string }): Promise<any> {
    const { plates } = query;
    if (!plates) {
      throw new BadRequestException("Request rejected", {
        description: "Missing plates!",
      });
    }
    const result = await this.platesService.bihCheck(plates);

    return { result };
  }

  @Get("/vin")
  public async vinCheck(
    @Query() query: { month: string; number: string }
  ): Promise<any> {
    const { month, number } = query;

    if (!number || !month) {
      throw new BadRequestException("Request rejected", {
        description: "Missing params",
      });
    }

    const result = await this.platesService.vinCheck(number, month);

    return result;
  }
}
