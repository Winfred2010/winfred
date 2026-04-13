type User = { type: 'user'; name: string; age: number };
type Product = { type: 'product'; id: number; price: number };
type Order = { type: 'order'; orderId: string; amount: number };

type Data = User | Product | Order;

const handleData = (items: Data[]): string[] => {
  return items.map((item) => {
    switch (item.type) {
      case 'user':
        return `Hello ${item.name}, you are ${item.age} years old.`;
      case 'product':
        return `Product ID: ${item.id} costs $${item.price}.`;
      case 'order':
        return `Order ${item.orderId} total: $${item.amount}.`;
      default:
        return "Unknown data type.";
    }
  });
};

// Usage
const results = handleData([
  { type: 'user', name: 'Alice', age: 30 },
  { type: 'product', id: 101, price: 50 },
  { type: 'order', orderId: 'ORD-001', amount: 150 }
]);

console.log(results);
