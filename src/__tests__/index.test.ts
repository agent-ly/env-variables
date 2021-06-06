import {string, boolean, number, integer} from '../index'

test('`string()` should fall back to default if no key is found', () => {
    expect(string('EXAMPLE_STRING', 'DEFAULT')).toBe('DEFAULT')
})

test('`boolean()` should default to `false` if no key is found', () => {
    expect(boolean('EXAMPLE_BOOLEAN')).toBe(false)
})

test('`number()` should return the value of EXAMPLE_NUMBER parsed', () => {
    expect(number('EXAMPLE_NUMBER', 0.01)).toBe(0.01)
})

test('`integer()` should return the value of EXAMPLE_INTEGER parsed', () => {
    expect(integer('EXAMPLE_INTEGER', 1)).toBe(1)
})