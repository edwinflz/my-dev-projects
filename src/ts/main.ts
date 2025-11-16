import '../styles/main.scss';
import { projects, type Project } from '../assets/data/projects';

// ===== STATE =====
interface AppState {
	searchQuery: string;
	activeFilters: Set<string>;
	allTags: Set<string>;
}

const state: AppState = {
	searchQuery: '',
	activeFilters: new Set(),
	allTags: new Set()
};

// ===== UTILITIES =====
function getAllTags(): string[] {
	const tags = new Set<string>();
	projects.forEach(project => {
		project.tags.forEach(tag => tags.add(tag));
	});
	return Array.from(tags).sort();
}

function normalizeText(text: string): string {
	return text.toLowerCase().trim();
}

function filterProjects(): Project[] {
	return projects.filter(project => {

		const matchesSearch = state.searchQuery === '' ||
			normalizeText(project.title).includes(state.searchQuery) ||
			normalizeText(project.description).includes(state.searchQuery) ||
			project.tags.some(tag => normalizeText(tag).includes(state.searchQuery));

		const matchesTags = state.activeFilters.size === 0 ||
			Array.from(state.activeFilters).every(filter =>
				project.tags.some(tag => normalizeText(tag) === normalizeText(filter))
			);

		return matchesSearch && matchesTags;
	});
}


function scrollToProjects(): void {
	const projectsContainer = document.getElementById('projects-container');
	if (!projectsContainer) return;

	projectsContainer.scrollIntoView({
		behavior: 'smooth',
		block: 'start'
	});
}

function handleScroll(): void {
	const filters = document.querySelector('.filters');
	if (!filters) return;

	if (window.scrollY > 100) {
		filters.classList.add('filters--scrolled');
	} else {
		filters.classList.remove('filters--scrolled');
	}
}

// ===== RENDER FUNCTIONS =====
function createProjectCard(project: Project): string {
	const imageHTML = project.image
		? `<img src="${project.image}" alt="${project.title}">`
		: `<div class="project-card__image--placeholder">📦</div>`;

	const tagsHTML = project.tags
		.map(tag => `<span class="project-card__tag">${tag}</span>`)
		.join('');

	return `
    <article class="project-card">
      <div class="project-card__image">
        ${imageHTML}
      </div>
      <div class="project-card__content">
        <h2 class="project-card__title">${project.title}</h2>
        <div class="project-card__tags">
          ${tagsHTML}
        </div>
        <p class="project-card__description">${project.description}</p>
        <div class="project-card__actions">
          <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="project-card__button project-card__button--primary">
            Live Demo
          </a>
          <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="project-card__button project-card__button--secondary">
            View Code
          </a>
        </div>
      </div>
    </article>
  `;
}

function renderProjects(): void {
	const container = document.getElementById('projects-container');
	const noResults = document.getElementById('no-results');

	if (!container || !noResults) return;

	const filteredProjects = filterProjects();

	if (filteredProjects.length === 0) {
		container.style.display = 'none';
		noResults.style.display = 'block';
	} else {
		container.style.display = 'grid';
		noResults.style.display = 'none';
		const projectsHTML = filteredProjects.map(createProjectCard).join('');
		container.innerHTML = projectsHTML;
	}
}

function renderFilterTags(): void {
	const container = document.getElementById('filter-tags');
	if (!container) return;

	const allTags = getAllTags();

	const tagsHTML = allTags.map(tag => {
		const isActive = state.activeFilters.has(tag);
		const activeClass = isActive ? 'filters__tag--active' : '';
		return `
      <button 
        class="filters__tag ${activeClass}" 
        data-tag="${tag}"
      >
        ${tag}
      </button>
    `;
	}).join('');

	container.innerHTML = tagsHTML;
}

function renderActiveFilters(): void {
	const container = document.getElementById('active-filters');
	if (!container) return;

	if (state.activeFilters.size === 0) {
		container.innerHTML = '';
		return;
	}

	const filtersHTML = Array.from(state.activeFilters).map(filter => `
    <div class="filters__active-tag">
      ${filter}
      <button class="filters__remove-btn" data-filter="${filter}">×</button>
    </div>
  `).join('');

	container.innerHTML = filtersHTML;
}

// ===== EVENT HANDLERS =====
function handleSearch(event: Event): void {
	const input = event.target as HTMLInputElement;
	state.searchQuery = normalizeText(input.value);
	renderProjects();
}

function handleTagClick(event: Event): void {
	const target = event.target as HTMLElement;
	if (!target.classList.contains('filters__tag')) return;

	const tag = target.dataset.tag;
	if (!tag) return;

	if (state.activeFilters.has(tag)) {
		state.activeFilters.delete(tag);
	} else {
		state.activeFilters.add(tag);
	}

	renderFilterTags();
	renderActiveFilters();
	renderProjects();

	setTimeout(scrollToProjects, 100);
}

function handleRemoveFilter(event: Event): void {
	const target = event.target as HTMLElement;
	if (!target.classList.contains('filters__remove-btn')) return;

	const filter = target.dataset.filter;
	if (!filter) return;

	state.activeFilters.delete(filter);
	renderFilterTags();
	renderActiveFilters();
	renderProjects();

	setTimeout(scrollToProjects, 100);
}

// ===== INITIALIZATION =====
function init(): void {

	renderFilterTags();
	renderActiveFilters();
	renderProjects();

	const searchInput = document.getElementById('search-input');
	const filterTags = document.getElementById('filter-tags');
	const activeFilters = document.getElementById('active-filters');

	if (searchInput) {
		searchInput.addEventListener('input', handleSearch);
	}

	if (filterTags) {
		filterTags.addEventListener('click', handleTagClick);
	}

	if (activeFilters) {
		activeFilters.addEventListener('click', handleRemoveFilter);
	}

	window.addEventListener('scroll', handleScroll);
}

document.addEventListener('DOMContentLoaded', init);