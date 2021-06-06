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
 * @returns 
 */
export function string(keyOrKeys: string | string[], defaultValue: string): string {
    return getRawString(keyOrKeys) || defaultValue
}

/**
 * Parses an environment variable as a boolean: '1', 'true', '0', 'false'
 * @param key 
 * @param defaultValue 
 * @returns 
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

function getNumber(key: string, defaultValue: number, isInteger: boolean) {
    const  strValue = getRawString(key)
    if (!strValue) return defaultValue
    const numberValue = isInteger ? parseInt(strValue, 10) : parseFloat(strValue)
    if (isNaN(numberValue)) throw new Error(`"${key}" is not a number`)
    return numberValue  
}

/**
 * Parsese an environment variable as a number
 * @param key 
 * @param defaultValue 
 * @returns 
 */
export function number(key: string, defaultValue: number): number {
    return getNumber(key, defaultValue, false)
}

/**
 * Parsese an environment variable as an integer
 * @param key 
 * @param defaultValue 
 * @returns 
 */
export function integer(key: string, defaultValue: number): number {
    return getNumber(key, defaultValue, true)
}
