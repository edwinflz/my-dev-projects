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
	{
		id: 2,
		title: 'Social Links Profile',
		description: 'In this small project, you\'ll build out your social link-sharing profile. You can even personalize it and use it to share all your social profiles!',
		image: '/images/social-links-profile.webp',
		tags: ['HTML5', 'SCSS'],
		demoUrl: 'https://social-links-profile-three-tau.vercel.app/',
		repoUrl: 'https://github.com/edwinflz/social-links-profile'
	},
];