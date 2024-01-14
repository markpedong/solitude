import { isArray, isObject, isString } from 'lodash'
import { compress, decompress } from 'lz-string'

export const setLocalStorage = (key: string, value: string | object | [any] | any) => {
    if (isObject(value) || isArray(value) || isString(value)) {
        value = JSON.stringify(value)
    }

    const compressedKey = compress(key)
    const compressedValue = compress(JSON.stringify(value))

    localStorage.setItem(compressedKey, compressedValue)
}

export const getLocalStorage = (key: string) => {
    const compressedValue = localStorage.getItem(compress(key))

    if (compressedValue !== null) {
        const decompressedValue = decompress(compressedValue)
        return JSON.parse(decompressedValue)
    }
}
