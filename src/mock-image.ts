const imagesMock: { 
  id: number; 
  imageURL: string; 
  title: string; 
  author: string; 
  description: string; 
}[] = [
  {
    id: 1,
    imageURL: "https://images.unsplash.com/photo-1512820790803-83ca734da794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    title: "The Great Adventure",
    author: "John Doe",
    description: "A thrilling adventure of a young explorer discovering hidden treasures."
  },
  {
    id: 2,
    imageURL: "https://images.unsplash.com/photo-1733398378174-a8f3b1559451?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Mystery in the Night",
    author: "Jane Smith",
    description: "An intriguing mystery novel set in a quiet suburban town."
  },
  {
    id: 3,
    imageURL: "https://plus.unsplash.com/premium_photo-1733921555760-b905f7eb213d?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Cooking with Passion",
    author: "Chef Gordon",
    description: "A collection of mouth-watering recipes and culinary tips."
  },
  {
    id: 4,
    imageURL: "https://images.unsplash.com/photo-1733235014433-00116a9ec23d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D",
    title: "Journey Through Space",
    author: "Emily Carter",
    description: "Explore the vastness of space through the eyes of an astronaut."
  },
  {
    id: 5,
    imageURL: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    title: "Mindful Living",
    author: "Sophia Lee",
    description: "Learn the art of mindfulness to improve your daily life."
  },
  {
    id: 6,
    imageURL: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    title: "Tech Innovations",
    author: "Alan Turing",
    description: "Discover the world of technological advancements shaping the future."
  },
  {
    id: 7,
    imageURL: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    title: "Nature's Beauty",
    author: "Rachel Carson",
    description: "An exploration of the beauty and intricacies of the natural world."
  },
  {
    id: 8,
    imageURL: "https://plus.unsplash.com/premium_photo-1731948134571-31e0acb6aef8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "History Unveiled",
    author: "Howard Zinn",
    description: "A deep dive into the untold stories of history."
  },
  {
    id: 9,
    imageURL: "https://plus.unsplash.com/premium_photo-1733514692259-a2c77d567085?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Artistic Expression",
    author: "Vincent Van Gogh",
    description: "A celebration of art and the artists who create it."
  },
  {
    id: 10,
    imageURL: "https://images.unsplash.com/photo-1732282537693-77dcd910a172?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3M3x8fGVufDB8fHx8fA%3D%3D",
    title: "Urban Tales",
    author: "Chimamanda Ngozi Adichie",
    description: "Stories that capture the essence of modern urban life."
  },
  {
    id: 11,
    imageURL: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    title: "Fantasy Realms",
    author: "J.R.R. Tolkien",
    description: "Step into magical worlds filled with extraordinary creatures and adventures."
  },
  {
    id: 12,
    imageURL: "https://plus.unsplash.com/premium_photo-1731950841187-cfbec0ed025b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzN3x8fGVufDB8fHx8fA%3D%3D",
    title: "Science Wonders",
    author: "Carl Sagan",
    description: "Discover the mysteries of the universe through science and imagination."
  },
  {
    id: 13,
    imageURL: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    title: "Leadership 101",
    author: "John Maxwell",
    description: "Insights and strategies to become an effective leader."
  },
  {
    id: 14,
    imageURL: "https://images.unsplash.com/photo-1733667917418-f4b7ea5a80c4?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Cultural Perspectives",
    author: "Malcolm Gladwell",
    description: "Explore different cultures and their unique traditions."
  },
  {
    id: 15,
    imageURL: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    title: "Adventure Stories",
    author: "Mark Twain",
    description: "Classic tales of adventure and courage."
  },
  {
    id: 16,
    imageURL: "https://images.unsplash.com/photo-1527430253228-e93688616381?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    title: "Health and Wellness",
    author: "Deepak Chopra",
    description: "Tips and advice for a healthier lifestyle."
  },
  {
    id: 17,
    imageURL: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    title: "The Art of War",
    author: "Sun Tzu",
    description: "Ancient strategies and lessons for modern challenges."
  },
  {
    id: 18,
    imageURL: "https://images.unsplash.com/photo-1497215842964-222b430dc094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    title: "Psychology and Behavior",
    author: "Daniel Kahneman",
    description: "Understand the human mind and decision-making processes."
  },
  {
    id: 19,
    imageURL: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    title: "Global Economies",
    author: "Thomas Piketty",
    description: "An analysis of the world's economic systems and trends."
  },
  {
    id: 20,
    imageURL: "https://images.unsplash.com/photo-1457694587812-e8bf29a43845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    title: "Classic Literature",
    author: "Jane Austen",
    description: "Timeless stories that have shaped literary history."
  }
];

export default imagesMock;