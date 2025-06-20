export type Keyed<T> = Record<string, T>

/**
 * Converts an array of objects with an id property to a keyed object.
 * @example
 * ```ts
 * const array = [
 *   { id: '1', user: { name: 'John' } },
 *   { id: '2', user: { name: 'Jane' } },
 * ]
 * const keyed = arrayToKeyed(array, 'user.name')
 * // {
 * //   'John': { id: '1', user: { name: 'John' } },
 * //   'Jane': { id: '2', user: { name: 'Jane' } },
 * // }
 */
export const arrayToKeyed = <TObject extends { [key: string]: unknown }>(
  data: TObject[],
  itemKey = 'id',
): Keyed<TObject> => {
  const resultKeyed: Record<string, TObject> = {}
  data.forEach((item: TObject) => {
    resultKeyed[item[itemKey] as string] = item
  })
  return resultKeyed
}

/**
 * Converts a keyed object to an array of objects.
 * @example
 * ```ts
 * const keyed = {
 *   '1': { id: '1', user: { name: 'John' } },
 *   '2': { id: '2', user: { name: 'Jane' } },
 * }
 * const array = keyedToArray(keyed)
 * // [
 * //   { id: '1', user: { name: 'John' } },
 * //   { id: '2', user: { name: 'Jane' } },
 * // ]
 */
export const keyedToArray = <TObject>(data: Keyed<TObject>): TObject[] => {
  return Object.values(data)
}
