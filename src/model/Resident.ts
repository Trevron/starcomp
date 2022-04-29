/**
 * Interface for Residents.
 */

export interface ResidentInterface {
  id: string;
  planetID: string;
  name: string;
  gender: string;
  birthyear: string;
  height: number;
}

export interface ResidentConnection {
  residents: ResidentInterface[];
}
