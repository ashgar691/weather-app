export interface DailyForecasts {
  Date:Date,
  Temperature: {
    Minimum: {
      Value:number
    },
    Maximum: {
      Value: number   
    }
  },
  Day: {
    Icon: number,
    IconPhrase: string,
  },
  Night: {
    Icon: number,
    IconPhrase: string,
  }
}