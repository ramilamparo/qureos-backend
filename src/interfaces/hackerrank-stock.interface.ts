export interface HackerrankStock {
	page: number;
	per_page: number;
	total: number;
	total_pages: 1;
	data: Array<{
		date: string;
		open: number;
		high: number;
		low: number;
		close: number;
	}>;
}
