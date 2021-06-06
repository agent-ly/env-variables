import {string, boolean, number, integer} from '../index'

test('`string()`, `number()` & `integer()` should fall back to their default values', () => {
    expect(string('EXAMPLE_STRING', 'DEFAULT')).toBe('DEFAULT')
    expect(number('EXAMPLE_NUMBER', 0.01)).toBe(0.01)
    expect(integer('EXAMPLE_INTEGER', 1)).toBe(1)
})

test('`boolean()` should default to `false`', () => {
    expect(boolean('EXAMPLE_BOOLEAN')).toBe(false)
})

