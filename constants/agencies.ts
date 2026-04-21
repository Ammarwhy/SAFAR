export type Agency = {
	id: string;
	name: string;
	year: number;
	specialty: string;
	imageUri: string;
};

export const agencies: Agency[] = [
	{
		id: "kashi",
		name: "Kashi Journeys",
		year: 1984,
		specialty: "Spiritual architecture and river-based expeditions.",
		imageUri:
			"https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "nomad-silk",
		name: "Nomad Silk Road",
		year: 1992,
		specialty: "Central Asian heritage from Registan to Kyzylkum routes.",
		imageUri:
			"https://images.unsplash.com/photo-1603553329474-99f95f35394b?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "nabataean",
		name: "The Nabataean Guild",
		year: 2005,
		specialty: "Archaeological tours through desert kingdoms.",
		imageUri:
			"https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=900&q=80",
	},
];
