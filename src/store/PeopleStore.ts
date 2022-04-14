export interface PersonInterface {
  id: string;
  planetID: string;
  name: string;
  gender: string;
  height: number;
  born: string;
}

export interface PeopleInterface {
  planetID: string;
  people: PersonInterface[];
}

class PeopleStore {
  // Change this to use the PeopleInterface instead.
  public people: PersonInterface[] = [];

  public addPerson = (person: PersonInterface) => {
    this.people.push(person);
  };

  public updatePerson = (updatedPerson: PersonInterface) => {
    const updatedPeople = this.people.map((person) => {
      if (person.id === updatedPerson.id) {
        return { ...updatedPerson };
      }
      return person;
    });
    this.people = updatedPeople;
  };

  public deletePlanet = (id: string) => {
    const updatedPeople = this.people.filter((person) => person.id !== id);
    this.people = updatedPeople;
  };
}

const peopleStore = new PeopleStore();
export default peopleStore;
