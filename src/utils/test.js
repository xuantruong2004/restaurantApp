const cartItems = [
  { id: 1, qty: 1 },
  { id: 1, qty: 1 },
  { id: 2, qty: 1 },
  { id: 3, qty: 1 },
  { id: 2, qty: 1 },
];

const Total = cartItems.reduce((prevs, cartItem) => {
  const isInclude = prevs.find((prev) => prev?.id === cartItem.id);

  isInclude ? (isInclude.qty += 1) : prevs.push(cartItem);
  return prevs;
}, []);

console.log(Total);

// prevs.find(prev=>prev?.id===cartItem.id)?prevs.find(prev=>prev?.id===cartItem.id)+=1:prevs.push(cartItem)
