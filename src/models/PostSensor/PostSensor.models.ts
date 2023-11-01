export class Sensortemperature {
  private name: string;
  private temperature: number;
  private DataTime: string;

  constructor(name: string, temperature: number, DataTime: string) {
    this.name = name;
    this.temperature = temperature;
    this.DataTime = DataTime;
  }
  public getName(): string {
    return this.name;
  }

  public getTemperature(): number {
    return this.temperature;
  }

  public getDataTime(): string {
    return this.DataTime;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setTemperature(temperature: number) {
    this.temperature = temperature;
  }

  public setDataTime(DataTime: string) {
    this.DataTime = DataTime;
  }
}
