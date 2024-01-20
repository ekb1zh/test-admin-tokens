export class FetchError<T> extends Error {
  constructor(
    public readonly data: T,
    message?: string,
    options?: ErrorOptions,
  ) {
    super(message, options)
  }
}
