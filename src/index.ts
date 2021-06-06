function getRawString(keyOrKeys: string | string[]): string | undefined {
    if (keyOrKeys instanceof Array) {
        for (let key of keyOrKeys) {
            if (key in process.env) {
                return process.env[key]
            }
        }
    } else return process.env[keyOrKeys]
}

export function string(keyOrKeys: string | string[], defaultValue: string): string {
    return getRawString(keyOrKeys) || defaultValue
}

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

export function number(key: string, defaultValue: number): number {
    return getNumber(key, defaultValue, false)
}

export function integer(key: string, defaultValue: number): number {
    return getNumber(key, defaultValue, true)
}
