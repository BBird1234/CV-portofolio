// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('projectCarousel');
    const items = document.querySelectorAll('.carousel-item');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;
    const itemWidth = 300 + 30; // width + margin
    
    // Create dots
    items.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });
    
    // Update carousel position
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        
        // Update active dot
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        if (index < 0) index = items.length - 1;
        if (index >= items.length) index = 0;
        
        currentIndex = index;
        updateCarousel();
    }
    
    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });
    
    // Auto-rotate carousel
    let carouselInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active nav link
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            
            const section = document.querySelector(this.getAttribute('href'));
            section.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Highlight active section in nav
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const id = section.getAttribute('id');
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Modal functionality
    const modal = document.getElementById('projectModal');
    const closeModal = document.querySelector('.close-modal');
    const modalModelViewer = document.getElementById('modalModelViewer');
    const modalProjectTitle = document.getElementById('modalProjectTitle');
    const projectDescription = document.getElementById('projectDescription');
    
    // Updated Project data to match your HTML projects
    const projects = [
        {
            title: "Tank",
            model: "models/p12.glb",
            description: "Cylindrical Tank with staircase and welded joints. Designed for industrial liquid storage with a capacity of 5000 liters. Features reinforced walls and safety railings.",
            material: "Stainless Steel 304",
            dimensions: "Ø2000mm x 3000mm",
            weight: "850kg",
            tolerance: "±2mm",
            software: "Solidworks 2023",
           
        },
        {
            title: "Stand Support",
            model: "models/p2.glb",
            description: "Stand support with four legs made of H-beams. Designed to support heavy machinery up to 2000kg. Features adjustable leveling feet and reinforced joints.",
            material: "Structural Steel",
            dimensions: "1500mm x 1500mm x 1200mm",
            weight: "320kg",
            tolerance: "±1.5mm",
            software: "Solidworks 2023",
       
        },
        {
            title: "Platform",
            model: "models/p4.glb",
            description: "Platform with staircase and handrails for industrial access. Designed with anti-slip grating and OSHA-compliant rail heights. Supports up to 500kg/m² load.",
            material: "Aluminum and Steel",
            dimensions: "3000mm x 2000mm x 2500mm",
            weight: "180kg",
            tolerance: "±1mm",
            software: "Solidworks 2023",
            
        },
        {
            title: "Structural Joint",
            model: "models/p1.glb",
            description: "Structural joint with endplates and gussets for heavy load transfer. Designed for modular construction applications with bolted connections.",
            material: "A36 Steel",
            dimensions: "600mm x 450mm x 300mm",
            weight: "45kg",
            tolerance: "±0.5mm",
            software: "Solidworks 2023",
           
        },
        {
            title: "Structural Bracket",
            model: "models/p13.glb",
            description: "Load-bearing structural bracket with optimized design for maximum strength-to-weight ratio. Features finite element analysis-optimized geometry.",
            material: "Aluminum 6061-T6",
            dimensions: "400mm x 250mm x 120mm",
            weight: "8.5kg",
            tolerance: "±0.2mm",
            software: "Solidworks 2023",
           
        },
        {
            title: "Car Steering Wheel",
            model: "models/p6.glb",
            description: "Steering wheel for a vehicle with ergonomic grip and control knob. Designed with driver comfort and precise control in mind.",
            material: "ABS Plastic and Rubber",
            dimensions: "Ø380mm x 150mm",
            weight: "1.2kg",
            tolerance: "±0.1mm",
            software: "Solidworks 2023",
           
        },
        {
            title: "Abstract Skeletal Object",
            model: "models/p7.glb",
            description: "Abstract skeletal object demonstrating organic form design capabilities. Created as a conceptual art piece with mechanical inspiration.",
            material: "PLA Plastic (3D Printed)",
            dimensions: "300mm x 300mm x 300mm",
            weight: "0.8kg",
            tolerance: "±0.3mm",
            software: "Solidworks 2023"
        },
        {
            title: "Structural Joint with Gusset",
            model: "models/p8.glb",
            description: "Structural joint with reinforced gusset plate for high-stress applications. Designed for welded construction in steel frameworks.",
            material: "A572 Grade 50 Steel",
            dimensions: "500mm x 350mm x 200mm",
            weight: "28kg",
            tolerance: "±0.5mm",
            software: "Solidworks 2023"
        
        },
        {
            title: "Electric Motor",
            model: "models/p9.glb",
            description: "Electric motor with cooling fan blades and fins. Designed for industrial applications with optimized airflow for cooling.",
            material: "Aluminum Housing, Copper Windings",
            dimensions: "Ø200mm x 300mm",
            weight: "15kg",
            tolerance: "±0.1mm",
            software: "Solidworks 2023"
            
        },
        {
            title: "Computer Mouse",
            model: "models/p10.glb",
            description: "Ergonomic computer mouse designed for prolonged comfortable use. Features smooth contours and optimized button placement.",
            material: "ABS Plastic and Rubber",
            dimensions: "120mm x 70mm x 40mm",
            weight: "0.1kg",
            tolerance: "±0.05mm",
            software: "Solidworks 2023"
        },
        {
            title: "Specialty Fastener",
            model: "models/p11.glb",
            description: "Specialty fastener designed for unique application requiring both security and quick release capabilities.",
            material: "Titanium Alloy",
            dimensions: "Ø30mm x 50mm",
            weight: "0.08kg",
            tolerance: "±0.02mm",
            software: "Solidworks 2023"},
            {
            title: "Structural Bracket",
            model: "models/p5.glb",
            description: "Load-bearing structural bracket with optimized design for maximum strength-to-weight ratio. Features finite element analysis-optimized geometry.",
            material: "Aluminum 6061-T6",
            dimensions: "400mm x 250mm x 120mm",
            weight: "8.5kg",
            tolerance: "±0.2mm",
            software: "Solidworks 2023",
           
        }
         
    ];
    
    // View details buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            const projectIndex = parseInt(this.getAttribute('data-project')) - 1;
            
            // Ensure we don't go out of bounds
            const safeIndex = Math.min(Math.max(projectIndex, 0), projects.length - 1);
            const project = projects[safeIndex];
            
            // Update modal content
            modalProjectTitle.textContent = project.title;
            modalModelViewer.setAttribute('src', project.model);
            projectDescription.textContent = project.description;
            
            // Update specs
            document.getElementById('specMaterial').textContent = project.material;
            document.getElementById('specDimensions').textContent = project.dimensions;
            document.getElementById('specWeight').textContent = project.weight;
            document.getElementById('specTolerance').textContent = project.tolerance;
            document.getElementById('specSoftware').textContent = project.software;
            document.getElementById('specTime').textContent = project.time;
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Tab switching in modal
    document.querySelectorAll('.view-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab
            document.querySelectorAll('.view-tab').forEach(t => {
                t.classList.remove('active');
            });
            this.classList.add('active');
            
            // Update active content
            document.querySelectorAll('.view-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tabId}Content`).classList.add('active');
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
});