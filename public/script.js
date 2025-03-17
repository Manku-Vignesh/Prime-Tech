document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('.deal-container');
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyRNWXvY0ol7tNy6ZGx7XNIm8xTmn9oV9zzh0W_mdWItA5LY6s-AaSoFj6yaITKo1h5/exec'; // Replace with YOUR Apps Script URL

    try {
        const response = await fetch(APPS_SCRIPT_URL);
        const data = await response.json();

        // Skip the header row (first row)
        const rows = data.slice(1);

        rows.forEach(row => {
            const [
                name,
                link,
                price,
                imageUrl,
                couponCode,
                bankOffersStr,
                mrp
            ] = row;

            // Create deal card
            const card = document.createElement('div');
            card.className = 'deal-card';

            // Add image
            if (imageUrl) {
                const img = document.createElement('img');
                img.src = imageUrl;
                card.appendChild(img);
            }
            // Create the product title link
            const dealLink = document.createElement('a');
            dealLink.href = link;       
            dealLink.target = '_blank'; 
            dealLink.textContent = name;
            dealLink.className = 'deal-title';
            card.appendChild(dealLink);

            // Add price and MRP
            const priceElement = document.createElement('div');
            priceElement.className = 'deal-price';
            priceElement.textContent = `Price: $${price}`;
            if (mrp) {
                const mrpElement = document.createElement('span');
                mrpElement.className = 'mrp';
                mrpElement.textContent = `MRP: $${mrp}`;
                priceElement.appendChild(mrpElement);
            }
            card.appendChild(priceElement);

            // Add coupon code
            if (couponCode) {
                const coupon = document.createElement('span');
                coupon.className = 'coupon-code';
                coupon.textContent = couponCode;
                card.appendChild(coupon);
            }

            // Add bank offers
            if (bankOffersStr) {
                const offers = bankOffersStr.split(',').map(offer => offer.trim());
                const offersContainer = document.createElement('div');
                offersContainer.className = 'bank-offers';

                offers.forEach(offer => {
                    const badge = document.createElement('span');
                    badge.className = 'bank-offer-badge';
                    badge.textContent = offer;
                    offersContainer.appendChild(badge);
                });

                card.appendChild(offersContainer);
            }

            // Add "Buy Now" button
            const buyNowButton = document.createElement('a');
            buyNowButton.href = link;
            buyNowButton.target = '_blank';
            buyNowButton.className = 'buy-now-btn';
            buyNowButton.textContent = 'Buy Now';
            card.appendChild(buyNowButton);

            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<p>Failed to load deals. Check the Apps Script URL and sheet permissions.</p>';
    }
});