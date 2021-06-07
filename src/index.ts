import globToRegexp from 'glob-to-regexp'

function getRawString(keyOrKeys: string | string[]): string | undefined {
    if (keyOrKeys instanceof Array) {
        for (let key of keyOrKeys) {
            if (key in process.env) {
                return process.env[key]
            }
        }
    } else return process.env[keyOrKeys]
}

/**
 * Parses an environment variable as a string
 * @param keyOrKeys If an array, will look for the first exact match that exists
 * @param defaultValue 
 */
export function string(keyOrKeys: string | string[], defaultValue?: string): string | undefined {
    return getRawString(keyOrKeys) || defaultValue
}

/**
 * Parses an environment variable as a boolean: '1', 'true', '0', 'false'
 * @param key 
 * @param defaultValue 
 */
export function boolean(key: string, defaultValue: boolean = false): boolean {
    const  strValue = getRawString(key)
    if (strValue === undefined) return defaultValue
    switch (strValue.toLowerCase()) {
        case '1':
        case 'true':
            return true

        case '0':
        case 'false':
            return false
        
        default:
            throw new Error(`Environment variable "${key}" is not a boolean`)
    }
}

function getNumber(key: string, defaultValue?: number, isInteger: boolean = false) {
    const  strValue = getRawString(key)
    if (!strValue) return defaultValue
    const numberValue = isInteger ? parseInt(strValue, 10) : parseFloat(strValue)
    if (isNaN(numberValue)) throw new Error(`"${key}" is not a number`)
    return numberValue  
}

/**
 * Parses an environment variable as a number
 * @param key 
 * @param defaultValue 
 */
export function number(key: string, defaultValue?: number): number | undefined {
    return getNumber(key, defaultValue, false)
}

/**
 * Parses an environment variable as an integer
 * @param key 
 * @param defaultValue 
 */
export function integer(key: string, defaultValue?: number): number | undefined {
    return getNumber(key, defaultValue, true)
}

/**
 * Maps all values by their key that matches `keyPattern`
 * @param keyPattern 
 */
export function stringGlob(keyPattern: string): Record<string, string | any> {
    const regex = globToRegexp(keyPattern)
    const result: Record<string, string | any> = {}
    for (let key in process.env)
        if (regex.test(key)) result[key] = process.env[key]
    return result
}

export default {string, boolean, number, integer, stringGlob}