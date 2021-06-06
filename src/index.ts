function getRawEnvValue(keyOrKeys: string | string[]): string | undefined {
    if (keyOrKeys instanceof Array) {
        for (let key of keyOrKeys) {
            const value = process.env[key]
            if (value) return value
        }
    } else return process.env[keyOrKeys]
}

/**
 * 
 * @param keyOrKeys If an array, will look for the first exact match of the key
 * @param defaultValue Fall-back string value of the env variable, REQUIRED
 */
export function string(keyOrKeys: string | string[], defaultValue: string): string {
    if (!defaultValue) throw new Error('A default value is required for the string type')
    let value = getRawEnvValue(keyOrKeys) || defaultValue
    return value 
}

/**
 * 
 * @param key Key of the env variable
 * @param defaultValue Fall-back boolean value of the env variable, is false by default
 * @returns 
 */
export function boolean(key: string, defaultValue: boolean = false): boolean {
    const  strValue = getRawEnvValue(key)
    if (strValue === undefined) return defaultValue
    if (strValue !== 'true' && strValue !== 'false') {
        throw new Error(`"${key}" is not a boolean, must be either "true" or "false"`)
    }
    return strValue === 'true'
}

/**
 * 
 * @param key Key of the env variable
 * @param defaultValue Fall-back number value of the env variable, REQUIRED
 */
export function number(key: string, defaultValue: number): number {
    if (!defaultValue) throw new Error('A default value is required for the number type')
    const  strValue = getRawEnvValue(key)
    if (!strValue) return defaultValue
    const numberValue = parseFloat(strValue)
    if (isNaN(numberValue)) {
        throw new Error(`"${key}" is not a number`)
    }
    return numberValue
}
