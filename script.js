// Data: Real-world analogy: This is the digital inventory system of the bookstore.
const categoriesData = [
    { icon: 'fas fa-palette', title: 'Art & Crafts', count: 125, color: '#FF7F50' },
    { icon: 'fas fa-chart-pie', title: 'Infographics', count: 90, color: '#6A5ACD' },
    { icon: 'fas fa-child', title: "Children's Books", count: 200, color: '#3CB371' },
    { icon: 'fas fa-book-open', title: 'Fiction & Fantasies', count: 350, color: '#DAA520' },
    { icon: 'fas fa-code', title: 'Business & Development', count: 180, color: '#4682B4' },
    { icon: 'fas fa-utensils', title: 'Cookbooks', count: 70, color: '#DC143C' },
    { icon: 'fas fa-mask', title: 'Comics & Graphic Novels', count: 150, color: '#8A2BE2' },
    { icon: 'fas fa-brain', title: 'Science & Philosophy', count: 110, color: '#008080' }
];

const bestsellersData = [
    { title: 'The Silent Code', author: 'Eva Grisham', rating: 4.8, price: 35.00, coverColor: '#A0D9D9' },
    { title: 'A Martian Odyssey', author: 'Frank Herbert', rating: 4.9, price: 29.50, coverColor: '#82B3C9' },
    { title: 'Digital Fortress', author: 'Todd Phillips', rating: 4.7, price: 24.00, coverColor: '#C4A7E3' },
    { title: 'The Design of Everyday Things', author: 'Mark Owen', rating: 4.6, price: 18.00, coverColor: '#FFD1AA' },
    { title: 'She Rises at Dawn', author: 'Eva Grey', rating: 4.5, price: 16.50, coverColor: '#AED4DF' },
    { title: 'The Ocean at the End of the Lane', author: 'Niel Gaiman', rating: 4.7, price: 19.99, coverColor: '#C0E0A0' },
    { title: 'Bruja Born', author: 'Zoraida Cordova', rating: 4.8, price: 21.00, coverColor: '#FFC9C9' },
    { title: 'The Wood Beyond', author: 'James Henry', rating: 4.6, price: 22.00, coverColor: '#D6A6A6' }
];


// 1. Function to Dynamically Render Categories
function renderCategories() {
    // Get the HTML element where the categories should be placed (the Bootstrap row).
    const categoriesRow = document.querySelector('.categories-section .row');

    if (!categoriesRow) return; // Exit if the container is not found.

    // Analogy: Laying out the section signs in the bookstore.
    const categoriesHTML = categoriesData.map(category => {
        // Map over the data and return an HTML string for each category card.
        // We use template literals (backticks) for clean multi-line HTML.
        return `
            <div class="col-6 col-md-4 col-lg-3 mb-4">
                <div class="category-card card text-center p-3 shadow-sm h-100" data-color="${category.color}">
                    <div class="card-body">
                        <i class="${category.icon} fa-2x mb-3" style="color: ${category.color};"></i>
                        <h5 class="card-title">${category.title}</h5>
                        <p class="card-text text-muted">${category.count}+ Books</p>
                    </div>
                </div>
            </div>
        `;
    }).join(''); // Join the array of HTML strings into one single string.

    // Insert the generated HTML into the row element.
    categoriesRow.innerHTML = categoriesHTML;
    
    // Add hover effect listeners after rendering
    addCategoryHoverListeners();
}

// 2. Function for Category Hover Effect
// Real-world analogy: When you touch a section sign, it lights up.
function addCategoryHoverListeners() {
    document.querySelectorAll('.category-card').forEach(card => {
        const icon = card.querySelector('i');
        const color = card.getAttribute('data-color');

        card.addEventListener('mouseover', () => {
            // On hover, change the icon color to white (as per CSS)
            if (icon) icon.style.color = '#fff';
        });

        card.addEventListener('mouseout', () => {
            // On mouse out, revert the icon color back to its original color
            if (icon) icon.style.color = color;
        });
    });
}


// 3. Function to Dynamically Render Bestsellers
function renderBestsellers() {
    // Get the HTML element where the bestsellers should be placed (the Bootstrap row).
    const bestsellersRow = document.querySelector('.bestsellers-section .row');

    if (!bestsellersRow) return; // Exit if the container is not found.

    // Analogy: Arranging the featured books on the "Bestsellers" table.
    const bestsellersHTML = bestsellersData.map(book => {
        // Generate the rating stars dynamically
        const stars = generateStars(book.rating);
        
        return `
            <div class="col-6 col-md-4 col-lg-2-5 mb-4">
                <div class="book-card card h-100 shadow-sm text-center">
                    <img src="https://via.placeholder.com/150x220/${book.coverColor.substring(1)}/FFFFFF?text=${encodeURIComponent(book.title.replace(/\s/g, '+'))}" 
                        class="card-img-top p-3" alt="Book Cover: ${book.title}">
                    <div class="card-body p-2">
                        <h6 class="card-title mb-1">${book.title}</h6>
                        <p class="card-text text-muted small mb-1">By ${book.author}</p>
                        <div class="d-flex justify-content-center align-items-center mb-2">
                            ${stars}
                            <span class="small text-muted">${book.rating}</span>
                        </div>
                        <span class="fw-bold text-primary">$${book.price.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Improved placeholder URL construction
// book.coverColor is a hex code like '#A0D9D9'. We slice it to remove the '#'.
const backgroundColor = book.coverColor.substring(1);
const placeholderText = book.title.toUpperCase().split(' ').join('+'); // Use + for spaces

return `
    <div class="col-6 col-md-4 col-lg-2-5 mb-4">
        <div class="book-card card h-100 shadow-sm text-center">
            <img src="https://via.placeholder.com/150x220/${backgroundColor}/FFFFFF?text=${placeholderText}" 
                class="card-img-top p-3" alt="Book Cover: ${book.title}">
            <div class="card-body p-2">
                </div>
        </div>
    </div>
`;

    // Insert the generated HTML into the row element.
    bestsellersRow.innerHTML = bestsellersHTML;
}

// 4. Helper Function to Generate Star Rating HTML
function generateStars(rating) {
    // Generates 5 stars based on the book's rating (e.g., 4.8)
    let starsHtml = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<span class="text-warning me-1"><i class="fas fa-star"></i></span>';
    }

    // Add half star
    if (hasHalfStar) {
        // Font Awesome half-star icon
        starsHtml += '<span class="text-warning me-1"><i class="fas fa-star-half-alt"></i></span>';
    }

    // Pad with empty stars to make 5 total (optional, but good for consistency)
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        // Font Awesome regular star icon (can be used as an empty star)
        starsHtml += '<span class="text-secondary me-1"><i class="far fa-star"></i></span>'; 
    }
    
    return starsHtml;
}


// 5. Run the rendering functions when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // This ensures the DOM structure is fully ready before we try to manipulate it.
    console.log("DOM loaded. Rendering dynamic content...");
    renderCategories();
    renderBestsellers();
});


// 6. Simple hero search functionality (Optional UX enhancement)
const searchInput = document.getElementById('taskInput') || document.querySelector('.hero-section .form-control');
const searchButton = document.getElementById('addTaskBtn') || document.querySelector('.hero-section .btn-primary');

if (searchButton && searchInput) {
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            alert(`Searching for: "${query}"... (Imagine a search results page here!)`);
            searchInput.value = '';
        } else {
            alert('Please enter a search query.');
        }
    });

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });
}