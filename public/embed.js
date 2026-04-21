(function() {
  const script = document.currentScript
  const userId = new URLSearchParams(script.src.split('?')[1]).get('user_id')
  const appUrl = script.src.split('/embed.js')[0]
  
  if (!userId) return

  const container = document.createElement('div')
  container.id = 'testimonial-widget'
  container.style.cssText = 'font-family: sans-serif; padding: 20px; max-width: 1200px; margin: 0 auto;'
  script.parentNode.insertBefore(container, script)

  container.innerHTML = '<p style="text-align:center; color:#888;">Loading testimonials...</p>'

  fetch(appUrl + '/api/widget?user_id=' + userId)
  .then(function(r) { return r.json() })
  .then(function(testimonials) {
    if (!testimonials || !testimonials.length) {
      container.innerHTML = ''
      return
    }

    container.innerHTML = '<h3 style="text-align:center; color:#1a1a1a; margin-bottom:20px; font-size:22px; font-weight:bold;">Wall of Love 💜</h3>' +
      '<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:16px;">' +
      testimonials.map(function(t) {
        return '<div style="background:#f9f9f9; border:1px solid #eee; border-radius:12px; padding:20px;">' +
          '<p style="color:#444; font-size:14px; margin:0 0 12px; line-height:1.6;">"' + t.message + '"</p>' +
          '<div style="display:flex; align-items:center; gap:10px;">' +
          '<div style="width:32px; height:32px; border-radius:50%; background:#7c3aed; color:white; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:14px;">' + t.name.charAt(0) + '</div>' +
          '<div>' +
          '<p style="margin:0; font-weight:bold; color:#1a1a1a; font-size:14px;">' + t.name + '</p>' +
          '<p style="margin:0; color:#f59e0b; font-size:12px;">' + '⭐'.repeat(t.rating) + '</p>' +
          '</div></div></div>'
      }).join('') +
      '</div>'
  })
  .catch(function(err) {
    container.innerHTML = ''
    console.error('TestimonialApp:', err)
  })
})()