/**
 * Delay call stack for x milliseconds
 *
 * @function delay
 * @param ms {Number} - The number of milliseconds to delay
 * @returns Promise<void>
 */
export default async (ms: number): Promise<void> => {
	return await new Promise((resolve) => setTimeout(resolve, ms));
};
