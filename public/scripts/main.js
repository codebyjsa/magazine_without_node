document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;
    const totalPages = 50;
    const pagesToShow = 5; // Number of page buttons to show at once

    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const goToPageButton = document.getElementById('go-to-page');
    const pageNumberInput = document.getElementById('page-number');
    const pageImage = document.getElementById('page-image');
    const paginationButtonsContainer = document.getElementById('pagination-buttons');

    if (!prevButton || !nextButton || !goToPageButton || !pageNumberInput || !paginationButtonsContainer) {
        console.error('One or more elements are missing in the DOM');
        return;
    }

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePage();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updatePage();
        } else {
            showConfirmationDialog();
        }
    });

    goToPageButton.addEventListener('click', (event) => {
        event.preventDefault();
        goToPage();
    });

    pageNumberInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            goToPage();
        }
    });

    function updatePage() {
        pageImage.src = `/images/${currentPage}.jpg`;
        pageNumberInput.value = currentPage;
        updatePaginationButtons();
    }

    function goToPage() {
        const pageNumber = parseInt(pageNumberInput.value);
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            currentPage = pageNumber;
            updatePage();
        }
    }

    function showConfirmationDialog() {
        const confirmation = confirm('You are being directed to GNDEC\'s Applied Science Portal. Click OK to continue or Cancel to stay.');
        if (confirmation) {
            window.location.href = 'https://appsc.gndec.ac.in/';
        }
    }

    function updatePaginationButtons() {
        paginationButtonsContainer.innerHTML = ''; // Clear existing buttons

        let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

        if (endPage - startPage + 1 < pagesToShow) {
            startPage = Math.max(1, endPage - pagesToShow + 1);
        }

        if (startPage > 1) {
            const prevEllipsis = document.createElement('button');
            prevEllipsis.textContent = '<<';
            prevEllipsis.className = 'disabled';
            prevEllipsis.addEventListener('click', () => {
                currentPage = Math.max(1, startPage - 1);
                updatePage();
            });
            paginationButtonsContainer.appendChild(prevEllipsis);
        }

        for (let i = startPage; i <= endPage; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            if (i === currentPage) {
                pageButton.className = 'active';
            }
            pageButton.addEventListener('click', () => {
                currentPage = i;
                updatePage();
            });
            paginationButtonsContainer.appendChild(pageButton);
        }

        if (endPage < totalPages) {
            const nextEllipsis = document.createElement('button');
            nextEllipsis.textContent = '>>';
            nextEllipsis.className = 'disabled';
            nextEllipsis.addEventListener('click', () => {
                currentPage = Math.min(totalPages, endPage + 1);
                updatePage();
            });
            paginationButtonsContainer.appendChild(nextEllipsis);
        }
    }

    updatePage(); // Initial call to set up the page view and pagination buttons
});

