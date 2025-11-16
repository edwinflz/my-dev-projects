export interface Project {
	id: number;
	title: string;
	description: string;
	image: string;
	tags: string[];
	demoUrl: string;
	repoUrl: string;
}

export const projects: Project[] = [
	{
		id: 1,
		title: 'Recipe Page',
		description: 'This challenge will help you focus on writing semantic HTML. Ensure you think through what HTML elements are most appropriate for each piece of content.',
		image: '/images/recipe-page.webp',
		tags: ['HTML5', 'SCSS'],
		demoUrl: 'https://recipe-page-silk-omega.vercel.app/',
		repoUrl: 'https://github.com/edwinflz/recipe-page'
	},
];