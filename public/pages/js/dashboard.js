function setupMobileMenu() {
    const openSidebar = document.getElementById('open-sidebar');
    const closeSidebar = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar');
    
    if (openSidebar) {
        openSidebar.addEventListener('click', () => {
            sidebar.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeSidebar) {
        closeSidebar.addEventListener('click', () => {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            e.target !== openSidebar) {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

function setupHorizontalScroll() {
    const productContainer = document.querySelector('.product-scroll-container');
    const scrollDots = document.querySelectorAll('.flex.justify-center.mt-4 .rounded-full');
    
    if (!productContainer || scrollDots.length === 0) return;
    
    function updateScrollDots() {
        const scrollLeft = productContainer.scrollLeft;
        const maxScrollLeft = productContainer.scrollWidth - productContainer.clientWidth;
        const scrollPercentage = scrollLeft / maxScrollLeft;
        
        scrollDots.forEach((dot, index) => {
            if (index === 0 && scrollPercentage < 0.33) {
                dot.classList.add('bg-codeblue');
                dot.classList.remove('bg-gray-600');
            } else if (index === 1 && scrollPercentage >= 0.33 && scrollPercentage < 0.66) {
                dot.classList.add('bg-codeblue');
                dot.classList.remove('bg-gray-600');
            } else if (index === 2 && scrollPercentage >= 0.66) {
                dot.classList.add('bg-codeblue');
                dot.classList.remove('bg-gray-600');
            } else {
                dot.classList.add('bg-gray-600');
                dot.classList.remove('bg-codeblue');
            }
        });
    }
    
    productContainer.addEventListener('scroll', updateScrollDots);
    
    scrollDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const scrollTo = (productContainer.scrollWidth / 3) * index;
            productContainer.scrollTo({
                left: scrollTo,
                behavior: 'smooth'
            });
        });
    });
    
    productContainer.style.touchAction = 'pan-y';
}

function setupAnimations() {
    if (window.innerWidth > 768) {
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -5,
                    boxShadow: '0 12px 28px -2px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(13, 155, 255, 0.4)',
                    duration: 0.3
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                    duration: 0.3
                });
            });
        });
    }
    
    document.querySelectorAll('.icon-circle').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            gsap.to(icon, {
                scale: 1.1,
                duration: 0.3
            });
        });
        
        icon.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                scale: 1,
                duration: 0.3
            });
        });
    });
}

function handleResponsiveAdjustments() {
    const isMobile = window.innerWidth < 640;
    const chartElement = document.getElementById('activityChart');
    
    if (isMobile && chartElement && window.Chart && Chart.getChart(chartElement)) {
        const chart = Chart.getChart(chartElement);
        chart.options.scales.x.ticks.maxTicksLimit = 5;
        chart.update();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupAnimations();
    setupHorizontalScroll();
    handleResponsiveAdjustments();
    
    window.addEventListener('resize', () => {
        handleResponsiveAdjustments();
    });
});