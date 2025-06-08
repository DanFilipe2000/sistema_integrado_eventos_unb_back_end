const getUser = () => {
  return (req, res) => {
    // Simulate fetching user data
    const user = { id: 1, name: 'John Doe' };
    res.json(user);
  };
}