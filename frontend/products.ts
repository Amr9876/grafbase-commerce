const products = [
  {
    image: "http://localhost:3000/airpods.png",
    name: "Airpods",
    description: "AirPods are wireless Bluetooth earbuds created by Apple.",
    price: 159,
    stock: Math.floor(Math.random() * 5) + 1,
  },
  {
    image: "http://localhost:3000/freebuds.png",
    name: "Freebuds",
    description: "FreeBuds are wireless earbuds created by Huawei.",
    price: 99,
    stock: Math.floor(Math.random() * 5) + 1,
  },
  {
    image: "http://localhost:3000/galaxy.png",
    name: "Galaxy",
    description:
      "Galaxy is a series of mobile computing devices designed, manufactured and marketed by Samsung Electronics.",
    price: 799,
    stock: Math.floor(Math.random() * 5) + 1,
  },
  {
    image: "http://localhost:3000/headset.png",
    name: "Headset",
    description:
      "A headset is a pair of headphones with a built-in microphone.",
    price: 50,
    stock: Math.floor(Math.random() * 5) + 1,
  },
  {
    image: "http://localhost:3000/iphone.png",
    name: "IPHONE",
    description:
      "The iPhone is a line of smartphones designed and marketed by Apple Inc.",
    price: 699,
    stock: Math.floor(Math.random() * 5) + 1,
  },
  {
    image: "http://localhost:3000/macbook.png",
    name: "Macbook",
    description:
      "The MacBook is a brand of Macintosh laptop computers designed and marketed by Apple Inc.",
    price: 1299,
    stock: Math.floor(Math.random() * 5) + 1,
  },
  {
    image: "http://localhost:3000/msi.png",
    name: "MSI",
    description:
      "MSI is a Taiwanese multinational information technology corporation that designs, develops and provides computer hardware, related products and services.",
    price: 999,
    stock: Math.floor(Math.random() * 5) + 1,
  },
  {
    image: "http://localhost:3000/redmi.png",
    name: "Redmi",
    description:
      "Redmi is a sub-brand owned by the Chinese electronics company Xiaomi.",
    price: 150,
    stock: Math.floor(Math.random() * 5) + 1,
  },
  {
    image: "http://localhost:3000/rog.png",
    name: "ROG",
    description:
      "ROG (Republic of Gamers) is a brand used by Asus since 2006, encompassing a range of computer hardware, personal computers, peripherals, and accessories oriented primarily toward PC gaming.",
    price: 1500,
    stock: Math.floor(Math.random() * 5) + 1,
  },
];

export default products;
