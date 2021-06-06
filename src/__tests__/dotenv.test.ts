import {config} from 'dotenv'
import {join} from 'path'
import {boolean, integer, number, string} from '..'

config({path: join(__dirname, './example.env')})

test(
    `string() with a single key should resolve properly`,
    () => expect(string('EXAMPLE_STRING', 'Bye world!')).toBe('Hello world!')
)

test(
    `string() with multiple keys should resolve properly`,
    () => expect(string(['EXAMPLE_POSSIBLE_STRING', 'EXAMPLE_STRING'], 'Bye world!'))
        .toBe('Hello world!')
)

test('`boolean()` should parse properly', () => {
    expect(boolean('EXAMPLE_TRUTHY_BOOLEAN')).toBe(true)
    expect(boolean('EXAMPLE_FALSY_BOOLEAN', true)).toBe(false)
    expect(() => boolean('EXAMPLE_INVALID_BOOLEAN')).toThrow()
})

test('`number()` & `integer()` should parse properly',() => {
    expect(number('EXAMPLE_NUMBER', .01)).toBe(.001)
    expect(integer('EXAMPLE_INTEGER', 1)).toBe(10)
    expect(() => number('EXAMPLE_INVALID_NUMBER', .01)).toThrow()
})


