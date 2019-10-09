declare namespace NodeJS {
  export interface Global {
    log(...args: any[]): void
    peek(...args: any[]): (value: any) => any
  }
}
