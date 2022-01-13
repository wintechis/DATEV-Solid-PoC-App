export interface Buchung {
  type: "Einnahme" | "Ausgabe",
  date: Date,
  amount: number,
  description: string,
  id: number
  resourceUrl: string
}
