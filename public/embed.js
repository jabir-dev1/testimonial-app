(function() {
  const script = document.currentScript
  const userId = new URLSearchParams(script.src.split('?')[1]).get('user_id')
  const appUrl = script.src.split('/embed.js')[0]
  
  if (!userId) return

  const container = document.createElement('div')
  container.id = 'testimonial-widget'
  container.style.cssText = 'font-family: sans-serif; padding: 20px; max-width: 1200px; margin: 0 auto;'
  script.parentNode.insertBefore(container, script)

  container.innerHTML = '<p style="text-align:center; color:#888; font-size:14px;">Loading testimonials...</p>'

  fetch(appUrl + '/api/widget?user_id=' + userId)
  .then(function(r) { return r.json() })
  .then(function(testimonials) {
    if (!testimonials || !testimonials.length) {
      container.innerHTML = ''
      return
    }

    container.innerHTML = 
      '<h3 style="text-align:center; color:#1a1a1a; margin-bottom:24px; font-size:22px; font-weight:800;">Wall of Love 💜</h3>' +
      '<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:20px;">' +
      testimonials.map(function(t) {
        var photos = ''
        if (t.before_image && t.after_image) {
          photos = '<div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:12px;">' +
            '<div style="position:relative;">' +
            '<img src="' + t.before_image + '" style="width:100%; height:120px; object-fit:cover; border-radius:8px;" />' +
            '<span style="position:absolute; top:6px; left:6px; background:rgba(0,0,0,0.5); color:white; font-size:10px; padding:2px 8px; border-radius:20px;">Before</span>' +
            '</div>' +
            '<div style="position:relative;">' +
            '<img src="' + t.after_image + '" style="width:100%; height:120px; object-fit:cover; border-radius:8px;" />' +
            '<span style="position:absolute; top:6px; left:6px; background:#4f46e5; color:white; font-size:10px; padding:2px 8px; border-radius:20px;">After</span>' +
            '</div>' +
            '</div>'
        }

        return '<div style="background:#ffffff; border:1px solid #e5e7eb; border-radius:16px; padding:20px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">' +
          photos +
          '<p style="color:#444; font-size:14px; margin:0 0 16px; line-height:1.6; font-style:italic;">"' + t.message + '"</p>' +
          '<div style="display:flex; align-items:center; gap:10px; border-top:1px solid #f1f5f9; padding-top:12px;">' +
          '<div style="width:36px; height:36px; border-radius:50%; background:#4f46e5; color:white; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:14px; flex-shrink:0;">' + t.name.charAt(0) + '</div>' +
          '<div>' +
          '<p style="margin:0; font-weight:700; color:#1a1a1a; font-size:14px;">' + t.name + '</p>' +
          '<p style="margin:0; color:#f59e0b; font-size:13px;">' + '⭐'.repeat(t.rating) + '</p>' +
          '</div></div></div>'
      }).join('') +
      '</div>'
  })
  .catch(function(err) {
    container.innerHTML = ''
    console.error('TestimonialApp:', err)
  })
})()