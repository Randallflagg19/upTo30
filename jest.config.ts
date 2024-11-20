export default {
	preset: 'ts-jest', // Использует ts-jest для работы с TypeScript
	testEnvironment: 'node', // Устанавливает окружение для тестов
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'], // Поддержка расширений файлов
	transform: {
		'^.+\\.tsx?$': 'ts-jest' // Трансформация файлов TypeScript
	},
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy' // Мок для CSS
	},
	testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'] // Тестовые файлы
}
