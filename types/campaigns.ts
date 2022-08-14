export type Donation = {
  slug: string;
  name: string;
  picture: string;
  price: number;
};

export type Campaign = {
  name: string;
  slug: string;
  short_description: string;
  long_description: string;
  cover_picture: string;
  slide_pictures: string[];
  featured?: true;
  donations: Donation[];
};
