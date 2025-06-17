const rss_url = "https://rss.detik.com/";
const api_url = `https://api.allorigins.win/get?url=${encodeURIComponent(rss_url)}`;

fetch(api_url)
  .then(response => {
    if (!response.ok) throw new Error("Gagal ambil data RSS");
    return response.json();
  })
  .then(data => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, "text/xml");
    const items = xml.querySelectorAll("item");

    const container = document.getElementById("news");
    if (!items.length) {
      container.textContent = "Tidak ada berita ditemukan.";
      return;
    }

    let html = "";
    items.forEach((item, i) => {
      if (i >= 5) return;
      const title = item.querySelector("title").textContent;
      const link = item.querySelector("link").textContent;
      const pubDate = item.querySelector("pubDate").textContent;

      html += `<h3><a href="${link}" target="_blank">${title}</a></h3>`;
      html += `<p>${pubDate}</p>`;
    });

    container.innerHTML = html;
  })
  .catch(error => {
    console.error(error);
    document.getElementById("news").textContent = "Gagal memuat berita.";
  });
