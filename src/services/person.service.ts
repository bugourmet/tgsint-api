import person from "src/models/person";

export class PersonService {
  async findByNumber(phonenum: string) {
    const result = await person.find({ phonenum });

    return result;
  }

  async findByName(name: string, surname: string) {
    const result = await person.find({
      name: { $regex: name, $options: "i" },
      surname: { $regex: surname, $options: "i" },
    });

    return result;
  }
}
