/**
 * `T` with the listed keys made optional. Equivalent to
 * `Omit<T, K> & Partial<Pick<T, K>>`.
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
