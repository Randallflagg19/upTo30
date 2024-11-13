export const required = (value: any) =>
	value ? undefined : 'Field is required'

export const maxLength = (max: number) => (value: any) =>
	value && value.length > max ? `Max length is ${max}` : undefined

export const minLength = (min: number) => (value: any) =>
	value && value.length < min ? `Min length is ${min}` : undefined

export const composeValidators = (...validators: Array<(value: any) => string | undefined>) =>
	(value: any) => validators.reduce<string | undefined>((error, validator) => error || validator(value), undefined)

