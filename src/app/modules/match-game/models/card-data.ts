type CardDataType = 'a' | 'q'

export class CardData {
  index: number
  type: CardDataType
  text: string

  constructor(props: { index: number; type: CardDataType; text: string }) {
    this.index = props.index
    this.type = props.type
    this.text = props.text
  }

  getCardId(): string {
    return `${this.index}:${this.type}`
  }
}
