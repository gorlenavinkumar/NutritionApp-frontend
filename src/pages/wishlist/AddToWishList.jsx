const addToFavorites = () => {
    // ... (existing code)

    const isLoggedIn = true; // Replace this with your actual login status check

    const addToFavorites = (selectedItems) => {
        if (isLoggedIn) {
            const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const newFavorites = selectedItems.filter((selectedItem) => {
                return !existingFavorites.some(
                    (existingItem) => existingItem.nix_item_id === selectedItem.nix_item_id
                );
            });

            if (newFavorites.length > 0) {
                existingFavorites.push(...newFavorites);
                localStorage.setItem('favorites', JSON.stringify(existingFavorites));
                alert('Items added to favorites!');
            } else {
                alert('All items are already in favorites!');
            }
        } else {
            // Redirect to login page or show a login prompt
            alert('Please log in to add items to your wishlist.');
            // Perform redirect or show login prompt logic here
        }
    };

    return (
        <div>
            {/* ... (existing code) */}
            <button onClick={() => addToFavorites([selectedTableData])}>
                Add to Favorites
            </button>
        </div>
    );
};
