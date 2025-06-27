import { getDeathDate } from '../getDeathDate';

describe('getDeathDate', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should return a future date when age is less than life expectancy', () => {
		const mockDate = new Date(2023, 0, 1);
		vi.setSystemTime(mockDate);

		const age = 30;
		const lifeExpectancy = 80;
		const remainingYears = lifeExpectancy - age;
		const remainingMilliseconds = remainingYears * 365.25 * 24 * 60 * 60 * 1000;
		const expectedDate = Date.now() + remainingMilliseconds;

		expect(getDeathDate(age, lifeExpectancy)).toBe(expectedDate);
	});

	it('should return the current date when age is equal to life expectancy', () => {
		const mockDate = new Date(2023, 0, 1);
		vi.setSystemTime(mockDate);

		const age = 80;
		const lifeExpectancy = 80;
		const expectedDate = Date.now();

		expect(getDeathDate(age, lifeExpectancy)).toBe(expectedDate);
	});

	it('should return a past date when age is greater than life expectancy', () => {
		const mockDate = new Date(2023, 0, 1);
		vi.setSystemTime(mockDate);

		const age = 90;
		const lifeExpectancy = 80;
		const remainingYears = lifeExpectancy - age;
		const remainingMilliseconds = remainingYears * 365.25 * 24 * 60 * 60 * 1000;
		const expectedDate = Date.now() + remainingMilliseconds;

		expect(getDeathDate(age, lifeExpectancy)).toBe(expectedDate);
	});
});
