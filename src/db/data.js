const data = [
  {
    id: 1,
    title: "Product 1",
    img: "https://picsum.photos/id/1/1200/1200",
    star: 4.5,
    price: 19.99,
    params: {
      color: ["Red", "Blue", "Green"],
      category: "Category 1",
      geef: "geef",
      dasda: "dasda",
      firm: "Puma",
      availability: "In Stock",
    },
    reviews: [
      { id: 1, rating: 4, comment: "Great product!" },
      { id: 2, rating: 5, comment: "Excellent quality!" },
    ],
  },
  {
    id: 2,
    title: "Product 2",
    img: "https://picsum.photos/id/2/1200/1200",
    star: 3.8,
    price: 12.99,
    params: {
      color: "Blue",
      category: "Category 2",
      firm : "Nike",
      availability: "Out of Stock",
    },
    reviews: [
      { id: 1, rating: 3, comment: "Average product." },
      { id: 2, rating: 4, comment: "Good value for money." },
    ],
  },
  {
    id: 3,
    title: "Product 3",
    img: "https://picsum.photos/id/3/1200/1200",
    star: 4.2,
    price: 15.99,
    params: {
      color: "Green",
      category: "Category 1",
      firm : "Adidas",
      availability: "In Stock",
    },
    reviews: [
      { id: 1, rating: 5, comment: "Amazing product!" },
      { id: 2, rating: 4, comment: "Highly recommended!" },
    ],
  },
  {
    id: 4,
    title: "Product 4",
    img: "https://picsum.photos/id/4/1200/1200",
    star: 4.0,
    price: 9.99,
    params: {
      color: "Yellow",
      category: "Category 2",
      firm : "Puma",
      availability: "Out of Stock",
    },
    reviews: [
      { id: 1, rating: 4, comment: "Good product." },
      { id: 2, rating: 3, comment: "Decent quality." },
    ],
  },
  // Add 16 more objects
  {
    id: 5,
    title: "Product 5",
    img: "https://picsum.photos/id/5/1200/1200",
    star: 4.3,
    price: 14.99,
    params: {
      color: "Purple",
      category: "Category 1",
      firm : "Nike",
      availability: "In Stock",
    },
    reviews: [
      { id: 1, rating: 5, comment: "Awesome product!" },
      { id: 2, rating: 4, comment: "Great value!" },
    ],
  },
  {
    id: 6,
    title: "Product 6",
    img: "https://picsum.photos/id/6/1200/1200",
    star: 3.7,
    price: 11.99,
    params: {
      color: "Orange",
      category: "Category 2",
      firm : "New Balance",
      availability: "Out of Stock",
    },
    reviews: [
      { id: 1, rating: 3, comment: "Not bad." },
      { id: 2, rating: 2, comment: "Could be better." },
    ],
  },
  {
    id: 7,
    title: "Product 7",
    img: "https://picsum.photos/id/7/1200/1200",
    star: 4.4,
    price: 16.99,
    params: {
      color: "Pink",
      category: "Category 1",
      firm : "Under Armour",
      availability: "In Stock",
    },
    reviews: [
      { id: 1, rating: 5, comment: "Fantastic product!" },
      { id: 2, rating: 4, comment: "Great quality!" },
    ],
  },
  {
    id: 8,
    title: "Product 8",
    img: "https://picsum.photos/id/8/1200/1200",
    star: 3.9,
    price: 13.99,
    params: {
      color: "Gray",
      category: "Category 2",
      firm : "Kappa",
      availability: "Out of Stock",
    },
    reviews: [
      { id: 1, rating: 4, comment: "Nice product." },
      { id: 2, rating: 3, comment: "Decent value." },
    ],
  },
  {
    id: 9,
    title: "Product 9",
    img: "https://picsum.photos/id/9/1200/1200",
    star: 4.7,
    price: 21.99,
    params: {
      color: "Brown",
      category: "Category 1",
      firm : "Reebok",
      availability: "In Stock",
    },
    reviews: [
      { id: 1, rating: 5, comment: "Amazing quality!" },
      { id: 2, rating: 4, comment: "Highly satisfied!" },
    ],
  },
  {
    id: 10,
    title: "Product 10",
    img: "https://picsum.photos/id/10/1200/1200",
    star: 4.2,
    price: 18.99,
    params: {
      color: "White",
      category: "Category 2",
      firm : "Quiksilver",
      availability: "Out of Stock",
    },
    reviews: [
      { id: 1, rating: 4, comment: "Good product." },
      { id: 2, rating: 3, comment: "Decent quality." },
    ],
  },
  {
    id: 11,
    title: "Product 11",
    img: "https://picsum.photos/id/11/1200/1200",
    star: 4.6,
    price: 20.99,
    params: {
      color: "Red",
      category: "Category 1",
      firm : "Vans",
      availability: "In Stock",
    },
    reviews: [
      { id: 1, rating: 5, comment: "Awesome product!" },
      { id: 2, rating: 4, comment: "Great value!" },
    ],
  },
  {
    id: 12,
    title: "Product 12",
    img: "https://picsum.photos/id/12/1200/1200",
    star: 3.8,
    price: 15.99,
    params: {
      color: "Blue",
      category: "Category 2",
      firm : "Adidas",
      availability: "Out of Stock",
    },
    reviews: [
      { id: 1, rating: 3, comment: "Not bad." },
      { id: 2, rating: 2, comment: "Could be better." },
    ],
  },
  {
    id: 13,
    title: "Product 13",
    img: "https://picsum.photos/id/13/1200/1200",
    star: 4.3,
    price: 19.99,
    params: {
      color: "Green",
      category: "Category 1",
      firm : "Nike",
      availability: "In Stock",
    },
    reviews: [
      { id: 1, rating: 4, comment: "Great product!" },
      { id: 2, rating: 5, comment: "Excellent quality!" },
    ],
  },
  {
    id: 14,
    title: "Product 14",
    img: "https://picsum.photos/id/14/1200/1200",
    star: 3.7,
    price: 12.99,
    params: {
      color: "Yellow",
      category: "Category 2",
      firm : "Puma",
      availability: "Out of Stock",
    },
    reviews: [
      { id: 1, rating: 3, comment: "Average product." },
      { id: 2, rating: 4, comment: "Good value for money." },
    ],
  },
  {
    id: 15,
    title: "Product 15",
    img: "https://picsum.photos/id/15/1200/1200",
    star: 4.2,
    price: 15.99,
    params: {
      color: "Purple",
      category: "Category 1",
      firm : "Zara",
      availability: "In Stock",
    },
    reviews: [
      { id: 1, rating: 5, comment: "Amazing product!" },
      { id: 2, rating: 4, comment: "Highly recommended!" },
    ],
  },
  {
    id: 16,
    title: "Product 16",
    img: "https://picsum.photos/id/16/1200/1200",
    star: 4.0,
    price: 9.99,
    params: {
      color: "Orange",
      category: "Category 2",
      firm : "Nike",
      availability: "Out of Stock",
    },
    reviews: [
      { id: 1, rating: 4, comment: "Good product." },
      { id: 2, rating: 3, comment: "Decent quality." },
    ],
  },
  {
    id: 17,
    title: "Product 17",
    img: "https://picsum.photos/id/17/1200/1200",
    star: 4.3,
    price: 14.99,
    params: {
      color: "Pink",
      category: "Category 1",
      firm : "Filla",
      availability: "In Stock",
    },
    reviews: [
      { id: 1, rating: 5, comment: "Awesome product!" },
      { id: 2, rating: 4, comment: "Great value!" },
    ],
  },
  {
    id: 18,
    title: "Product 18",
    img: "https://picsum.photos/id/18/1200/1200",
    star: 3.7,
    price: 11.99,
    params: {
      color: "Gray",
      category: "Category 2",
      firm : "Mango",
      availability: "Out of Stock",
    },
    reviews: [
      { id: 1, rating: 3, comment: "Not bad." },
      { id: 2, rating: 2, comment: "Could be better." },
    ],
  },
  {
    id: 19,
    title: "Product 19",
    img: "https://picsum.photos/id/19/1200/1200",
    star: 4.1,
    price: 17.99,
    params: {
      color: "Brown",
      category: "Category 1",
      firm : "Asics",
      availability: "In Stock",
    },
    reviews: [
      { id: 1, rating: 4, comment: "Good buy!" },
      { id: 2, rating: 5, comment: "Impressive!" },
    ],
  },
  // ...
  {
    id: 20,
    title: "Product 20",
    img: "https://picsum.photos/id/20/1200/1200",
    star: 4.1,
    price: 17.99,
    params: {
      color: "Black",
      category: "Category 1",
      firm : "Reebok",
      availability: "Out of Stock",
    },
    reviews: [
      { id: 1, rating: 4, comment: "Good buy!" },
      { id: 2, rating: 5, comment: "Impressive!" },
    ],
  },
];

export default data;
