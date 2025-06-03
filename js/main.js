document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const navToggle = document.getElementById("navToggle")
  const navLinks = document.querySelector(".nav-links")

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      document.body.classList.toggle("nav-open")
    })
  }

  // Close mobile nav when clicking on a link
  const navItems = document.querySelectorAll(".nav-links a")
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("active")
      document.body.classList.remove("nav-open")
    })
  })

  // Header scroll effect
  const header = document.querySelector("header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Pricing toggle
  const pricingToggle = document.getElementById("pricingToggle")
  if (pricingToggle) {
    pricingToggle.addEventListener("change", function () {
      document.body.classList.toggle("annual", this.checked)
    })
  }

  // Testimonial slider
  const nextBtn = document.querySelector(".case-study-nav .next")
  const prevBtn = document.querySelector(".case-study-nav .prev")
  const dots = document.querySelectorAll(".case-study-nav .dot")

  if (nextBtn && prevBtn) {
    let currentSlide = 0
    const totalSlides = dots.length

    nextBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % totalSlides
      updateSlider()
    })

    prevBtn.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
      updateSlider()
    })

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index
        updateSlider()
      })
    })

    function updateSlider() {
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide)
      })

      // In a real implementation, you would update the visible slide here
      console.log(`Showing slide ${currentSlide + 1} of ${totalSlides}`)
    }
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        e.preventDefault()
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: "smooth",
        })
      }
    })
  })

  // Form submission handling
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()

      // Simulate form submission
      const submitButton = this.querySelector('button[type="submit"]')
      const originalText = submitButton.textContent

      submitButton.disabled = true
      submitButton.textContent = "Submitting..."

      // Simulate API call
      setTimeout(() => {
        submitButton.textContent = "Success!"
        this.reset()

        setTimeout(() => {
          submitButton.textContent = originalText
          submitButton.disabled = false
        }, 2000)
      }, 1500)
    })
  })

  // Animation on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".feature-card, .step, .pricing-card")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight * 0.9) {
        element.classList.add("animated")
      }
    })
  }

  window.addEventListener("scroll", animateOnScroll)
  animateOnScroll() // Run once on page load

  // Add pulse effect to CTA buttons
  const ctaButtons = document.querySelectorAll(".btn-primary")
  ctaButtons.forEach((button) => {
    button.classList.add("pulse")
  })

  // Ensure video plays on mobile devices
  const video = document.querySelector(".video-background video")
  if (video) {
    video.play().catch((error) => {
      console.log("Auto-play was prevented:", error)
      // Add a play button for mobile devices where autoplay is restricted
      const playButton = document.createElement("button")
      playButton.innerHTML = '<i class="fas fa-play"></i>'
      playButton.className = "video-play-button"
      document.body.appendChild(playButton)

      playButton.addEventListener("click", () => {
        video.play()
        playButton.style.display = "none"
      })
    })
  }

  // Dark mode implementation
  const themeToggle = document.getElementById("themeToggle")

  // Function to set theme
  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }

  // Check for saved theme preference or system preference
  const savedTheme = localStorage.getItem("theme")
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  // Apply the appropriate theme
  if (savedTheme) {
    setTheme(savedTheme)
  } else if (prefersDark) {
    setTheme("dark")
  } else {
    setTheme("light")
  }

  // Toggle theme when button is clicked
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme")
      const newTheme = currentTheme === "dark" ? "light" : "dark"
      setTheme(newTheme)
    })
  }

  // Listen for system preference changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      setTheme(e.matches ? "dark" : "light")
    }
  })
})
