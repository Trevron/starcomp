export interface ResidentInterface {
  id: string;
  planetID: string;
  name: string;
  gender: string;
  birthyear: string;
  height: number;
}

class Resident {
  private id: string;
  private planetID: string;
  private name: string;
  private gender: string;
  private birthyear: string;
  private height: number;

  constructor({
    id,
    planetID,
    name,
    gender,
    birthyear,
    height,
  }: ResidentInterface) {
    this.id = id;
    this.planetID = planetID;
    this.name = name;
    this.gender = gender;
    this.birthyear = birthyear;
    this.height = height;
  }

  public getID = () => {
    return this.id;
  };

  public setID = (id: string) => {
    this.id = id;
  };

  public getPlanetID = () => {
    return this.planetID;
  };

  public setPlanetID = (planetID: string) => {
    this.planetID = planetID;
  };

  public getName = () => {
    return this.name;
  };

  public setName = (name: string) => {
    this.name = name;
  };

  public getGender = () => {
    return this.gender;
  };

  public setGender = (gender: string) => {
    this.gender = gender;
  };

  public getBirthyear = () => {
    return this.name;
  };

  public setBirthyear = (birthyear: string) => {
    this.birthyear = birthyear;
  };

  public getHeight = () => {
    return this.height;
  };

  public setHeight = (height: number) => {
    this.height = height;
  };
}

export default Resident;
