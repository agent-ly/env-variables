import {config} from 'dotenv'
import {string, boolean, number} from '../index'

config()

test('`string()` should fall back to default if no key is found', () => {
    expect(string('EXAMPLE_STRING', 'DEFAULT')).toBe('DEFAULT')
})

test('`boolean()` should default to `false` if no key is found', () => {
    expect(boolean('EXAMPLE_BOOLEAN')).toBe(false)
})

test('`number()` should return the value of EXAMPLE_NUMBER parsed', () => {
    expect(number('EXAMPLE_NUMBER', 1)).toBe(1)
})