export type Destination = {
	id: string;
	title: string;
	subtitle: string;
	imageUri: string;
	badge?: string;
};

export type DNAProfile = {
	heritage: number;
	culinary: number;
	urban: number;
	nature: number;
	adventure: number;
	relaxation: number;
};

export type ExploreJourney = {
	title: string;
	description: string;
	image: string;
	matchCount: number;
	subtitle?: string;
};

export type VicinityTraveler = {
	id: string;
	name: string;
	location: string;
	avatar: string;
};

export type MatchProfile = {
	id: string;
	name: string;
	age: number;
	location: string;
	avatar: string;
	matchPct: number;
	bio: string;
	tags: string[];
};

export const destinations: Destination[] = [
	{
		id: "samarkand",
		title: "Samarkand: The Blue City",
		subtitle: "Tracing the ancient routes of the Silk Road",
		badge: "CACHED",
		imageUri:
			"https://images.unsplash.com/photo-1680242865063-9efb7f27f97c?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "varanasi",
		title: "Varanasi: Eternal City",
		subtitle: "Spiritual heartland with layered heritage",
		imageUri:
			"https://images.unsplash.com/photo-1596881324451-600e1cb9f9d4?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "petra",
		title: "Petra: The Rose City",
		subtitle: "Archaeology-led desert route",
		imageUri:
			"https://images.unsplash.com/photo-1579606032821-4e6161c81bd7?auto=format&fit=crop&w=900&q=80",
	},
];

export const currentTrip = {
	title: "The Turquoise Gates",
	status: "Active",
	logs: "8 Archive Logs",
};

export const sampleDNA: DNAProfile = {
	heritage: 0.9,
	culinary: 0.6,
	urban: 0.7,
	nature: 0.5,
	adventure: 0.8,
	relaxation: 0.4,
};

export const matchDNA: DNAProfile = {
	heritage: 0.85,
	culinary: 0.7,
	urban: 0.6,
	nature: 0.6,
	adventure: 0.8,
	relaxation: 0.45,
};

export const MOCK_EXPLORE = {
	featured: {
		title: "Hunza Valley",
		description: "Golden autumn corridors, glacier-fed lakes, and slow heritage trails.",
		region: "NORTHERN PAKISTAN",
		badge: "TRENDING",
		image:
			"https://images.unsplash.com/photo-1556736750-4f05b48c9ab0?auto=format&fit=crop&w=1200&q=80",
	},
	categories: ["MOUNTAINS", "HERITAGE", "DESERT", "LAKES", "CITY"],
	journeys: [
		{
			title: "Karakoram Chronicle",
			description: "High passes, glacier viewpoints, and curated lodge stops.",
			image:
				"https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80",
			matchCount: 18,
		},
		{
			title: "Desert Caravan Nights",
			description: "Sandstone routes, stargazing camps, and craft bazaar detours.",
			image:
				"https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=80",
			subtitle: "SINDH • THAR BELT",
			matchCount: 12,
		},
	],
	vicinityTravelers: [
		{
			id: "1",
			name: "Areeba",
			location: "Skardu",
			avatar:
				"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
		},
		{
			id: "2",
			name: "Zain",
			location: "Hunza",
			avatar:
				"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
		},
		{
			id: "3",
			name: "Maha",
			location: "Gilgit",
			avatar:
				"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
		},
	],
};

export const MOCK_MATCHES: MatchProfile[] = [
	{
		id: "amina",
		name: "Amina Al-Farsi",
		age: 29,
		location: "Muscat, Oman",
		avatar:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
		matchPct: 94,
		bio: "Seeking a fellow traveler for a deep-dive into the Silk Road's architectural evolution. I prioritize historical context over standard tourist traps.",
		tags: ["🏛 History Buff", "🎨 Visual Arts"],
	},
	{
		id: "zain",
		name: "Zain Malik",
		age: 32,
		location: "Lahore, Pakistan",
		avatar:
			"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
		matchPct: 88,
		bio: "Prefer slow routes, mountain silence, and tea stops with good company.",
		tags: ["⛰ Mountain Seekers", "☕ Tea Trail"],
	},
	{
		id: "maha",
		name: "Maha Noor",
		age: 27,
		location: "Gilgit, Pakistan",
		avatar:
			"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80",
		matchPct: 91,
		bio: "I build itineraries around food markets, heritage streets, and local stories.",
		tags: ["🍲 Food Explorer", "🗺 Route Sync"],
	},
];
