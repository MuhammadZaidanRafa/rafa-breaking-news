fetch("https://api.rss2json.com/v1/api.json?rss_url=https://rss.detik.com/")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("news");
    if (!data.items || data.items.length === 0) {
      container.textContent = "Tidak ada berita ditemukan.";
      return;
    }

    let html = "";
    data.items.slice(0, 5).forEach(item => {
      html += `<h3><a href="${item.link}" target="_blank">${item.title}</a></h3>`;
      html += `<p>${item.pubDate}</p>`;
    });
    container.innerHTML = html;
  })
  .catch(err => {
    document.getElementById("news").textContent = "Gagal memuat berita.";
    console.error(err);
  });
