const header = document.getElementById('header')
const excerpt = document.getElementById('excerpt')
const name = document.getElementById('name')
const refreshBtnContainer = document.querySelector('.refresh')
const refreshBtn = document.getElementById('refresh_button')

const animatedBgs = document.querySelectorAll('.animated-bg')
const animatedBgTexts = document.querySelectorAll('.animated-bg-text')

let loading = true

// Images will be constant for now. Haven't created an unsplash developer account yet.
const headerImages = [
  'https://images.unsplash.com/photo-1560303324-3a78782e964b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGNsYXNzaWMlMjBhcnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2xhc3NpYyUyMGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2xhc3NpYyUyMGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1583751536531-4ed3a304e9b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNsYXNzaWMlMjBhcnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1577720643272-265f09367456?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGNsYXNzaWMlMjBhcnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1577083552765-cb4bc62c8ac0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGNsYXNzaWMlMjBhcnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1561516861-3ea02b3b6a71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fGNsYXNzaWMlMjBhcnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1576504677634-06b2130bd1f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGNsYXNzaWMlMjBhcnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1559004328-d65ee06c5947?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fGNsYXNzaWMlMjBhcnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
]

const getQuote = async () => {
  const res = await fetch('https://stoicquotesapi.com/v1/api/quotes/random', {
    headers: {
      Accept: 'application/json',
    },
  })

  const quote = await res.json()

  if (Object.keys(quote).length > 0) loading = false

  if (!loading) {
    header.innerHTML = `<img src="${
      headerImages[(headerImages.length * Math.random()) | 0]
    }" alt="header" />`
    excerpt.innerHTML = quote?.body ?? ''
    name.innerHTML = quote?.author ?? ''
    refreshBtn.innerHTML = '<i class="fa fa-refresh" aria-hidden="true"></i>'

    animatedBgs.forEach((bg) => bg.classList.remove('animated-bg'))
    animatedBgTexts.forEach((bgText) =>
      bgText.classList.remove('animated-bg-text')
    )
  }
}

const reset = () => {
  loading = true
  header.innerHTML = ''
  excerpt.innerHTML = ''
  name.innerHTML = ''
  refreshBtn.innerHTML = ''

  header.classList.add('animated-bg')
  excerpt.innerHTML =
    '<span class="animated-bg animated-bg-text">&nbsp;</span> <span class="animated-bg animated-bg-text">&nbsp;</span> <span class="animated-bg animated-bg-text">&nbsp;</span>'
  name.classList.add('animated-bg')
  name.classList.add('animated-bg-text')
  refreshBtnContainer.classList.add('animated-bg')
}

refreshBtn.addEventListener('click', () => {
  reset()
  getQuote()
})

getQuote()
