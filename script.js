// key imported from config.js
const recommendBtn = document.getElementById('recommend-btn');
const moodSelect = document.getElementById('mood-select');
const recommendationsDiv = document.getElementById('recommendations');

const moodQueries = {
  happy: "happy upbeat music playlist",
  sad: "sad emotional songs playlist",
  energetic: "high energy workout playlist",
  sensational: "sensational trending hits playlist",
  romantic: "romantic love songs playlist",
  relaxing: "relaxing calm chill music playlist",
  worship: "gospel worship songs playlist",
  praise: "gospel praise upbeat songs playlist"
};

recommendBtn.addEventListener('click', async () => {
  const mood = moodSelect.value;

  if (!mood) {
    alert("Select a mood first 😊");
    return;
  }

  const query = moodQueries[mood];
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=playlist&q=${encodeURIComponent(query)}&maxResults=6&key=${YT_API_KEY}`;

  recommendationsDiv.innerHTML = "<p>Loading curated playlists...</p>";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    recommendationsDiv.innerHTML = "";

    data.items.forEach((item, index) => {
      const card = document.createElement("div");
      card.classList.add("playlist-card");
      card.style.animationDelay = `${index * 0.1}s`;

      const playlistId = item.id.playlistId;
      const url = `https://www.youtube.com/playlist?list=${playlistId}`;

      card.innerHTML = `
        <h3>${item.snippet.title}</h3>
        <a href="${url}" target="_blank">Open Playlist 🎵</a>
      `;

      recommendationsDiv.appendChild(card);
    });

  } catch (err) {
    recommendationsDiv.innerHTML = "<p>Something went wrong. Check your API key.</p>";
  }
});