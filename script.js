
// Navigation Highlight and Smooth Scroll
const navLinks = document.querySelectorAll("#sidebar .nav a");

navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        navLinks.forEach(link => link.classList.remove("active"));
        this.classList.add("active");
        const targetId = this.getAttribute("href").substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
    });
});

// Typed.js for Profession
const typed = new Typed('#typed', {
    strings: ['Software Engineer.', 'Problem Solver.', 'Future Innovator.'],
    typeSpeed: 70,
    backSpeed: 40,
    loop: true
});

const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
});

    
// Theme Toggle (Dark Mode)
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});
function initializeSkillsChart() {
  const ctx = document.getElementById('skillsChart').getContext('2d');
  
  // Check if a chart instance already exists and destroy it
  if (window.skillsChartInstance) {
    window.skillsChartInstance.destroy();
  }

  window.skillsChartInstance = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['HTML/CSS', 'JavaScript', 'Python', 'React', 'Git', 'SQL'],
      datasets: [{
        label: 'Technical Skills',
        data: [95, 85, 80, 80, 85, 75],
        backgroundColor: 'rgba(108, 99, 255, 0.2)',
        borderColor: 'rgba(108, 99, 255, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(108, 99, 255, 1)',
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          angleLines: {
            color: 'rgba(108, 99, 255, 0.1)'
          },
          grid: {
            color: 'rgba(108, 99, 255, 0.1)'
          },
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: {
            stepSize: 20,
            backdropColor: 'transparent',
            color: function(context) {
              return context.tick.value >= 80 ? 
                'rgba(108, 99, 255, 1)' : 
                'rgba(108, 99, 255, 0.6)';
            }
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'rgba(108, 99, 255, 0.8)',
            font: {
              size: 14
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.raw}%`;
            }
          }
        }
      }
    }
  });
}

// Initialize chart when page loads
document.addEventListener('DOMContentLoaded', function() {
  initializeSkillsChart();
});

// Reinitialize chart when theme changes
function handleThemeChange() {
  setTimeout(initializeSkillsChart, 100); // Small delay to ensure theme is applied
}



 // Download CV Button with Enhanced Functionality
document.querySelector('.cv-btn').addEventListener('click', async function(e) {
  e.preventDefault(); // Prevent default anchor behavior
  

  const pdfUrl = 'https://github.com/silvia730/cv-document.git';
  const downloadName = 'SilviaNjeri-Frontend-Developer-CV.pdf';
  
  // Create and show notification
  const notification = document.createElement('div');
  notification.className = 'download-notification';
  notification.innerHTML = `
    <div class="download-content">
      <i class="fas fa-spinner fa-spin"></i>
      <span>Preparing your download...</span>
    </div>
  `;
  document.body.appendChild(notification);

  try {
    // Fetch the PDF file
    const response = await fetch(pdfUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Create blob and download
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    
    const tempLink = document.createElement('a');
    tempLink.href = blobUrl;
    tempLink.download = downloadName;
    tempLink.style.display = 'none';
    document.body.appendChild(tempLink);
    tempLink.click();
    
    // Cleanup
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(blobUrl);
    
    // Update notification
    notification.querySelector('.download-content').innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span>Download started!</span>
    `;
  } catch (error) {
    console.error('Download error:', error);
    notification.querySelector('.download-content').innerHTML = `
      <i class="fas fa-exclamation-circle"></i>
      <span>Failed to download. Please try again.</span>
    `;
  } finally {
    // Remove notification after delay
    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
});


  

  

document.addEventListener('DOMContentLoaded', function() {
    // Theme functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeColors = document.querySelectorAll('.color-option');
    let currentTheme = localStorage.getItem('theme') || 'default';
  
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateActiveColor();
    updateThemeIcon();
  
    // Toggle between light/dark
    themeToggle.addEventListener('click', function() {
      const current = document.documentElement.getAttribute('data-theme');
      const newTheme = current === 'dark' ? 'default' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon();
      updateActiveColor();
    });
  
    // Color options click handler
    themeColors.forEach(color => {
      color.addEventListener('click', function() {
        const theme = this.dataset.theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateActiveColor();
        updateThemeIcon();
      });
    });
  
    function updateActiveColor() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      themeColors.forEach(color => {
        color.classList.remove('active');
        if (color.dataset.theme === currentTheme) {
          color.classList.add('active');
        }
      });
    }
  
    function updateThemeIcon() {
      const icon = themeToggle.querySelector('i');
      const currentTheme = document.documentElement.getAttribute('data-theme');
      
      if (currentTheme === 'dark') {
        icon.classList.replace('fa-moon', 'fa-sun');
        themeToggle.querySelector('.theme-tooltip').textContent = 'Light Mode';
      } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        themeToggle.querySelector('.theme-tooltip').textContent = 'Dark Mode';
      }
    }
  });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault()
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
            triggerConfetti();
        });
    }


const sections = document.querySelectorAll('main section');

sections.forEach(section => {
    section.addEventListener('mouseover',()=>{
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        section.style.backgroundColor = '#' + randomColor;
        section.style.transition = 'background-color 0.5s ease'
    });
    section.addEventListener('mouseout',()=>{
        section.style.backgroundColor = '';
    })

})